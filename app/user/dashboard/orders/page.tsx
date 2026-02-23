"use client";
import React, { useEffect } from "react";
import { OrderProvider, useOrders } from "../../../context/OrderContext";
import { useAuth } from "../../../context/AuthContext";
import OrderList from "./components/OrderList";

const OrdersPageInner = () => {
  const { user } = useAuth();
  const { orders, fetchOrders } = useOrders();

  useEffect(() => {
    if (user?.id) {
      fetchOrders(user.id);
    }
  }, [user]);

  return <OrderList orders={orders} />;
};

const OrdersPage = () => (
  <OrderProvider>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <OrdersPageInner />
    </div>
  </OrderProvider>
);

export default OrdersPage;