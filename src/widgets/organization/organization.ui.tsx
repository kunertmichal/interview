import { Table } from '@/shared/ui/table';
import { CellConfig } from '@/shared/ui/table/table.ui';
import { createClient } from '@/shared/utils/supabase/server';
import { EditOrganization } from '@/features/organization/edit-organization';
import { InviteToOrganization } from '@/features/organization/invite-to-organization';
import { H2 } from '@/shared/ui/text';
import { getUserOrRedirect } from '@/entities';
import { hasUserRole } from '@/shared/utils/permissions';
import { RemoveUser } from '@/features/organization/remove-user';

export type OrganizationProps = {
  organizationId: string;
  organizationName: string;
};

export const Organization = async ({
  organizationId,
  organizationName,
}: OrganizationProps) => {
  const supabase = createClient();

  const user = await getUserOrRedirect();

  const { data: allMembers, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('organization_id', organizationId);

  const isOwner = await hasUserRole(user.id, 'organization_owner');

  const tableHeadings: Array<CellConfig> = [
    { value: 'Name', align: 'left' },
    { value: 'Email', align: 'left' },
    ...(isOwner ? [{ value: 'Actions', align: 'right' } as const] : []),
  ];

  const rows: Array<CellConfig<TProfile>[]> =
    allMembers?.map((member) => {
      const baseRow: CellConfig<TProfile>[] = [
        {
          value: `${member.first_name} ${member.last_name}`,
          align: 'left',
          originalData: member,
        },
        {
          value: member.email,
          align: 'left',
          originalData: member,
        },
      ];

      if (isOwner) {
        baseRow.push({
          value: 'actions',
          align: 'right',
          originalData: member,
        });
      }

      return baseRow;
    }) ?? [];

  return (
    <div>
      <div className="flex items-center mb-8">
        <H2>Organization {organizationName}</H2>
        {isOwner && (
          <div className="ml-auto flex gap-2">
            <InviteToOrganization />
            <EditOrganization
              organizationId={organizationId}
              organizationName={organizationName}
            />
          </div>
        )}
      </div>
      {error && <div>{error.message}</div>}
      <Table<TProfile>
        headings={tableHeadings}
        rows={rows}
        renderCell={(cellData) => {
          if (cellData.value === 'actions') {
            return user.id === cellData.originalData?.id ? (
              <>-</>
            ) : (
              <RemoveUser userId={cellData.originalData!.id} />
            );
          }
          return cellData.value;
        }}
      />
    </div>
  );
};
