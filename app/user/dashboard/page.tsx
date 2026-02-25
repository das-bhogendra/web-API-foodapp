'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserDashboard() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false); // new flag

  useEffect(() => {
    if (!loading) {
      setAuthChecked(true); // auth check finished
      if (!isAuthenticated) {
        router.replace('/auth/login');
      }
    }
  }, [loading, isAuthenticated, router]);

  // WAIT until auth check finishes
  if (!authChecked || loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Welcome, {user?.fullName || user?.name || 'User'} 👋</h1>
      <p className="text-gray-600">
        This is your dashboard homepage. Here you can see your info, orders, etc.
      </p>

      {/* Example links */}
      <div className="space-y-2">
        <a href="/" className="text-blue-600 underline">
          Go to Home
        </a>
      </div>

      {/* Dummy dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">📦 My Orders</h2>
          <p className="text-gray-500">View your orders</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">👤 Profile</h2>
          <p className="text-gray-500">Update your profile</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">🍕 Menu</h2>
          <p className="text-gray-500">View available items</p>
        </div>
      </div>
    </div>
  );
}