import { z } from 'zod';

export const renameSchema = z.object({
  name: z.string(),
  organizationId: z.string(),
});
