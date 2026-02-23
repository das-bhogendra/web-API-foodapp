// app/dtos/order.dto.ts

export interface FoodItemInOrder {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderResponseDto {
  id: string;
  userId: string;
  foodItems: FoodItemInOrder[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  userId: string;
  foodItems: { foodId: string; quantity: number }[];
  notes?: string;
}

export interface UpdateOrderDto {
  status?: OrderResponseDto['status'];
  notes?: string;
}