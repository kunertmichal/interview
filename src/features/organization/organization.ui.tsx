import { Button } from '@/shared/ui/button';
import { Table } from '@/shared/ui/table';
import { CellConfig } from '@/shared/ui/table/table.ui';
import { createClient } from '@/shared/utils/supabase/server';
import { Settings } from 'lucide-react';

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
          <div className="drawer drawer-end">
            <input
              id="settings-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content">
              <label
                htmlFor="settings-drawer"
                className="drawer-button btn btn-secondary btn-square"
              >
                <Settings />
              </label>
            </div>
            <div className="drawer-side z-10">
              <label
                htmlFor="settings-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="bg-base-200 text-base-content min-h-full w-80 p-4">
                <li>rename organization</li>
                <li>usunięcie organization</li>
              </div>
            </div>
          </div>
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
