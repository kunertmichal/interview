import Image from 'next/image';
import Link from 'next/link';
import logoSvg from '@/app/logo.svg';
import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';
import { SignOut } from '@/features/sign-out';
import { NotificationDropdown } from '@/features/notification-dropdown';

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
        <div className="container flex gap-4 mx-auto p-4 text-lg">
          <h1>
            <Image src={logoSvg} alt="Logo" width={32} height={32} />
          </h1>
          <ul className="flex items-center gap-4 ml-auto">
            <li>
              <Link href="/dashboard/team">Team</Link>
            </li>
            <li>
              <Link href="/dashboard/organization">Organization</Link>
            </li>
          </ul>
          <SignOut />
          <NotificationDropdown userId={data.user.id} />
        </div>
      </nav>
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
}
