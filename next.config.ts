import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://randomuser.me/"),
    ],
    domains: ["randomuser.me", "images.unsplash.com", "maps.googleapis.com"],
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
