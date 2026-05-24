"use client";

import { Button } from "@/components/ui/button";
import LoginLogo from "./login-logo";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import useAuth from "@/hooks/useAuth";

const getLoginErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && err !== null) {
    const e = err as { data?: { message?: string }; error?: string; message?: string };
    return e.data?.message ?? e.error ?? e.message ?? "Invalid email or password";
  }
  return "Invalid email or password";
};

export default function Login() {
  const [email, setEmail] = useState("anik.wdev@gmail.co");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
    } catch (err) {
      setError(getLoginErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-100 ">
      <div className="flex-1 rounded-lg py-8 px-4 sm:px-8 md:px-16 lg:px-56  md:w-[54.3%] ">
        <h2 className="text-[32px] font-semibold text-center">
          Access Your Dashboard
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Enter your information to access your Admin panel
        </p>

        <form onSubmit={handleLogin} className="mx-auto max-w-[600px]">
          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me Checkbox and Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[#d80] hover:text-[7d80]"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Login Button */}
          <Button
            disabled={isLoading}
            className="w-full py-3 bg-[#d80] text-white font-semibold rounded-md hover:bg-[#d70] cursor-pointer disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
      {/* Logo and background image placeholder */}
      <div className="flex-1 bg-[#191D20F5] md:flex flex-col items-center justify-center min-h-[250px] md:min-h-screen hidden md:w-[46.7%]">
        <LoginLogo />
      </div>

      <div className="md:hidden flex items-center justify-center rounded-2xl overflow-hidden mt-4 w-60">
        <LoginLogo  />
      </div>
    </div>
  );
}
