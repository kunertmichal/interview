'use client';

import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { FormInput } from '@/shared/ui/form-input';
import { signupSchema } from './signup-form.model';
import { signup } from './signup-form.api';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';

export const SignUpForm = () => {
  const [lastResult, action] = useFormState(signup, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <>
      <p className="text-2xl font-semibold mb-4">Sign up</p>
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
        <FormInput
          label="What is your password?"
          key={fields.confirmPassword.key}
          name={fields.confirmPassword.name}
          type="password"
          errors={fields.confirmPassword.errors?.join(', ')}
        />
        <div className="mt-6">
          <Button variant="secondary" type="submit">
            Sign up
          </Button>
        </div>
      </form>
    </>
  );
};
