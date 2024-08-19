import { Button } from '@/shared/ui/button';
import { Drawer } from '@/shared/ui/drawer';
import { H2, P } from '@/shared/ui/text';
import { Invite } from './invite';

export type InviteToOrganization = {
  organizationId: string;
};

export const InviteToOrganization = () => {
  return (
    <Drawer
      id="invite-to-organization"
      variant="right"
      renderButton={(id) => (
        <Button asChild>
          <label htmlFor={id}>Invite members</label>
        </Button>
      )}
    >
      <H2>Invite members</H2>
      <P className="mb-4">
        Provide the email address of the member you want to invite
      </P>
      <Invite />
    </Drawer>
  );
};
