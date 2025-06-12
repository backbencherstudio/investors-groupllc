"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import LoginLogo from "../_components/login-logo";
import { useRouter } from "next/navigation";

export default function ResetYourPassword() {
  const { register, handleSubmit } = useForm();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
    router.push("/reset-successful");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      <div className="flex-1 w-full rounded-lg py-8 px-4 sm:px-8 md:px-16 lg:px-56">
        <h2 className="text-[32px] font-semibold text-center mb-2">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Please enter your password
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 relative">
            <input
              type={showCurrent ? "text" : "password"}
              {...register("currentPassword", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80] pr-12"
              placeholder="Current password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowCurrent((v) => !v)}
              tabIndex={-1}
            >
              {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="mb-4 relative">
            <input
              type={showNew ? "text" : "password"}
              {...register("newPassword", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80] pr-12"
              placeholder="New password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowNew((v) => !v)}
              tabIndex={-1}
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="mb-8 relative">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80] pr-12"
              placeholder="Confirm password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowConfirm((v) => !v)}
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 cursor-pointer"
          >
            Reset
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
