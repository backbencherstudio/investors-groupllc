"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import LoginLogo from "../_components/login-logo";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
    router.push("/reset-your-password");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      <div className="flex-1 w-full rounded-lg py-8 px-4 sm:px-8 md:px-16 lg:px-56">
        <h2 className="text-[32px] font-semibold text-center mb-2">
          Enter OTP
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Please enter your OTP code
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-4 mb-6">
            {[0, 1, 2, 3, 4].map((idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                {...register(`otp${idx + 1}`, { required: true })}
                className="w-28 h-16 text-center text-2xl border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              />
            ))}
          </div>
          <Button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 cursor-pointer mb-4"
          >
            Submit
          </Button>
        </form>
        <div className="text-center mt-2 text-sm text-gray-500">
          Haven&apos;t you got the OTP yet?{" "}
          <a
            href="#"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Resend Code
          </a>
        </div>
      </div>
      {/* Logo and background image placeholder */}
      <div className="flex-1 bg-[#191D20F5] flex flex-col items-center justify-center min-h-[250px] md:min-h-screen w-full">
        <LoginLogo />
      </div>
    </div>
  );
}
