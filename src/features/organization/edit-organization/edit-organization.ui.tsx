import { Button } from '@/shared/ui/button';
import { Drawer } from '@/shared/ui/drawer';
import { Settings } from 'lucide-react';

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
      <h3 className="text-xl font-semibold text-white">Edit Organization</h3>
      <h3 className="text-xl font-semibold text-white">Delete Organization</h3>
    </Drawer>
  );
};
