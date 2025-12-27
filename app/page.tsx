"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black font-sans">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-6 bg-white dark:bg-gray-900 shadow">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">FoodApp</span>
        </div>
        <nav className="flex gap-4">
          <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:underline">
            Login
          </Link>
          <Link href="/auth/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-6">
          Welcome to FoodApp
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-xl mb-8">
          Discover amazing recipes, manage your orders, and enjoy delicious food with our FoodApp platform.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register" className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
            Get Started
          </Link>
          <Link href="/auth/login" className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Login
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        &copy; {new Date().getFullYear()} FoodApp. All rights reserved.
      </footer>
    </div>
  );
}
