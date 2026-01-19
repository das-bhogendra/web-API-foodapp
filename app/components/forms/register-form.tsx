'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full p-6 border rounded shadow space-y-4 mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Create Account</h2>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <input
        type="text"
        placeholder="Full Name *"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        disabled={loading}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Username *"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        placeholder="Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Phone Number (optional)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        disabled={loading}
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Password *"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Confirm Password *"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={loading}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
