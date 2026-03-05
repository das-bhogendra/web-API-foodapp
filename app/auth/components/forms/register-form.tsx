'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/app/lib/api/auth';

export default function RegisterForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      return 'All required fields must be filled';
    }

    if (username.length < 3) {
      return 'Username must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        fullName: fullName.trim(),
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
        phoneNumber: phoneNumber.trim() || undefined,
      });

      router.push('/auth/login');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Create Account
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 text-sm p-3 rounded-md text-center">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Full Name *"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        disabled={loading}
        className="w-full px-4 py-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <input
        type="text"
        placeholder="Username *"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
        className="w-full px-4 py-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <input
        type="email"
        placeholder="Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className="w-full px-4 py-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <input
        type="text"
        placeholder="Phone Number (optional)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        disabled={loading}
        className="w-full px-4 py-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <input
        type="password"
        placeholder="Password *"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        className="w-full px-4 py-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <input
        type="password"
        placeholder="Confirm Password *"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={loading}
        className="w-full px-4 py-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition duration-300 font-medium disabled:opacity-50"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      <div className="text-center text-sm text-gray-700">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-orange-600 hover:underline">
          Login
        </Link>
      </div>

    </form>
  );
}