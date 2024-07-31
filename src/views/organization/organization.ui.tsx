import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';
import { CreateOrganization } from '@/widgets/organization/create-organization';

export const OrganizationPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
      organization_id,
      organization: organizations!profiles_organization_id_fkey (
        id,
        name
      )
    `
    )
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Unable to fetch user organizations', error);
  }

  const { organization_id, organization } = data || {};

  return (
    <div>
      <h2 className="text-2xl font-semibold">Organisation management</h2>
      <div className="mt-8">
        {organization_id ? (
          <div>{JSON.stringify(organization)}</div>
        ) : (
          <CreateOrganization ownerId={user.id} />
        )}
      </div>
    </div>
  );
};
