"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import LoginLogo from "../_components/login-logo";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
    router.push("/enter-otp");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      <div className="flex-1 w-full rounded-lg py-8 px-4 sm:px-8 md:px-16 lg:px-56">
        <h2 className="text-[32px] font-semibold text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Enter your email or phone number to get OTP
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <input
              type="text"
              {...register("identifier", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              placeholder="qwer@gmail.com"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 cursor-pointer"
          >
            Submit
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
