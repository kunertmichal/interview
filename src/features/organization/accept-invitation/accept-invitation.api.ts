'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { parseWithZod } from '@conform-to/zod';
import { createClient } from '@/shared/utils/supabase/server';
import { acceptInvitationSchema } from './accept-invitation.model';
import { logger } from '@/shared/utils/logger';
import { sendFormResult } from '@/shared/utils/form-result';

export async function handleOrganizationInvite(_: unknown, formData: FormData) {
  const supabase = createClient();

  const submission = parseWithZod(formData, {
    schema: acceptInvitationSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { notificationId, action } = submission.value;

  const { error } = await supabase.rpc('react_to_organization_invite', {
    notification_id: notificationId,
    new_status: action,
  });

  if (error) {
    logger.error(error);
    return sendFormResult('error', ['Unable to accept/decline invitation']);
  } else {
    revalidatePath('/dashboard/organization');
    redirect('/dashboard/organization');
  }
}
