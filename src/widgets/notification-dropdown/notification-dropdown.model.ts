export type Notification = {
  id: string;
  content: string;
  created_at: string;
  type: 'invite';
  is_read: boolean;
  action_url?: string;
  user_id: string;
};
