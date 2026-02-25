"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { OrderProvider, useOrders } from "@/app/context/OrderContext";
import { useAuth } from "@/app/context/AuthContext";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import { CreateOrderDto } from "@/app/dtos/order.dto";

const CartPageInner = () => {
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user, loading } = useAuth();

  const [notes, setNotes] = useState("");
  const [loadingOrder, setLoadingOrder] = useState(false);

  // Wait until authentication finishes loading
  if (loading) return <p className="p-6">Loading...</p>;

  const handleCheckout = async () => {
    if (!user) {
      alert("User not authenticated");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    setLoadingOrder(true);

    try {
      // ✅ Correct payload according to Postman
      const orderData: CreateOrderDto = {
        foodItems: cartItems.map((item) => item._id),
        status: "pending",
        notes,
      };

      await addOrder(orderData);

      alert("Order placed successfully!");
      clearCart();
      setNotes("");
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoadingOrder(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                id={item._id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>

          {/* Summary & Notes */}
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-white shadow">
              <label className="block text-sm font-medium mb-2">
                Order Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions..."
                className="w-full p-2 border rounded resize-none"
                rows={3}
              />
            </div>

            <CartSummary
              onCheckout={handleCheckout}
              loading={loadingOrder}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function CartPage() {
  return (
    <OrderProvider>
      <CartPageInner />
    </OrderProvider>
  );
}