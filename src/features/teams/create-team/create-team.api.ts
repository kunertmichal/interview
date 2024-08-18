'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { getUserOrRedirect } from '@/entities';
import { sendFormResult } from '@/shared/utils/form-result';
import { createClient } from '@/shared/utils/supabase/server';
import { logger } from '@/shared/utils/logger';
import { createTeamSchema } from './';

export async function createTeam(_: unknown, formData: FormData) {
  const supabase = createClient();
  const user = await getUserOrRedirect();

  const submission = parseWithZod(formData, {
    schema: createTeamSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  if (!user.organization_id) {
    return sendFormResult('error', ['Organization not found']);
  }

  const data = {
    name: submission.value.name,
  };

  const { data: teamId, error } = await supabase.rpc('create_team_and_assign', {
    team_name: data.name,
    org_id: user.organization_id,
    owner_id: user.id,
  });

  if (error || !teamId) {
    logger.error(error);
    return sendFormResult('error', ['Unable to create team']);
  } else {
    revalidatePath('/dashboard/teams');
    redirect(`/dashboard/teams/${teamId}`);
  }
}
