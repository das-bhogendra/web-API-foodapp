"use client";
import React, { useEffect } from "react";
import { OrderProvider, useOrders } from "@/app/context/OrderContext";
import OrderList from "./components/OrderList";

const AdminOrdersPageInner = () => {
  const { orders, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders(); // admin fetches all orders
  }, []);

  return <OrderList orders={orders} />;
};

const AdminOrdersPage = () => (
  <OrderProvider>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <AdminOrdersPageInner />
    </div>
  </OrderProvider>
);

export default AdminOrdersPage;