export type NotificationItemProps = {
  notification: TNotification;
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  return <div>{notification.content}</div>;
};
