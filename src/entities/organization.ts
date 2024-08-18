import { createClient } from '@/shared/utils/supabase/server';

export async function getOrganizationByUserId(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
      organization_id,
      organization: organizations!profiles_organization_id_fkey (
        id,
        name,
        owner_id
      )
    `
    )
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Unable to fetch user organizations', error);
    return null;
  }

  return data.organization;
}
