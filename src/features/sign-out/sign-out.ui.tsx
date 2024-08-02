'use client';

import { createClient } from '@/shared/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function SignOut() {
  const supabase = createClient();
  const router = useRouter();

  const onSignOutClick = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return <button onClick={onSignOutClick}>Sign out</button>;
}
