"use server";
import { userApi } from "../../api/admin/user"; // ✅ correct import
import { revalidatePath } from "next/cache";

export const handleCreateUser = async (data: FormData) => {
  try {
    const user = await userApi.create(data); // returns User object directly
    if (user && user._id) {
      revalidatePath("/admin/users"); // refresh page after creation
      return {
        success: true,
        message: "Registration successful",
        data: user,
      };
    }

    return {
      success: false,
      message: "Registration failed",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Registration action failed",
    };
  }
};