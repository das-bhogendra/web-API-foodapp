"use client";
import React, { useState } from "react";
import { OrderResponseDto } from "@/app/dtos/order.dto";
import { useOrders } from "../../../../context/OrderContext";

interface Props {
  order: OrderResponseDto;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  const { removeOrder, editOrder } = useOrders(); // ✅ added updateOrder
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [status, setStatus] = useState<OrderResponseDto["status"]>(order.status);

  const handleCancelOrder = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    setLoadingCancel(true);
    try {
      await removeOrder(order.id);
      alert("Order cancelled successfully");
    } catch (error) {
      alert("Failed to cancel order");
    } finally {
      setLoadingCancel(false);
    }
  };

  const handleStatusChange = async (newStatus: OrderResponseDto["status"]) => {
    setStatus(newStatus); // Optimistic UI update
    setLoadingUpdate(true);
    try {
      await editOrder(order.id, { status: newStatus });
      alert("Order status updated!");
    } catch (error) {
      alert("Failed to update order");
      setStatus(order.status); // revert on failure
    } finally {
      setLoadingUpdate(false);
    }
  };

  const canCancel = status === "pending" || status === "confirmed";

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">Order #{order.id}</h3>
        <span className={`px-2 py-1 rounded text-sm ${
          status === 'delivered' ? 'bg-green-100 text-green-800' :
          status === 'cancelled' ? 'bg-red-100 text-red-800' :
          status === 'preparing' ? 'bg-blue-100 text-blue-800' :
          status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status}
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

      {/* Update order status */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Update Status:</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value as OrderResponseDto["status"])}
          disabled={loadingUpdate || status === "delivered" || status === "cancelled"}
          className="border p-1 rounded w-full md:w-1/2"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {canCancel && (
        <button
          onClick={handleCancelOrder}
          disabled={loadingCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {loadingCancel ? "Cancelling..." : "Cancel Order"}
        </button>
      )}
    </div>
  );
};

export default OrderCard;