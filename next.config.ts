import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "tough-starling-553.convex.cloud",
      },
      {
        hostname: "disciplined-sandpiper-196.convex.cloud",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
