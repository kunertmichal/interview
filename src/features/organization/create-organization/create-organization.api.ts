'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';
import { parseWithZod } from '@conform-to/zod';
import { createOrganizationSchema } from './create-organization.model';
import { revalidatePath } from 'next/cache';
import { sendFormResult } from '@/shared/utils/form-result';
import { logger } from '@/shared/utils/logger';

export async function createOrganization(_: unknown, formData: FormData) {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData) {
    redirect('/login');
  }

  const submission = parseWithZod(formData, {
    schema: createOrganizationSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = {
    name: submission.value.name,
  };

  const { error } = await supabase.rpc('create_organization_and_assign', {
    org_name: data.name,
    owner_id: userData.user.id,
  });

  if (error) {
    logger.error(error);
    return sendFormResult('error', ['Unable to create organisation']);
  } else {
    revalidatePath('/dashboard/organisation');
    return sendFormResult('success');
  }
}
