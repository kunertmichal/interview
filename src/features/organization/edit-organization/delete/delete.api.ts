'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { deleteSchema } from './delete.model';
import { parseWithZod } from '@conform-to/zod';
import { SubmissionResult } from '@conform-to/react';
import { revalidatePath } from 'next/cache';

export async function deleteOrganization(_: unknown, formData: FormData) {
  const supabase = createClient();

  const submission = parseWithZod(formData, {
    schema: deleteSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { organizationId, organizationName } = submission.value;

  const { data: organization, error: fetchError } = await supabase
    .from('organizations')
    .select('id, name')
    .eq('id', organizationId)
    .single();

  if (fetchError || !organization) {
    console.log(fetchError);
    return {
      status: 'error',
      error: {
        form: ['Organization not found'],
      },
    } as SubmissionResult<string[]>;
  }

  if (organization.name !== organizationName) {
    return {
      status: 'error',
      error: {
        form: ['Organization name mismatch'],
      },
    } as SubmissionResult<string[]>;
  }

  const { error: deleteError } = await supabase
    .from('organizations')
    .delete()
    .eq('id', organizationId);

  if (deleteError) {
    console.log(deleteError);
    return {
      status: 'error',
      error: {
        form: ['Unable to rename organisation'],
      },
    } as SubmissionResult<string[]>;
  } else {
    revalidatePath('/organization');
    return {
      status: 'success',
    } as SubmissionResult<string[]>;
  }
}
