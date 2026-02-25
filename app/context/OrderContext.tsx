"use client";
import React, { createContext, useContext, useState } from "react";
import { OrderResponseDto, CreateOrderDto, UpdateOrderDto } from "@/app/dtos/order.dto";
import { orderApi } from "../lib/orderApi"; // your new combined orderApi

interface OrderContextType {
  orders: OrderResponseDto[];
  isLoading: boolean;
  fetchOrders: (userId?: string) => Promise<void>;
  addOrder: (dto: CreateOrderDto) => Promise<void>;
  editOrder: (id: string, dto: UpdateOrderDto) => Promise<void>;
  removeOrder: (id: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch orders (admin: all, user: own)
  const fetchOrders = async (userId?: string) => {
    setIsLoading(true);
    try {
      const data = userId
        ? await orderApi.getAllUserOrders() // user fetches their own
        : await orderApi.getAll(); // admin fetches all
      setOrders(data);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new order (user only)
  const addOrder = async (dto: CreateOrderDto) => {
    const newOrder = await orderApi.create(dto);
    setOrders(prev => [newOrder, ...prev]);
  };

  // Edit order (admin can edit any)
  const editOrder = async (id: string, dto: UpdateOrderDto) => {
    const updatedOrder = await orderApi.update(id, dto);
    setOrders(prev => prev.map(o => (o.id === id ? updatedOrder : o)));
  };

  // Remove order (admin can delete any)
  const removeOrder = async (id: string) => {
    const result = await orderApi.delete(id);
    if (result) setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <OrderContext.Provider
      value={{ orders, isLoading, fetchOrders, addOrder, editOrder, removeOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};