"use client";
import React, { useState } from "react";
import { CartProvider, useCart } from "../../../context/CartContext";
import { OrderProvider, useOrders } from "../../../context/OrderContext";
import { useAuth } from "../../../context/AuthContext";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";

const CartPageInner = () => {
  const { cartItems, clearCart, totalAmount } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    if (!user?.id && !user?._id) {
      alert("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        userId: user.id || user._id,
        foodItems: cartItems.map(item => ({
          foodId: item._id,
          quantity: item.quantity,
        })),
        notes,
      };

      await addOrder(orderData);
      alert("Order placed successfully!");
      clearCart();
      setNotes("");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <a href="/user/dashboard/food" className="text-blue-500 hover:underline mt-2 inline-block">
            Browse our menu
          </a>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item._id} id={item._id} {...item} />
            ))}
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-white shadow">
              <label className="block text-sm font-medium mb-2">Order Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions..."
                className="w-full p-2 border rounded resize-none"
                rows={3}
              />
            </div>

            <CartSummary onCheckout={handleCheckout} loading={loading} />
          </div>
        </div>
      )}
    </div>
  );
};

const CartPage = () => (
  <OrderProvider>
    <CartProvider>
      <CartPageInner />
    </CartProvider>
  </OrderProvider>
);

export default CartPage;