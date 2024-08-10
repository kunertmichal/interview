'use server';

import { parseWithZod } from '@conform-to/zod';
import { SubmissionResult } from '@conform-to/react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';
import { inviteToOrganizationSchema } from './';

export async function inviteToOrganization(_: unknown, formData: FormData) {
  const supabase = createClient();

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
    return {
      status: 'error',
      error: {
        form: ['Organization not found'],
      },
    } as SubmissionResult<string[]>;
  }

  // 2. check if invited user exists
  const { data: invitedUser, error: invitedUserError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (!invitedUser || invitedUserError) {
    return {
      status: 'error',
      error: {
        form: ['Invited user does not exist'],
      },
    } as SubmissionResult<string[]>;
  }

  // 3. check if user is already a member
  if (invitedUser.organization_id) {
    return {
      status: 'error',
      error: {
        form: ['Invited user is already a member of an organization'],
      },
    } as SubmissionResult<string[]>;
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
    return {
      status: 'error',
      error: {
        form: ['Invitation already sent'],
      },
    } as SubmissionResult<string[]>;
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
    console.log(error);
    return {
      status: 'error',
      error: {
        form: ['Unable to invite user'],
      },
    } as SubmissionResult<string[]>;
  } else {
    revalidatePath('/organization');
    return {
      status: 'success',
    } as SubmissionResult<string[]>;
  }
}
