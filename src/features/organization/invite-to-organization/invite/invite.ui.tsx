'use client';

import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFormState } from 'react-dom';
import { inviteToOrganization, inviteToOrganizationSchema } from './';
import { FormInput } from '@/shared/ui/form-input';

export const Invite = () => {
  const [lastResult, action] = useFormState(inviteToOrganization, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: inviteToOrganizationSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div>
      {lastResult?.status === 'success' && (
        <Alert variant="success" className="mb-4">
          User with email address {fields.email.value} was successfully invited
        </Alert>
      )}
      {lastResult?.status === 'error' && lastResult?.error && (
        <Alert variant="error" className="mb-4">
          {lastResult.error.form}
        </Alert>
      )}
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <div className="flex gap-2">
          <FormInput
            inputSize="sm"
            key={fields.email.key}
            name={fields.email.name}
            errors={fields.email.errors?.join(', ')}
          />
          <Button size="sm" type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
