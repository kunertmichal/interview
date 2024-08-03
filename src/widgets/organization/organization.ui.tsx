import { Table } from '@/shared/ui/table';
import { CellConfig } from '@/shared/ui/table/table.ui';
import { createClient } from '@/shared/utils/supabase/server';
import { EditOrganization } from '@/features/organization/edit-organization';
import { InviteToOrganization } from '@/features/organization/invite-to-organization';
import { H2 } from '@/shared/ui/text';

export type OrganizationProps = {
  isOwner: boolean;
  organizationId: string;
  organizationName: string;
};

export const Organization = async ({
  isOwner,
  organizationId,
  organizationName,
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
      <div className="flex items-center mb-8">
        <H2>Organization {organizationName}</H2>
        {isOwner && (
          <div className="ml-auto flex gap-2">
            <InviteToOrganization organizationId={organizationId} />
            <EditOrganization
              organizationId={organizationId}
              organizationName={organizationName}
            />
          </div>
        )}
      </div>
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
