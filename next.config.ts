import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR / dev-only WebSockets when opening the site by LAN IP (not just localhost).
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
  allowedDevOrigins: ["192.168.7.56"],
  images: {
    remotePatterns: [new URL("https://randomuser.me/"), new URL("https://gueloprboy.anikstudio.com/")],
    domains: [
      "randomuser.me",
      "images.unsplash.com",
      "maps.googleapis.com",
      "gueloprboy.anikstudio.com"
    ],
    //     remotePatterns: [
    //       {
    //         protocol: 'http',
    //         hostname: 'localhost',
    //         port: '5000',
    //         pathname: '/uploads/',
    //        },
    //     ],
  },
};

export default nextConfig;
