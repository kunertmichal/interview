'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { parseWithZod } from '@conform-to/zod';
import { createOrganizationSchema } from './create-organization.model';
import { SubmissionResult } from '@conform-to/react';
import { revalidatePath } from 'next/cache';

export async function createOrganization(_: unknown, formData: FormData) {
  const supabase = createClient();

  const submission = parseWithZod(formData, {
    schema: createOrganizationSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = {
    name: submission.value.name,
    ownerId: submission.value.ownerId,
  };

  const { error } = await supabase.rpc('create_organization_and_assign', {
    p_name: data.name,
    p_profile_id: data.ownerId,
  });

  revalidatePath('/dashboard/organisation');

  if (error) {
    console.log(error);
    return {
      status: 'error',
      error: {
        form: ['Unable to create organisation'],
      },
    } as SubmissionResult<string[]>;
  } else {
    return {
      status: 'success',
    } as SubmissionResult<string[]>;
  }
}
