'use client';

import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Welcome, User 👋</h1>
      <p className="text-gray-600">
        This is your dashboard homepage. Here you can see your info, orders, etc.
      </p>

      {/* Example links */}
      <div className="space-y-2">
        <Link href="/" className="text-blue-600 underline">
          Go to Home
        </Link>
      </div>

      {/* Dummy dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">📦 My Orders</h2>
          <p className="text-gray-500">No orders yet</p>
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
