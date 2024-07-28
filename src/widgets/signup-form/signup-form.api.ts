import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { SubmissionResult } from '@conform-to/react';
import { createClient } from '@/shared/utils/supabase/client';
import { signupSchema } from './signup-form.model';

export async function signup(_: unknown, formData: FormData) {
  const supabase = createClient();

  const submission = parseWithZod(formData, {
    schema: signupSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = {
    email: submission.value.email,
    password: submission.value.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return {
      status: 'error',
      error: {
        form: ['Unable to create account'],
      },
    } as SubmissionResult<string[]>;
  }

  redirect('/');
}
