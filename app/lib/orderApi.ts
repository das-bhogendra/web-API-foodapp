// lib/orderApi.ts
import { OrderResponseDto, CreateOrderDto, UpdateOrderDto } from "@/app/dtos/order.dto";

const BASE_URL = "http://localhost:5005/api/orders"; // replace with your backend URL

// ================= GET ORDERS =================
export const getOrders = async (userId?: string): Promise<OrderResponseDto[]> => {
  const url = userId ? `${BASE_URL}?userId=${userId}` : BASE_URL;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data.data as OrderResponseDto[];
};

// ================= GET ORDER BY ID =================
export const getOrderById = async (id: string): Promise<OrderResponseDto> => {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  const data = await res.json();
  return data.data as OrderResponseDto;
};

// ================= CREATE ORDER =================
export const createOrder = async (dto: CreateOrderDto): Promise<OrderResponseDto> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  return data.data as OrderResponseDto;
};

// ================= UPDATE ORDER =================
export const updateOrder = async (id: string, dto: UpdateOrderDto): Promise<OrderResponseDto> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  return data.data as OrderResponseDto;
};

// ================= DELETE ORDER =================
export const deleteOrder = async (id: string): Promise<boolean> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  const data = await res.json();
  return data.success as boolean;
};