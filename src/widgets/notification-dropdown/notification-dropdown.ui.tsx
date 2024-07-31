'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { createClient } from '@/shared/utils/supabase/client';
import { Bell } from 'lucide-react';
import { NotificationItem, Notification } from './';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';

export const NotificationDropdown = ({ userId }: { userId: string }) => {
  const supabase = createClient();

  const [data, setData] = useState<Array<Notification>>([]);
  const [error, setError] = useState<any>(null);

  const canDisplayNotifications = data && !error;
  const emptyState = data && !error && data.length === 0;
  const hasUnreadNotifications = data?.some(
    (notification) => !notification.is_read
  );

  const handleInserts = (
    payload: RealtimePostgresInsertPayload<Notification>
  ) => {
    setData((prev) => [payload.new, ...prev]);
  };

  useEffect(() => {
    supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .then(({ data, error }) => {
        if (error) {
          setError(error);
        } else {
          setData(data);
        }
      });

    supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        handleInserts
      )
      .subscribe();
  }, [supabase, userId]);

  return (
    <div className="dropdown dropdown-end">
      <div className="relative">
        <Button variant="ghost" shape="circle">
          <Bell />
        </Button>

        {hasUnreadNotifications && (
          <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        )}
      </div>
      {error && <div>Error fetching notifications</div>}
      {emptyState && (
        <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64">
          No notifications
        </div>
      )}
      {canDisplayNotifications && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow"
        >
          {data?.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
