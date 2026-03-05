'use client';

import Link from "next/link";
import { useLoginForm } from "../../../features/auth/hooks/use-login-form";

export default function LoginForm() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, error } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Login Page
      </h2>

      
      <div>
        <input
          type="text"
          placeholder="Username"
          {...register("email")}
          className="w-full px-4 py-3 rounded-md bg-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full px-4 py-3 rounded-md bg-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm text-center">
          {error}
        </p>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition duration-300"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      {/* Forgot Password */}
      <div className="text-center text-sm text-gray-700">
        <Link href="#" className="hover:underline">
          Forgot Password
        </Link>
      </div>

    </form>
  );
}