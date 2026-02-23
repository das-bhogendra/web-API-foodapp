// frontend/lib/foodApi.ts
import axios from "./api/axios"; // ✅ use configured instance
import { FoodItem } from "../context/FoodContext";
import { API } from "./api/endpoints";

export const foodApi = {
  getAll: async (): Promise<FoodItem[]> => {
    const res = await axios.get(API.USER.FOOD.GET_ALL);
    return res.data.data;
  },

  getByType: async (type: string): Promise<FoodItem[]> => {
    const res = await axios.get(`${API.USER.FOOD.GET_BY_TYPE}${type}`);
    return res.data.data;
  },

  getBestSellers: async (): Promise<FoodItem[]> => {
    const res = await axios.get(API.USER.FOOD.GET_BEST_SELLERS);
    return res.data.data;
  },

  getDiscounted: async (): Promise<FoodItem[]> => {
    const res = await axios.get(API.USER.FOOD.GET_DISCOUNTED);
    return res.data.data;
  },

  getById: async (id: string): Promise<FoodItem> => {
    const res = await axios.get(`${API.ADMIN.FOOD.GET_BY_ID}${id}`);
    return res.data.data;
  },

  create: async (formData: FormData, token: string): Promise<FoodItem> => {
    const res = await axios.post(API.ADMIN.FOOD.CREATE, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },

  update: async (id: string, formData: FormData, token: string): Promise<FoodItem> => {
    const res = await axios.put(`${API.ADMIN.FOOD.UPDATE}${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },

  delete: async (id: string, token: string): Promise<{ message: string }> => {
    const res = await axios.delete(`${API.ADMIN.FOOD.DELETE}${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};