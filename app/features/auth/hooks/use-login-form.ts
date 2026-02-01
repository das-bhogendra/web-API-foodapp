'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, LoginFormData } from "../schema/login.schema";
import { handleLogin } from "@/app/lib/actions/auth-action";
import { useAuth } from "@/app/context/AuthContext";

export function useLoginForm() {
  const { checkAuth } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
  try {
    const response = await handleLogin(data); // API call
    await checkAuth(); // Update auth state

    // Redirect based on role
    if (response?.data?.role === 'admin') {
      router.replace("/admin/dashboard"); // ✅ correct
    } else if (response?.data?.role === 'user') {
      router.replace("/user/dashboard"); // ✅ correct if user dashboard exists
    } else {
      router.replace("/"); // fallback if role is unknown
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};


  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
