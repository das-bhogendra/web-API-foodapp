import React from 'react';
import UserNavbar from '../components/UserNavbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <UserNavbar />
        <main>{children}</main>
      </div>
    </CartProvider>
  );
}