'use client';  // ← Add this at the very top

import LoginForm from '../../components/forms/login-form';
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (user?.role === 'admin') {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/user/dashboard");
      }
    }
  }, [loading, isAuthenticated, user, router]);

  return (
    <div className="max-w-md mx-auto p-6">
      <LoginForm />
    </div>
  );
}
