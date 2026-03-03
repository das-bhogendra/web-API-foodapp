import { API } from "./api/endpoints";
import axios from "./api/axios";

export interface PaymentMethod {
  id: string;
  type: "card" | "esewa" | "imepay" | "connectips" | "cod";
  last4?: string;
  expiryDate?: string;
  isDefault?: boolean;
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  paymentMethod: string;
  paymentDetails?: PaymentDetails;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  transactionId?: string;
  orderId?: string;
}

export const paymentApi = {
  processPayment: async (request: PaymentRequest): Promise<PaymentResponse> => {
    const res = await axios.post("/api/payments/process", request, { withCredentials: true });
    return res.data;
  },

  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const res = await axios.get("/api/payments/methods", { withCredentials: true });
    return res.data.data;
  },

  savePaymentMethod: async (method: Omit<PaymentMethod, "id">): Promise<PaymentMethod> => {
    const res = await axios.post("/api/payments/methods", method, { withCredentials: true });
    return res.data.data;
  },

  deletePaymentMethod: async (id: string): Promise<boolean> => {
    const res = await axios.delete(`/api/payments/methods/${id}`, { withCredentials: true });
    return res.data.success;
  },
};
