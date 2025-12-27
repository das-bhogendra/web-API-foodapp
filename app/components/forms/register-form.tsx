
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter(); // ✅ router

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert('Fill all fields');
      return;
    }

    // 🔐 Here you would normally call register API
    // await registerService({ username, email, password });

    alert('Registered successfully!');

    // ✅ Redirect to login page after success
    router.push('/auth/login');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full p-6 border rounded shadow space-y-4 mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Register
      </button>
    </form>
  );
}
