import { createClient } from '@/shared/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getUserOrRedirect() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  return user;
}
