import type { NextConfig } from "next";

const nextConfig: NextConfig = {  transpilePackages: ["@uploadthing/react"],
   images: {
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io" }, // UploadThing CDN
    ],
  },
  /* config options here */
};

export default nextConfig;
