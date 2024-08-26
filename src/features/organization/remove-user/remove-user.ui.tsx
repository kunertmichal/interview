'use client';

import { Trash2 } from 'lucide-react';
import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Button } from '@/shared/ui/button';
import { removeUserSchema, removeUser } from './';

export type RemoveUserProps = {
  userId: string;
};

export const RemoveUser = ({ userId }: RemoveUserProps) => {
  const [lastResult, action] = useFormState(removeUser, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: removeUserSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div>
      {lastResult?.status === 'error' && <p>{lastResult.error?.form}</p>}
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <input type="hidden" name={fields.userId.name} value={userId} />
        <Button size="sm" shape="circle" variant="error" type="submit">
          <Trash2 className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};
