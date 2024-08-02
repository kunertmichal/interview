'use server';

import { LoginForm } from '@/features/login-form';
import { SignUpForm } from '@/features/signup-form';

export async function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 border-neutral-content rounded-md flex gap-10">
        <div className="pl-16 py-10">
          <LoginForm />
        </div>
        <div className="pr-16 py-10">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
