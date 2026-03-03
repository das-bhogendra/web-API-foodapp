// D:\Projects\my-frontend\app\lib\api\admin\user.ts
import axios from "../axios";
import { API } from "../endpoints";

export interface User {
  _id: string;
  fullName?: string;
  username?: string;
  email: string;
  role: string;
  phoneNumber?: string;
  profilePicture?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export const userApi = {
  // GET all users
  getAll: async (): Promise<User[]> => {
    try {
      const res = await axios.get(API.ADMIN.USER.GET_ALL, { withCredentials: true });

      // Flexible array detection (works for data array or data.users)
      if (Array.isArray(res.data.data)) return res.data.data;
      if (res.data.data && Array.isArray(res.data.data.users)) return res.data.data.users;
      if (Array.isArray(res.data.users)) return res.data.users;

      return []; // fallback
    } catch (err: any) {
      console.error("Fetch users failed:", err);
      return [];
    }
  },

  // GET user by ID
  getById: async (id: string): Promise<User | null> => {
    try {
      const res = await axios.get(`${API.ADMIN.USER.GET_BY_ID}${id}`, { withCredentials: true });
      return res.data.data || null;
    } catch (err: any) {
      console.error(`Error fetching user ${id}:`, err);
      return null;
    }
  },

  // CREATE user
  create: async (formData: FormData): Promise<User | null> => {
    try {
      const res = await axios.post(API.ADMIN.USER.CREATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data.data || null;
    } catch (err: any) {
      console.error("Error creating user:", err);
      return null;
    }
  },

  // UPDATE user
  update: async (id: string, formData: FormData): Promise<User | null> => {
    try {
      const res = await axios.put(`${API.ADMIN.USER.UPDATE}${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data.data || null;
    } catch (err: any) {
      console.error(`Error updating user ${id}:`, err);
      return null;
    }
  },

  // DELETE user
  delete: async (id: string): Promise<{ message: string }> => {
    try {
      const res = await axios.delete(`${API.ADMIN.USER.DELETE}${id}`, { withCredentials: true });
      return res.data || { message: "Deleted successfully" };
    } catch (err: any) {
      console.error(`Error deleting user ${id}:`, err);
      return { message: "Delete failed" };
    }
  },
};