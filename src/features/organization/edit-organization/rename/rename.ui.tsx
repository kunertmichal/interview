'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFormState } from 'react-dom';
import { Button } from '@/shared/ui/button';
import { FormInput } from '@/shared/ui/form-input';
import { rename } from './rename.api';
import { renameSchema } from './rename.model';
import { Alert } from '@/shared/ui/alert';

export type RenameProps = {
  organizationId: string;
};

export const Rename = ({ organizationId }: RenameProps) => {
  const [lastResult, action] = useFormState(rename, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: renameSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div>
      <h3 className="text-xl font-semibold text-white">Edit Organization</h3>
      <p className="text-sm mb-4">Change the name of your organization</p>
      {lastResult?.status === 'error' && lastResult?.error && (
        <Alert variant="error" className="mb-4">
          {lastResult.error.form}
        </Alert>
      )}
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <div className="flex gap-2">
          <FormInput
            inputSize="sm"
            key={fields.name.key}
            name={fields.name.name}
            errors={fields.name.errors?.join(', ')}
          />
          <input type="hidden" name="organizationId" value={organizationId} />
          <Button size="sm" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
