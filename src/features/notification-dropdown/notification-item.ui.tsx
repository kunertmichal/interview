import { AcceptInvitation } from '@/features/organization/accept-invitation';

export type NotificationItemProps = {
  notification: TNotification;
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  switch (notification.type) {
    case 'organization_invite':
      return (
        <div className="flex gap-x-2">
          <span>{notification.content}</span>
          <AcceptInvitation notification={notification} />
        </div>
      );
    default:
      return <div>{notification.content}</div>;
  }
};
