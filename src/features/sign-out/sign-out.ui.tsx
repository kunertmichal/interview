'use client';

import { Button } from '@/shared/ui/button';
import { createClient } from '@/shared/utils/supabase/client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SignOut() {
  const supabase = createClient();
  const router = useRouter();

  const onSignOutClick = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <Button onClick={onSignOutClick} variant="ghost" shape="circle">
      <LogOut />
    </Button>
  );
}
