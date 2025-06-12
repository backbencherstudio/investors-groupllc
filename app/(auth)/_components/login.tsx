// pages/login.tsx
import { Button } from "@/components/ui/button";
import LoginLogo from "./login-logo";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      <div className="flex-1 w-full rounded-lg py-8 px-4 sm:px-8 md:px-16 lg:px-56">
        <h2 className="text-[32px] font-semibold text-center">
          Access Your Dashboard
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Enter your information to access your Admin panel
        </p>

        <form>
          {/* Name Field */}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <input
              type="text"
              id="phone"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              id="password"
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
              className="text-sm text-orange-500 hover:text-orange-600"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 cursor-pointer">
            Login
          </Button>
        </form>
      </div>
      {/* Logo and background image placeholder */}
      <div className="flex-1 bg-[#191D20F5] flex flex-col items-center justify-center min-h-[250px] md:min-h-screen w-full">
        <LoginLogo />
      </div>
    </div>
  );
}
