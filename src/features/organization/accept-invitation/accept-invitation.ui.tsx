'use client';

import { Check, X } from 'lucide-react';
import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Button } from '@/shared/ui/button';
import { acceptInvitationSchema, handleOrganizationInvite } from './';

export type AcceptInvitationProps = {
  notification: TNotification;
};
export const AcceptInvitation = ({ notification }: AcceptInvitationProps) => {
  const [lastResult, action] = useFormState(
    handleOrganizationInvite,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: acceptInvitationSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate
      className="flex"
    >
      <input
        type="hidden"
        name={fields.notificationId.name}
        value={notification.id}
      />
      <Button
        variant="ghost"
        size="sm"
        shape="circle"
        type="submit"
        value="accepted"
        name={fields.action.name}
      >
        <Check className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        shape="circle"
        type="submit"
        value="declined"
        name={fields.action.name}
      >
        <X className="h-4 w-4" />
      </Button>
      {fields.action.errors?.join(', ')}
    </form>
  );
};
