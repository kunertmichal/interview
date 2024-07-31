import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';
import { CreateOrganization } from '@/widgets/organization/create-organization';

export const OrganizationPage = async () => {
  const supabase = createClient();

  const { data: userData, error } = await supabase.auth.getUser();
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user?.id)
    .maybeSingle();

  if (error || !userData) {
    redirect('/login');
  }

  const organizationId = profileData?.organization_id;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Organisation mnagement</h2>
      <ul>
        <li>tabela userow if owner</li>
        <li>user management w tabeli</li>
        <li>delete organisation if owner</li>
        <li>jesli jest organisation member to wyswietl nazwe</li>
        <li>jesli jest organisation member to wyswietl leave organisation</li>
        <li>data: {JSON.stringify(organizationId)}</li>
      </ul>
      {!organizationId && <CreateOrganization ownerId={userData.user.id} />}
    </div>
  );
};
