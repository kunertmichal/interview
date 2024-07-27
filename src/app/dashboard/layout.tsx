import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';
import { SignOut } from '@/widgets/sign-out';

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

  return (
    <div className="min-h-screen">
      <nav className="flex">
        <div className="container flex gap-4 mx-auto py-2 px-4">
          <h1>Logo</h1>
          <ul className="flex gap-4 ml-auto">
            <li>Team</li>
            <li>Organisation</li>
          </ul>
          <SignOut />
        </div>
      </nav>
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
}
