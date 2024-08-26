'use server';

import { revalidatePath } from 'next/cache';
import { parseWithZod } from '@conform-to/zod';
import { createClient } from '@/shared/utils/supabase/server';
import { logger } from '@/shared/utils/logger';
import { sendFormResult } from '@/shared/utils/form-result';
import { removeUserSchema } from './';

export async function removeUser(_: unknown, formData: FormData) {
  const supabase = createClient();

  const submission = parseWithZod(formData, {
    schema: removeUserSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { error } = await supabase.rpc('remove_user_from_organization', {
    user_id: submission.value.userId,
  });

  if (error) {
    logger.error(error);
    return sendFormResult('error', ['Unable to remove user']);
  } else {
    revalidatePath('/dashboard/organization');
    return sendFormResult('success');
  }
}
