'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { renameSchema } from './rename.model';
import { parseWithZod } from '@conform-to/zod';
import { SubmissionResult } from '@conform-to/react';
import { revalidatePath } from 'next/cache';

export async function rename(_: unknown, formData: FormData) {
  const supabase = createClient();

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
    console.log(error);
    return {
      status: 'error',
      error: {
        form: ['Unable to rename organisation'],
      },
    } as SubmissionResult<string[]>;
  } else {
    revalidatePath('/organization');
    return {
      status: 'success',
    } as SubmissionResult<string[]>;
  }
}
