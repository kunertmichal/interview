import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';
import { CreateOrganization } from '@/features/organization/create-organization';
import { Organization } from '@/widgets/organization';

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
        name,
        owner_id
      )
    `
    )
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Unable to fetch user organizations', error);
  }

  const { organization } = data || {};
  const isOwner = user.id === organization?.owner_id;

  return (
    <div className="">
      {organization ? (
        <Organization
          isOwner={isOwner}
          organizationId={organization.id}
          organizationName={organization.name}
        />
      ) : (
        <CreateOrganization ownerId={user.id} />
      )}
    </div>
  );
};
