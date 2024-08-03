import { z } from 'zod';

export const inviteToOrganizationSchema = z.object({
  email: z.string().email(),
  organizationId: z.string(),
});
