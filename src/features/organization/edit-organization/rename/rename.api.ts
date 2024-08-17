'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { renameSchema } from './rename.model';
import { parseWithZod } from '@conform-to/zod';
import { revalidatePath } from 'next/cache';
import { sendFormResult } from '@/shared/utils/form-result';
import { logger } from '@/shared/utils/logger';
import { getUserOrRedirect } from '@/entities';
import { hasUserRole } from '@/shared/utils/permissions';

export async function rename(_: unknown, formData: FormData) {
  const supabase = createClient();
  const user = await getUserOrRedirect();

  const isOwner = await hasUserRole(user.id, 'organization_owner');

  if (!isOwner) {
    return sendFormResult('error', ['Insufficient permissions']);
  }

  const submission = parseWithZod(formData, {
    schema: renameSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { error } = await supabase
    .from('organizations')
    .update({ name: submission.value.name })
    .eq('id', submission.value.organizationId);

  if (error) {
    logger.error(error);
    return sendFormResult('error', ['Unable to rename organisation']);
  } else {
    revalidatePath('/organization');
    return sendFormResult('success');
  }
}
