'use client';

import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { FormInput } from '@/shared/ui/form-input';
import { login } from './login-form.api';
import { loginSchema } from './login-form.model';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';

export const LoginForm = () => {
  const [lastResult, action] = useFormState(login, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <>
      <p className="text-2xl font-semibold mb-4">Login</p>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate
        className="flex flex-col gap-4"
      >
        {lastResult?.status === 'error' && lastResult?.error && (
          <Alert variant="error">{lastResult.error.form}</Alert>
        )}
        <FormInput
          label="What is your email?"
          key={fields.email.key}
          name={fields.email.name}
          errors={fields.email.errors?.join(', ')}
        />
        <FormInput
          label="What is your password?"
          key={fields.password.key}
          name={fields.password.name}
          type="password"
          errors={fields.password.errors?.join(', ')}
        />
        <div className="mt-6">
          <Button type="submit">Log in</Button>
        </div>
      </form>
    </>
  );
};
