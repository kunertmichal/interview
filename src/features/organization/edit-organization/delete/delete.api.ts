'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { deleteSchema } from './delete.model';
import { parseWithZod } from '@conform-to/zod';
import { revalidatePath } from 'next/cache';
import { sendFormResult } from '@/shared/utils/form-result';
import { logger } from '@/shared/utils/logger';
import { getUserOrRedirect } from '@/entities';
import { hasUserRole } from '@/shared/utils/permissions';

export async function deleteOrganization(_: unknown, formData: FormData) {
  const supabase = createClient();
  const user = await getUserOrRedirect();

  const isOwner = await hasUserRole(user.id, 'organization_owner');

  if (!isOwner) {
    return sendFormResult('error', ['Insufficient permissions']);
  }

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
    logger.error(fetchError);
    return sendFormResult('error', ['Organization not found']);
  }

  if (organization.name !== organizationName) {
    return sendFormResult('error', ['Organization name mismatch']);
  }

  const { error: deleteError } = await supabase
    .from('organizations')
    .delete()
    .eq('id', organizationId);

  if (deleteError) {
    logger.error(deleteError);
    return sendFormResult('error', ['Unable to delete organisation']);
  } else {
    revalidatePath('/organization');
    return sendFormResult('success');
  }
}
