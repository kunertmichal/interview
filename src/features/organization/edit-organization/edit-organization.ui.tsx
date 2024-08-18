import { Button } from '@/shared/ui/button';
import { Drawer } from '@/shared/ui/drawer';
import { Settings } from 'lucide-react';
import { Rename } from './rename/rename.ui';
import { DeleteOrganization } from './delete';
import { H2 } from '@/shared/ui/text';

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
      id="edit-organization"
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
        <H2>Edit Organization</H2>
        <Rename organizationId={organizationId} />
        <DeleteOrganization
          organizationId={organizationId}
          organizationName={organizationName}
        />
      </div>
    </Drawer>
  );
};
