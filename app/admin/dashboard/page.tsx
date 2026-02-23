"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardHome() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Welcome to FoodApp Dashboard 👋</h1>
      <p className="text-gray-600">
        This is your dashboard homepage. Use the links below to navigate.
      </p>

      {/* Links to dummy blog section */}
      <div className="space-y-2">
        <Link href="/dashboard/blogs" className="text-blue-600 underline">
          View all blogs
        </Link>
      </div>

      {/* Dummy dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">🍕 Orders</h2>
          <p className="text-gray-500">No orders yet</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">📦 Menu Items</h2>
          <p className="text-gray-500">5 items available</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">👤 Profile</h2>
          <p className="text-gray-500">Update your profile</p>
        </div>
      </div>
    </div>
  );
}
