import Image from "next/image";
import React from "react";
import logo from "@/public/image/472cfc6e4c15a222412de54c421c313620f8e36b.png";
import image from "@/public/image/deea6c9fbbbe6f8c3721233eafe509a675ac5f61.jpg";

export default function LoginLogo() {
  return (
    <div className="flex-1 bg-[#191D20F5] flex flex-col items-center justify-center min-h-[250px] md:min-h-screen w-full relative overflow-hidden">
      {/* Black overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-95 z-0" />
      {/* Background image with opacity */}
      <Image
        src={image}
        alt="Background"
        fill
        style={{ objectFit: "cover", opacity: 0.1 }}
        className="z-0"
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
