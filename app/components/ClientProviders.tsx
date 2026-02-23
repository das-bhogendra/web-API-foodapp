"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import Header from "./Header";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      <div className="pt-16">{children}</div>
    </AuthProvider>
  );
}