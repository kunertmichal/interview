'use client';

import { Button } from '@/shared/ui/button';
import { FormInput } from '@/shared/ui/form-input';

export const Rename = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white">Edit Organization</h3>
      <p className="text-sm">Change the name of your organization</p>
      <form action="" className="mt-4">
        <div className="flex gap-2">
          <FormInput inputSize="sm" />
          <Button size="sm" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
