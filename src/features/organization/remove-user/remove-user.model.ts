import { z } from 'zod';

export const removeUserSchema = z.object({
  userId: z.string(),
});
