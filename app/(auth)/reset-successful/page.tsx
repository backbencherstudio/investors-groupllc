"use client";

import { Button } from "@/components/ui/button";
import LoginLogo from "../_components/login-logo";
import { useRouter } from "next/navigation";
import SuccessIcon from "@/public/icons/success";

export default function ResetSuccessful() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/"); // Navigate to login page
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      {/* LEFT CONTENT */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-8 md:p-56">
        {/* Checkmark Icon */}
        <div className="mb-6">
          <SuccessIcon />
        </div>

        {/* Title */}
        <h2 className="text-[28px] font-semibold text-center mb-2">
          Successful
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 mb-8 text-sm max-w-xs">
          Congratulations! Your password has been successfully updated. Click Continue to log in.
        </p>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full max-w-sm py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
        >
          Continue
        </Button>
      </div>

      {/* RIGHT CONTENT (Keep unchanged) */}
      <div className="flex-1 bg-[#191D20F5] flex flex-col items-center justify-center min-h-[250px] md:min-h-screen w-full">
        <LoginLogo />
      </div>
    </div>
  );
}
