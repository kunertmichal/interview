import { LoginPage } from '@/views/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page',
};

export default function Login() {
  return <LoginPage />;
}
