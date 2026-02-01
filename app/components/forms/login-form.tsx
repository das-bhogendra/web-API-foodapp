'use client';

import Link from "next/link";
import Button from "../ui/button";
import Input from "../ui/input";
import { useLoginForm } from "../../features/auth/hooks/use-login-form";

export default function LoginForm() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-md mx-auto">
      <Input
        placeholder="Email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <Link href="/auth/register" className="block text-center text-blue-600 underline">
        Register
      </Link>
    </form>
  );
}
