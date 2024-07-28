import Image from 'next/image';
import logoSvg from '@/app/logo.svg';
import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';
import { SignOut } from '@/widgets/sign-out';
import Link from 'next/link';

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
          <h1>
            <Image src={logoSvg} alt="Logo" width={32} height={32} />
          </h1>
          <ul className="flex items-center gap-4 ml-auto">
            <li>
              <Link href="/dashboard/team">Team</Link>
            </li>
            <li>
              <Link href="/dashboard/organisation">Organisation</Link>
            </li>
          </ul>
          <SignOut />
        </div>
      </nav>
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
}
