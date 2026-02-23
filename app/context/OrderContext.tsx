"use client";
import React, { createContext, useContext, useState } from "react";
import { OrderResponseDto, CreateOrderDto, UpdateOrderDto } from "@/app/dtos/order.dto";
import { getOrders, createOrder, updateOrder, deleteOrder } from "../lib/orderApi";

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

  const fetchOrders = async (userId?: string) => {
    setIsLoading(true);
    try {
      const data = await getOrders(userId);
      setOrders(data);
    } finally {
      setIsLoading(false);
    }
  };

  const addOrder = async (dto: CreateOrderDto) => {
    const newOrder = await createOrder(dto);
    setOrders(prev => [newOrder, ...prev]);
  };

  const editOrder = async (id: string, dto: UpdateOrderDto) => {
    const updatedOrder = await updateOrder(id, dto);
    setOrders(prev => prev.map(o => (o.id === id ? updatedOrder : o)));
  };

  const removeOrder = async (id: string) => {
    const success = await deleteOrder(id);
    if (success) setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, isLoading, fetchOrders, addOrder, editOrder, removeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};