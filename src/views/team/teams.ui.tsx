import { getUserOrRedirect } from '@/entities';
import { getOrganizationByUserId } from '@/entities/organization';
import { H2 } from '@/shared/ui/text';
import { CreateTeam } from '@/features/teams/create-team';

export const TeamsPage = async () => {
  const user = await getUserOrRedirect();
  const organization = await getOrganizationByUserId(user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <H2>Teams in your organization</H2>
        <CreateTeam />
      </div>
      {organization ? <div>lista teamow</div> : <div>empty state</div>}
    </div>
  );
};
