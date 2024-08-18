'use client';

import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Button } from '@/shared/ui/button';
import { Drawer } from '@/shared/ui/drawer';
import { H2, P } from '@/shared/ui/text';
import { FormInput } from '@/shared/ui/form-input';
import { createTeamSchema, createTeam } from './';
import { Alert } from '@/shared/ui/alert';

export const CreateTeam = () => {
  const [lastResult, action] = useFormState(createTeam, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createTeamSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <Drawer
      id="create-team"
      variant="right"
      renderButton={(id) => (
        <Button asChild>
          <label htmlFor={id}>Create team</label>
        </Button>
      )}
    >
      <H2>Create team</H2>
      <P className="mb-4">
        Provide a name for your team. Team members can be added later.
      </P>
      {lastResult?.status === 'error' && lastResult?.error && (
        <Alert variant="error" className="mb-4">
          {lastResult.error.form}
        </Alert>
      )}
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <div className="flex gap-2">
          <FormInput
            key={fields.name.key}
            name={fields.name.name}
            defaultValue={fields.name.initialValue}
            errors={fields.name.errors?.join(', ')}
            inputSize="sm"
          />
          <Button size="sm" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Drawer>
  );
};
