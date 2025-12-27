"use client";

import Link from "next/link";
import Header from "../components/Header"; // path adjust according to your project
import ThemeToggle from "../components/ThemeToggle";

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header with ThemeToggle */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Welcome to FoodApp Dashboard 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          This is your dashboard homepage. Use the links below to navigate.
        </p>

        {/* Links to dummy blog section */}
        <div className="space-y-2">
          <Link href="/dashboard/blogs" className="text-blue-600 dark:text-blue-400 underline">
            View all blogs
          </Link>
        </div>

        {/* Dummy dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h2 className="font-semibold text-lg">🍕 Orders</h2>
            <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h2 className="font-semibold text-lg">📦 Menu Items</h2>
            <p className="text-gray-500 dark:text-gray-400">5 items available</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h2 className="font-semibold text-lg">👤 Profile</h2>
            <p className="text-gray-500 dark:text-gray-400">Update your profile</p>
          </div>
        </div>
      </main>
    </div>
  );
}
