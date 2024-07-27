'use server';

import { FormInput } from '@/shared/ui/form-input/form-input';
import { login, signup } from './login.api';

export async function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 border-neutral-content rounded-md flex gap-10">
        <div className="pl-16 py-10">
          <p className="text-2xl font-semibold mb-4">Login</p>
          <form action={login} className="flex flex-col gap-4">
            <FormInput name="email" label="What is your email?" />
            <FormInput
              name="password"
              type="password"
              label="What is your password?"
            />
            <div className="mt-6">
              <button className="btn btn-primary" type="submit">
                Log in
              </button>
            </div>
          </form>
        </div>
        <div className="pr-16 py-10">
          <p className="text-2xl font-semibold mb-4">Sign up</p>
          <form action={signup} className="flex flex-col gap-4">
            <FormInput name="email" label="What is your email?" />
            <FormInput
              name="password"
              type="password"
              label="What is your password?"
            />
            <FormInput
              name="confirmPassword"
              type="password"
              label="Confirm password"
            />
            <div className="mt-6">
              <button className="btn btn-secondary" type="submit">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
