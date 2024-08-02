import { Button } from '@/shared/ui/button';
import { Table } from '@/shared/ui/table';
import { CellConfig } from '@/shared/ui/table/table.ui';
import { createClient } from '@/shared/utils/supabase/server';
import { EditOrganization } from '@/features/organization/edit-organization';

export type OrganizationProps = {
  isOwner: boolean;
  organizationId: string;
};

export const Organization = async ({
  isOwner,
  organizationId,
}: OrganizationProps) => {
  const supabase = createClient();

  const { data: allMembers, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('organization_id', organizationId);

  const tableHeadings: Array<CellConfig> = [
    { value: 'Name', align: 'left' },
    { value: 'Email', align: 'left' },
    { value: 'Actions', align: 'right' },
  ];

  const rows: Array<CellConfig[]> =
    allMembers?.map((member) => {
      return [
        {
          value: `${member.first_name} ${member.last_name}`,
          align: 'left',
        },
        {
          value: member.email,
          align: 'left',
        },
        {
          value: 'actions',
          align: 'right',
        },
      ];
    }) ?? [];

  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold">Organisation management</h2>
        <div className="ml-auto flex gap-2">
          <Button>Invite members</Button>
          <EditOrganization organizationId={organizationId} />
        </div>
      </div>
      {/* <div>invite users</div>
      <div>remove organization</div>
      <div>rename organization</div>}
      <div>members count: {membersCount}</div> */}
      {isOwner.toString()}
      {error && <div>{error.message}</div>}
      <Table
        headings={tableHeadings}
        rows={rows}
        renderCell={(value) =>
          value === 'actions' ? <div>actions</div> : <div>{value}</div>
        }
      />
    </div>
  );
};
