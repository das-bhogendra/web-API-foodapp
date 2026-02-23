"use client";
import React from "react";
import { OrderResponseDto } from "@/app/dtos/order.dto";
import OrderCard from "./OrderCard";

interface Props {
  orders: OrderResponseDto[];
  onStatusUpdate?: (orderId: string, newStatus: string) => void;
}

const OrderList: React.FC<Props> = ({ orders, onStatusUpdate }) => {
  return (
    <div>
      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      ) : (
        orders.map(order => (
          <OrderCard key={order.id} order={order} onStatusUpdate={onStatusUpdate} />
        ))
      )}
    </div>
  );
};

export default OrderList;
