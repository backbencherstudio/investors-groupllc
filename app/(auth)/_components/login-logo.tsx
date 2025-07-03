import Image from "next/image";
import React from "react";
import logo from "@/public/image/472cfc6e4c15a222412de54c421c313620f8e36b.png";
import image from "@/public/image/Rectangle 34625619.png";

export default function LoginLogo() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[250px] md:min-h-screen w-full relative overflow-hidden">
      {/* Background image with opacity */}
      <Image
        src={image}
        alt="Background"
        fill
        className=""
      />
      {/* Logo overlay */}
      <div className="mb-6 z-10">
        <Image
          src={logo}
          alt="Description of image"
          width={175}
          height={355}
          quality={75}
          priority={true}
          className="mx-auto w-32 h-32 md:w-[175px] md:h-[355px] object-contain"
        />
      </div>
    </div>
  );
}
