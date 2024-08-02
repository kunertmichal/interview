import { Button } from '@/shared/ui/button';
import { Drawer } from '@/shared/ui/drawer';
import { Settings } from 'lucide-react';
import { Rename } from './rename/rename.ui';
import { DeleteOrganization } from './delete';

export type EditOrganizationProps = {
  organizationId: string;
  organizationName: string;
};

export const EditOrganization = ({
  organizationId,
  organizationName,
}: EditOrganizationProps) => {
  return (
    <Drawer
      id="drawer"
      variant="right"
      renderButton={(id) => (
        <Button asChild variant="secondary" shape="square">
          <label htmlFor={id}>
            <Settings />
          </label>
        </Button>
      )}
    >
      <div className="flex flex-col gap-8">
        <h3 className="text-3xl font-semibold text-white">Edit Organization</h3>
        <Rename organizationId={organizationId} />
        <DeleteOrganization
          organizationId={organizationId}
          organizationName={organizationName}
        />
      </div>
    </Drawer>
  );
};
