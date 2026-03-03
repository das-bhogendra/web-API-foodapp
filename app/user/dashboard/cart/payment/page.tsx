"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { usePayment, PaymentProvider } from "@/app/context/PaymentContext";
import { useOrders } from "@/app/context/OrderContext";
import { useAuth } from "@/app/context/AuthContext";
import { CreateOrderDto } from "@/app/dtos/order.dto";
import { PaymentDetails } from "@/app/lib/paymentApi";
import PaymentMethodSelector from "./components/PaymentMethodSelector";

const DELIVERY_FEE = 2.99;

const PaymentPageContent = () => {
  const router = useRouter();
  const { cartItems, clearCart, totalAmount } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  
  const {
    selectedMethod,
    setSelectedMethod,
    setPaymentDetails,
    isProcessing,
    setIsProcessing,
    paymentError,
    setPaymentError,
    setPaymentSuccess,
    setTransactionId,
  } = usePayment();

  const [orderId, setOrderId] = useState<string | null>(null);

  const handleMethodSelect = (method: string) => {
    setSelectedMethod({
      id: method,
      type: method as "visa" | "mastercard" | "amex" | "paypal" | "cod",
    });
    setPaymentError(null);
  };

  const handlePayNow = async () => {
    if (!selectedMethod) {
      setPaymentError("Please select a payment method");
      return;
    }

    if (selectedMethod.type === "cod") {
      await processPayment();
    }
  };

  const handleCardPayment = async () => {
    const cardNumber = (document.getElementById('cardNumber') as HTMLInputElement)?.value;
    const cardHolder = (document.getElementById('cardHolder') as HTMLInputElement)?.value;
    const expiryDate = (document.getElementById('expiryDate') as HTMLInputElement)?.value;
    const cvv = (document.getElementById('cvv') as HTMLInputElement)?.value;

    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      setPaymentError("Please fill in all card details");
      return;
    }

    const details: PaymentDetails = {
      cardNumber: cardNumber.replace(/\s/g, ""),
      cardHolder,
      expiryDate,
      cvv,
    };

    setPaymentDetails(details);
    await processPayment(details);
  };

  const processPayment = async (details?: PaymentDetails) => {
    if (!user || cartItems.length === 0) {
      setPaymentError("Invalid order or user");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const orderData: CreateOrderDto = {
        foodItems: cartItems.map((item) => item._id),
        status: "pending",
      };

      await addOrder(orderData);
      setOrderId("order-" + Date.now());

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const txId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setTransactionId(txId);
      setPaymentSuccess(true);

      clearCart();

      setTimeout(() => {
        router.push("/user/dashboard/orders");
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const grandTotal = totalAmount + DELIVERY_FEE;

  if (cartItems.length === 0 && !orderId) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
        <button
          onClick={() => router.push("/user/dashboard/food")}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Browse Food
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="p-4 border rounded-lg bg-white shadow">
            <PaymentMethodSelector onSelect={handleMethodSelect} />
          </div>

          {selectedMethod && selectedMethod.type !== "cod" && selectedMethod.type !== "paypal" && (
            <div className="p-4 border rounded-lg bg-white shadow">
              <h3 className="text-lg font-semibold mb-4">Card Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border rounded-lg"
                    maxLength={19}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                  <input
                    id="cardHolder"
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <input
                      id="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-3 border rounded-lg"
                      maxLength={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      className="w-full p-3 border rounded-lg"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>
          )}

          {selectedMethod?.type === "paypal" && (
            <div className="p-4 border rounded-lg bg-white shadow text-center py-8">
              <p className="text-lg mb-4">You will be redirected to PayPal to complete your payment.</p>
              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Continue to PayPal"}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-white shadow">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{item.quantity}x</span>
                    <span className="truncate max-w-[150px]">{item.name}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {selectedMethod && (
            <button
              onClick={selectedMethod.type === "cod" ? handlePayNow : handleCardPayment}
              disabled={isProcessing}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing Payment...
                </span>
              ) : selectedMethod.type === "cod" ? (
                `Place Order - Pay $${grandTotal.toFixed(2)} on Delivery`
              ) : (
                `Pay $${grandTotal.toFixed(2)}`
              )}
            </button>
          )}

          {paymentError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{paymentError}</p>
            </div>
          )}

          <button
            onClick={() => router.back()}
            className="w-full text-gray-600 py-2 hover:text-gray-800"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PaymentPage() {
  return (
    <PaymentProvider>
      <PaymentPageContent />
    </PaymentProvider>
  );
}
