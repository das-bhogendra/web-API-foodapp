"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { OrderProvider, useOrders } from "@/app/context/OrderContext";
import OrderList from "../orders/components/OrderList";

const ProfilePageInner = () => {
  const { user } = useAuth();
  const { orders, fetchOrders } = useOrders();
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  useEffect(() => {
    if (user?.id) {
      fetchOrders(user.id);
    }
  }, [user]);

  if (!user) {
    return <div className="p-4">Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 ${activeTab === "profile" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
        >
          Profile Information
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 ${activeTab === "orders" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
        >
          Order History ({orders.length})
        </button>
      </div>

      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-lg">{user.name || "N/A"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 text-lg">{user.username || "N/A"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-lg">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Account Statistics</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <div className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'delivered').length}
                </div>
                <div className="text-sm text-gray-600">Completed Orders</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded">
                <div className="text-2xl font-bold text-yellow-600">
                  ${orders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              You haven't placed any orders yet.
            </div>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      )}
    </div>
  );
};

const ProfilePage = () => (
  <OrderProvider>
    <ProfilePageInner />
  </OrderProvider>
);

export default ProfilePage;
