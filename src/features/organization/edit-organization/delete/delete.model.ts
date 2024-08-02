import { z } from 'zod';

export const deleteSchema = z
  .object({
    organizationId: z.string(),
    organizationName: z.string(),
    confirmName: z.string(),
  })
  .refine((data) => data.organizationName === data.confirmName, {
    message: "The entered name does not match the organization's name",
    path: ['confirmName'],
  });
