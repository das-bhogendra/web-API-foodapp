'use client';

import Link from 'next/link';
import Input from '../ui/input';
import Button from '../ui/button';
import { useLoginForm } from '../../features/auth/hooks/use-login-form';

export default function LoginForm() {
  const { form, error, handleChange, handleSubmit } = useLoginForm();

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button>Login</Button>
      </form>

      {/* 👇 Login failed → show register */}
      {error && (
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don’t have an account?
            <Link
              href="/auth/register"
              className="text-blue-600 underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
