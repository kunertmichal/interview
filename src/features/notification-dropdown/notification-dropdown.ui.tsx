'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { createClient } from '@/shared/utils/supabase/client';
import {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';
import { NotificationItem } from './notification-item.ui';

export const NotificationDropdown = ({ userId }: { userId: string }) => {
  const supabase = createClient();

  const [data, setData] = useState<Array<TNotification>>([]);
  const [error, setError] = useState<any>(null);

  const canDisplayNotifications = data && data.length > 0 && !error;
  const emptyState = data && !error && data.length === 0;
  const hasUnreadNotifications = data?.some(
    (notification) => !notification.is_read
  );

  const handleInserts = (
    payload: RealtimePostgresInsertPayload<TNotification>
  ) => {
    setData((prev) => [payload.new, ...prev]);
  };

  const handleUpdates = (
    payload: RealtimePostgresUpdatePayload<TNotification>
  ) => {
    setData((prev) =>
      prev
        .map((notification) =>
          notification.id === payload.new.id ? payload.new : notification
        )
        .filter((notification) => !notification.is_read)
    );
  };

  useEffect(() => {
    supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('is_read', false)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(error);
        } else {
          setData(data);
        }
      });

    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        handleInserts
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        handleUpdates
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  return (
    <div className="dropdown dropdown-end relative z-10">
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
        <div className="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 py-2 px-4 shadow space-y-2">
          {data?.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  );
};
