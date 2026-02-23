import React from 'react';
import Sidebar from './_components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1">
        {/* Header */}
        <header className="bg-green-600 text-white p-4 text-xl font-bold">
          🍔 FoodApp Dashboard
        </header>

        {/* Main content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
