import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { createClient } from '@/shared/utils/supabase/client';
import { loginSchema } from './login-form.model';
import { SubmissionResult } from '@conform-to/react';

export async function login(prevState: unknown, formData: FormData) {
  const supabase = createClient();

  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = {
    email: submission.value.email,
    password: submission.value.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      status: 'error',
      error: {
        form: ['Invalid credentials'],
      },
    } as SubmissionResult<string[]>;
  }

  redirect('/dashboard');
}
