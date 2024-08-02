'use client';

import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { deleteSchema } from './delete.model';
import { deleteOrganization } from './delete.api';
import { FormInput } from '@/shared/ui/form-input';
import { Button } from '@/shared/ui/button';
import { Alert } from '@/shared/ui/alert';

export type DeleteOrganizationProps = {
  organizationId: string;
  organizationName: string;
};

export const DeleteOrganization = ({
  organizationId,
  organizationName,
}: DeleteOrganizationProps) => {
  const [lastResult, action] = useFormState(deleteOrganization, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: deleteSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div>
      <h3 className="text-xl font-semibold text-white">Delete</h3>
      <p className="text-sm mb-4">
        To delete your organization, provide its name below and confirm
      </p>
      {lastResult?.status === 'error' && lastResult?.error && (
        <Alert variant="error" className="mb-4">
          {lastResult.error.form}
        </Alert>
      )}
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <div className="flex gap-2">
          <FormInput
            inputSize="sm"
            key={fields.confirmName.key}
            name={fields.confirmName.name}
            errors={fields.confirmName.errors?.join(', ')}
          />
          <input
            type="hidden"
            name={fields.organizationName.name}
            value={organizationName}
          />
          <input
            type="hidden"
            name={fields.organizationId.name}
            value={organizationId}
          />
          <Button type="submit" size="sm" variant="error">
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
};
