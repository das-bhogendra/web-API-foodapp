"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">🍔</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">FoodWorld</span>
        </div>
        <nav className="flex gap-4 items-center">
          {!user ? (
            <>
              <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition">
                Login
              </Link>
              <Link href="/auth/register" className="text-sm font-medium bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.name || user.email}</span>
              <Link
                href={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                className="text-sm font-medium bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Dashboard
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6 py-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-6">
            Delicious Food,
            <span className="text-orange-500 block">Delivered Fast</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience the best food delivery service with fresh ingredients, amazing flavors,
            and lightning-fast delivery to your doorstep.
          </p>

          {!user && (
            <div className="flex gap-4 justify-center mb-12">
              <Link href="/auth/register" className="px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-xl hover:bg-orange-600 transition transform hover:scale-105">
                Start Ordering
              </Link>
              <Link href="/auth/login" className="px-8 py-4 border-2 border-orange-500 text-orange-500 text-lg font-semibold rounded-xl hover:bg-orange-50 transition">
                Sign In
              </Link>
            </div>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🍕</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">We use only the freshest ingredients sourced locally.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered in under 30 minutes.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Quality</h3>
              <p className="text-gray-600">Rated 5 stars by thousands of satisfied customers.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-gray-600 bg-white/50 backdrop-blur-sm border-t">
        <div className="max-w-4xl mx-auto">
          <p>&copy; {new Date().getFullYear()} FoodWorld. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/about" className="hover:text-orange-500 transition">About</Link>
            <Link href="/contact" className="hover:text-orange-500 transition">Contact</Link>
            <Link href="/privacy" className="hover:text-orange-500 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
