import { FoodItemInOrder, OrderResponseDto } from "../dtos/order.dto";

interface BackendOrder {
  _id: string;
  userId: { _id: string; email?: string } | string;
  foodItems: { foodId: string; name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}


export const mapOrder = (order: any): OrderResponseDto => ({
  id: order._id,
  userId: typeof order.userId === "string"
    ? { _id: order.userId, email: "" } // fallback if only string is provided
    : { _id: order.userId._id, email: order.userId.email || "" }, // full object

  foodItems: order.foodItems.map((f: any): FoodItemInOrder => ({
    _id: f.foodId,
    name: f.name,
    quantity: f.quantity,
    price: f.price,
  })),

  totalAmount: order.totalAmount,
  status: order.status,
  notes: order.notes || "",
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
});