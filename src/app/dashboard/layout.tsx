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
        <div className="container flex mx-auto py-4 px-8 gap-4 text-lg">
          <span className="flex items-center">
            <Image src={logoSvg} alt="Logo" width={32} height={32} />
          </span>
          <ul className="flex items-center gap-4 ml-auto">
            <li>
              <Link href="/dashboard/teams">Teams</Link>
            </li>
            <li>
              <Link href="/dashboard/organization">Organization</Link>
            </li>
          </ul>
          <div className="flex items-center">
            <SignOut />
            <NotificationDropdown userId={data.user.id} />
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-8">{children}</div>
    </div>
  );
}
