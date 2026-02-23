"use client";
import React, { useState } from "react";
import { OrderResponseDto } from "@/app/dtos/order.dto";
import { useOrders } from "../../../../context/OrderContext";

interface Props {
  order: OrderResponseDto;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  const { removeOrder } = useOrders();
  const [loading, setLoading] = useState(false);

  const handleCancelOrder = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    setLoading(true);
    try {
      await removeOrder(order.id);
      alert("Order cancelled successfully");
    } catch (error) {
      alert("Failed to cancel order");
    } finally {
      setLoading(false);
    }
  };

  const canCancel = order.status === "pending" || order.status === "confirmed";

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">Order #{order.id}</h3>
        <span className={`px-2 py-1 rounded text-sm ${
          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
          order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {order.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-2">
        Ordered on {new Date(order.createdAt || Date.now()).toLocaleDateString()}
      </p>

      <p className="font-semibold text-lg mb-2">Total: ${order.totalAmount}</p>

      {order.notes && (
        <p className="text-sm text-gray-600 mb-2">Notes: {order.notes}</p>
      )}

      <div className="mb-4">
        <h4 className="font-medium mb-2">Items:</h4>
        <div className="space-y-1">
          {order.foodItems?.map((item, index: number) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {canCancel && (
        <button
          onClick={handleCancelOrder}
          disabled={loading}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Cancelling..." : "Cancel Order"}
        </button>
      )}
    </div>
  );
};

export default OrderCard;