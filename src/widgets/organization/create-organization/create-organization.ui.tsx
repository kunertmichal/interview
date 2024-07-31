'use client';

import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { createOrganizationSchema } from './create-organization.model';
import { createOrganization } from './create-organization.api';
import { FormInput } from '@/shared/ui/form-input';
import { Button } from '@/shared/ui/button';

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
    <div>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate
        className="max-w-md"
      >
        <FormInput
          label="Organization name"
          key={fields.name.key}
          name={fields.name.name}
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
