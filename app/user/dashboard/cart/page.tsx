"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";

const CartPageInner = () => {
  const router = useRouter();
  const { cartItems } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    router.push("/user/dashboard/cart/payment");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.push("/user/dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
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

          <div className="space-y-4">
            <CartSummary
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function CartPage() {
  return <CartPageInner />;
}
