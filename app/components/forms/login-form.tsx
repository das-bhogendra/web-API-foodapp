'use client';

import Button from "../ui/button";
import Input from "../ui/input";
import Link from "next/link";
import { useLoginForm } from "../../features/auth/hooks/use-login-form";

export default function LoginForm() {
  const { register, handleSubmit, errors, isSubmitting } = useLoginForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 max-w-md mx-auto"
    >
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

      <Button disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <Link
        href="/auth/register"
        className="text-blue-600 underline block text-center"
      >
        Register
      </Link>
    </form>
  );
}
