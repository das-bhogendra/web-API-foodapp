"use client";
import React from "react";
import { OrderResponseDto } from "@/app/dtos/order.dto";

interface Props {
  order: OrderResponseDto;
  onStatusUpdate?: (orderId: string, newStatus: string) => void;
}

const OrderCard: React.FC<Props> = ({ order, onStatusUpdate }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onStatusUpdate) {
      onStatusUpdate(order.id, e.target.value);
    }
  };

  return (
    <div className="border rounded-xl p-4 mb-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="font-semibold text-lg">Order #{order.id}</div>
        <div className="text-sm text-gray-500">
          {new Date(order.createdAt || Date.now()).toLocaleDateString()}
        </div>
      </div>

      <div className="mb-2">
        <span className="font-medium">Status: </span>
        {onStatusUpdate ? (
          <select
            value={order.status}
            onChange={handleStatusChange}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        ) : (
          <span className={`px-2 py-1 rounded text-sm ${
            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {order.status}
          </span>
        )}
      </div>

      <div className="mb-2">
        <span className="font-medium">Total: </span>
        <span className="text-lg font-bold text-green-600">${order.totalAmount}</span>
      </div>

      {order.notes && (
        <div className="mb-2">
          <span className="font-medium">Notes: </span>
          <span className="text-gray-600">{order.notes}</span>
        </div>
      )}

      {order.foodItems && order.foodItems.length > 0 && (
        <div>
          <span className="font-medium">Items:</span>
          <ul className="list-disc list-inside ml-4">
            {order.foodItems.map((item, index: number) => (
              <li key={index} className="text-sm">
                {item.name} x{item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
