'use client';  // ← Add this at the very top

import LoginForm from '../../components/forms/login-form';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <LoginForm />
    </div>
  );
}
