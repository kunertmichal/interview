import { z } from 'zod';

export const acceptInvitationSchema = z.object({
  notificationId: z.string(),
  action: z.literal('accepted').or(z.literal('declined')),
});
