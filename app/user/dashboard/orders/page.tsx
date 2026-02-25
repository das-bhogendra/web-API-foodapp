"use client";
import React, { useEffect } from "react";
import { OrderProvider, useOrders } from "@/app/context/OrderContext";
import { useAuth } from "@/app/context/AuthContext";
import OrderList from "./components/OrderList";

const OrdersPageInner = () => {
  const { user } = useAuth();
  const { orders, fetchOrders, isLoading } = useOrders();

  useEffect(() => {
    if (user?.id || user?._id) {
      fetchOrders(user.id || user._id); // fetch only this user's orders
    }
  }, [user]);

  if (isLoading) return <div className="text-center py-12">Loading your orders...</div>;

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

const OrdersPage = () => (
  <OrderProvider>
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <OrdersPageInner />
    </div>
  </OrderProvider>
);

export default OrdersPage;