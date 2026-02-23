"use client";
import React from "react";
import { OrderResponseDto } from "@/app/dtos/order.dto";

interface Props {
  order: OrderResponseDto;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  return (
    <div className="border rounded p-4 shadow-md mb-4">
      <h3 className="font-semibold">Order #{order.id}</h3>
      <p>Status: <span className="font-bold">{order.status}</span></p>
      <p>Total: ${order.totalAmount}</p>
      {order.notes && <p>Notes: {order.notes}</p>}
      <div className="mt-2">
        {order.foodItems.map(food => (
          <div key={food._id} className="flex justify-between">
            <span>{food.name} x {food.quantity}</span>
            <span>${food.price * food.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;