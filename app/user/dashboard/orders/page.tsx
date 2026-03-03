"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OrderProvider, useOrders } from "@/app/context/OrderContext";
import { useAuth } from "@/app/context/AuthContext";
import OrderList from "./components/OrderList";

const OrdersPageInner = () => {
  const { user, loading } = useAuth();
  const { orders, fetchOrders, isLoading } = useOrders();

  useEffect(() => {
    if (!loading && user) {
      fetchOrders();
    }
  }, [user, loading]);

  // 🔄 Loading State (Beautiful Skeleton UI)
  if (loading || isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  // 📭 Empty State
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🧾</div>
        <h2 className="text-xl font-semibold text-gray-800">
          No Orders Yet
        </h2>
        <p className="text-gray-500 mt-2 max-w-sm">
          Looks like you haven’t placed any orders yet. Start exploring delicious food and place your first order!
        </p>

        <a
          href="/user/food"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 hover:scale-105"
        >
          Browse Food
        </a>
      </div>
    );
  }

  // 📦 Orders List
  return (
    <div className="space-y-6">
      <OrderList orders={orders} />
    </div>
  );
};

const OrdersPage = () => {
  const router = useRouter();
  
  return (
    <OrderProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          
          {/* Header Section */}
          <div className="mb-10">
            <button
              onClick={() => router.push("/user/dashboard")}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900">
              My Orders
            </h1>
            <p className="text-gray-500 mt-2">
              Track and manage your recent purchases easily.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <OrdersPageInner />
          </div>
        </div>
      </div>
    </OrderProvider>
  );
};

export default OrdersPage;