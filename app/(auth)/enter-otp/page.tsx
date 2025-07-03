"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import LoginLogo from "../_components/login-logo";
import { useRouter } from "next/navigation";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ForgotPassword() {
  const { handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
    router.push("/reset-your-password");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 gap-6">
      <div className="flex-1 w-full rounded-lg py-8 px-4 xl:px-56">
        <h2 className="text-[32px] font-semibold text-center mb-2">
          Enter OTP
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Please enter your OTP code
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            <InputOTPGroup className="flex justify-between items-center gap-2 lg:gap-10 mb-6 w-full">
              <InputOTPSlot
                index={0}
                className="w-[44px] h-[44px] md:w-[90px] md:h-[56px] border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              />
              <InputOTPSlot
                index={1}
                className="w-[44px] h-[44px] md:w-[90px] md:h-[56px] border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              />
              <InputOTPSlot
                index={2}
                className="w-[44px] h-[44px] md:w-[90px] md:h-[56px] border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              />
              <InputOTPSlot
                index={3}
                className="w-[44px] h-[44px] md:w-[90px] md:h-[56px] border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              />
              <InputOTPSlot
                index={4}
                className="w-[44px] h-[44px] md:w-[90px] md:h-[56px] border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              />
              <InputOTPSlot
                index={5}
                className="w-[44px] h-[44px] md:w-[90px] md:h-[56px] border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D80]"
              />
            </InputOTPGroup>
          </InputOTP>
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
      <div className="flex-1 bg-[#191D20F5] flex flex-col items-center justify-center w-full">
        <LoginLogo />
      </div>
    </div>
  );
}
