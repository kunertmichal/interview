import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return <div>{children}</div>;
}
