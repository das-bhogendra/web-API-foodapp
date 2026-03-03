'use client';

import LoginForm from '../../components/forms/login-form';
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      if (user.role === 'admin') {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/user/dashboard");
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-b-4"></div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">

      {/* LEFT SIDE - ORANGE SECTION */}
      <div className="hidden md:flex w-1/2 h-full bg-orange-600 items-center justify-center">
        
        {/* Image Wrapper (auto centers ANY image) */}
        <div className="flex items-center justify-center w-full h-full p-10">
          <Image
            src="/assets/images/hero-bg.jpg"
            alt="Food Image"
            width={500}
            height={500}
            className="object-contain max-h-[80%] w-auto"
            priority
          />
        </div>

      </div>

      {/* RIGHT SIDE - LOGIN SECTION */}
      <div className="w-full md:w-1/2 h-full bg-[#d9d3c3] flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>

    </div>
  );
}