'use server';

import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { createClient } from '@/shared/utils/supabase/server';
import { signupSchema } from './signup-form.model';
import { logger } from '@/shared/utils/logger';
import { sendFormResult } from '@/shared/utils/form-result';

export async function signup(_: unknown, formData: FormData) {
  const supabase = createClient();

  const submission = parseWithZod(formData, {
    schema: signupSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { error } = await supabase.auth.signUp({
    email: submission.value.email,
    password: submission.value.password,
    options: {
      data: {
        email: submission.value.email,
        first_name: submission.value.firstName,
        last_name: submission.value.lastName,
      },
    },
  });

  if (error) {
    logger.error(error);
    return sendFormResult('error', ['Unable to create account']);
  }
  redirect('/dashboard');
}
