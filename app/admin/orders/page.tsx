"use client";
import React, { useEffect, useState } from "react";
import { OrderProvider, useOrders } from "@/app/context/OrderContext";
import OrderList from "./components/OrderList";

const AdminOrdersPageInner = () => {
  const { orders, fetchOrders, editOrder, isLoading } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState(orders || []);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Update filtered orders when orders or filters change
  useEffect(() => {
    let filtered = orders ? [...orders] : [];

    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    filtered.sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortBy) {
        case "date":
          aVal = new Date(a.createdAt || 0);
          bVal = new Date(b.createdAt || 0);
          break;
        case "total":
          aVal = a.totalAmount;
          bVal = b.totalAmount;
          break;
        default:
          aVal = a.id;
          bVal = b.id;
      }
      return sortOrder === "asc" ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    setFilteredOrders(filtered);
  }, [orders, statusFilter, sortBy, sortOrder]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    if (!confirm(`Change order status to "${newStatus}"?`)) return;

    try {
      await editOrder(orderId, {
        status: newStatus as
          | "pending"
          | "confirmed"
          | "preparing"
          | "ready"
          | "delivered"
          | "cancelled",
      });
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      alert("Failed to update order status");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

      {/* Filters and Sort */}
      <div className="mb-4 flex gap-4 flex-wrap items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="date">Date</option>
            <option value="total">Total Amount</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Order</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border p-2 rounded"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <button
          onClick={() => fetchOrders()} 
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Refresh Orders
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <OrderList orders={filteredOrders} onStatusUpdate={handleStatusUpdate} />
      )}
    </div>
  );
};

const AdminOrdersPage = () => (
  <OrderProvider>
    <AdminOrdersPageInner />
  </OrderProvider>
);

export default AdminOrdersPage;