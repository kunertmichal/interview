import { FormInput } from '@/shared/ui/form-input';

export const SignUpForm = () => {
  return (
    <>
      <p className="text-2xl font-semibold mb-4">Sign up</p>
      <form className="flex flex-col gap-4">
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
    </>
  );
};
