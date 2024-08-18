'use server';

import { parseWithZod } from '@conform-to/zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';
import { inviteToOrganizationSchema } from './';
import { logger } from '@/shared/utils/logger';
import { sendFormResult } from '@/shared/utils/form-result';
import { getUserOrRedirect } from '@/entities';
import { hasUserRole } from '@/shared/utils/permissions';

export async function inviteToOrganization(_: unknown, formData: FormData) {
  const supabase = createClient();
  const user = await getUserOrRedirect();

  const isOwner = await hasUserRole(user.id, 'organization_owner');

  if (!isOwner) {
    return sendFormResult('error', ['Insufficient permissions']);
  }

  const submission = parseWithZod(formData, {
    schema: inviteToOrganizationSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { organizationId, email } = submission.value;
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData) {
    redirect('/login');
  }

  // 1. check if organization exists
  const { data: organization, error: organizationError } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', organizationId)
    .single();

  if (!organization || organizationError) {
    logger.error(organizationError);
    return sendFormResult('error', ['Organization not found']);
  }

  // 2. check if invited user exists
  const { data: invitedUser, error: invitedUserError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (!invitedUser || invitedUserError) {
    logger.error(invitedUserError);
    return sendFormResult('error', ['Invited user not found']);
  }

  // 3. check if user is already a member
  if (invitedUser.organization_id) {
    return sendFormResult('error', [
      'User is already a member of an organization',
    ]);
  }

  // 4. check if user is already invited
  const { data: invitation } = await supabase
    .from('organization_invites')
    .select('*')
    .eq('receiver_id', invitedUser.id)
    .eq('organization_id', organizationId)
    .eq('status', 'pending')
    .single();

  if (invitation) {
    return sendFormResult('error', ['Invitation already sent']);
  }

  // 5. create invitation and notification
  const { error } = await supabase.rpc(
    'create_organization_invite_and_notification',
    {
      sender_id: userData.user.id,
      receiver_id: invitedUser.id,
      organization_id: organizationId,
      user_id: invitedUser.id,
      content: `You have been invited to join ${organization.name}`,
      status: 'pending',
      type: 'organization_invite',
    }
  );

  if (error) {
    logger.error(error);
    return sendFormResult('error', ['Unable to invite user']);
  } else {
    revalidatePath('/organization');
    return sendFormResult('success');
  }
}
