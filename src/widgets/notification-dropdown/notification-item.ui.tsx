import { type Notification } from './';

export type NotificationItemProps = {
  notification: Notification;
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  return <div>{notification.content}</div>;
};
