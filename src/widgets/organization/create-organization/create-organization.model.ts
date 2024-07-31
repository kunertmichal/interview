import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().min(3),
  ownerId: z.string(),
});
