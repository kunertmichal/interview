import { CreateOrganization } from '@/features/organization/create-organization';
import { Organization } from '@/widgets/organization';
import { getUserOrRedirect } from '@/entities';
import { getOrganizationByUserId } from '@/entities/organization';

export const OrganizationPage = async () => {
  const user = await getUserOrRedirect();
  const organization = await getOrganizationByUserId(user.id);

  return (
    <div>
      {organization ? (
        <Organization
          organizationId={organization.id}
          organizationName={organization.name}
        />
      ) : (
        <CreateOrganization />
      )}
    </div>
  );
};
