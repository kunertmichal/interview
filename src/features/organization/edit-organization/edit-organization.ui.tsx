import { Button } from '@/shared/ui/button';
import { Drawer } from '@/shared/ui/drawer';
import { Settings } from 'lucide-react';
import { Rename } from './rename/rename.ui';

export const EditOrganization = () => {
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
        <Rename />
        <h3 className="text-xl font-semibold text-white">
          Delete Organization
        </h3>
      </div>
    </Drawer>
  );
};
