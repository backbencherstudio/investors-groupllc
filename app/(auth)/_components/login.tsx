"use client";

// pages/login.tsx
import { Button } from "@/components/ui/button";
import LoginLogo from "./login-logo";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("1234asdf");

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = { email, password };
    console.log("After login", formData);

    router.push("/dashboard");
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

          {/* Login Button */}
          <Button className="w-full py-3 bg-[#d80] text-white font-semibold rounded-md hover:bg-[#d70] cursor-pointer">
            Login
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
