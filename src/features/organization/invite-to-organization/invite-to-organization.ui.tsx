'use client';

import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Button } from '@/shared/ui/button';
import { Drawer } from '@/shared/ui/drawer';
import { H2, P } from '@/shared/ui/text';
import { inviteToOrganizationSchema, inviteToOrganization } from './';
import { FormInput } from '@/shared/ui/form-input';
import { Alert } from '@/shared/ui/alert';

export type InviteToOrganization = {
  organizationId: string;
};

export const InviteToOrganization = ({
  organizationId,
}: InviteToOrganization) => {
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
    <Drawer
      id="invite-to-organization"
      variant="right"
      renderButton={(id) => (
        <Button asChild>
          <label htmlFor={id}>Invite members</label>
        </Button>
      )}
    >
      <H2>Invite members</H2>
      <P className="mb-4">
        Provide the email address of the member you want to invite
      </P>
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
          <input
            type="hidden"
            name={fields.organizationId.name}
            value={organizationId}
          />
          <Button size="sm" type="submit">
            Send
          </Button>
        </div>
      </form>
    </Drawer>
  );
};
