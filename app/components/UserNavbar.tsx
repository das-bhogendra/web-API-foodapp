"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const UserNavbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const navItems = [
    { href: "/user/dashboard", label: "Dashboard", icon: "🏠" },
    { href: "/user/dashboard/food", label: "Menu", icon: "🍽️" },
    { href: "/user/dashboard/cart", label: "Cart", icon: "🛒", badge: cartItems.length },
    { href: "/user/dashboard/orders", label: "Orders", icon: "📦" },
    { href: "/user/dashboard/profile", label: "Profile", icon: "👤" },
  ];

  const isActive = (href: string) =>
    href === "/user/dashboard" ? pathname === "/user/dashboard" : pathname?.startsWith(href);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🍔</span>
              </div>
              <span className="text-xl font-bold text-gray-800">FoodWorld</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden md:block">
              Welcome, {user?.name || user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;