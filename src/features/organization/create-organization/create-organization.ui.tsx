'use client';

import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { createOrganizationSchema } from './create-organization.model';
import { createOrganization } from './create-organization.api';
import { FormInput } from '@/shared/ui/form-input';
import { Button } from '@/shared/ui/button';
import { Alert } from '@/shared/ui/alert';

export const CreateOrganization = ({ ownerId }: { ownerId: string }) => {
  const [lastResult, action] = useFormState(createOrganization, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createOrganizationSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="max-w-md">
      {lastResult?.status === 'error' && lastResult?.error && (
        <Alert variant="error" className="mb-4">
          {lastResult.error.form}
        </Alert>
      )}
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <FormInput
          label="Organization name"
          key={fields.name.key}
          name={fields.name.name}
          defaultValue={fields.name.initialValue}
          errors={fields.name.errors?.join(', ')}
        />
        <input
          type="hidden"
          key={fields.ownerId.key}
          name={fields.ownerId.name}
          value={ownerId}
        />
        <Button type="submit" className="mt-4">
          Create
        </Button>
      </form>
    </div>
  );
};
