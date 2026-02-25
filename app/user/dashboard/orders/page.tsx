"use client";

import React, { useEffect } from "react";
import { OrderProvider, useOrders } from "@/app/context/OrderContext";
import { useAuth } from "@/app/context/AuthContext";
import OrderList from "./components/OrderList";

const OrdersPageInner = () => {
  const { user, loading } = useAuth();
  const { orders, fetchOrders, isLoading } = useOrders();

  // Fetch orders after user is available
  useEffect(() => {
    if (!loading && user) {
      fetchOrders(); // ✅ No userId needed
    }
  }, [user, loading]);

  if (loading || isLoading) {
    return (
      <div className="text-center py-12">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          You have no orders yet.
        </div>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
};

const OrdersPage = () => {
  return (
    <OrderProvider>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <OrdersPageInner />
      </div>
    </OrderProvider>
  );
};

export default OrdersPage;