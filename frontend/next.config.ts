import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    NEXT_PUBLIC_CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    NEXT_PUBLIC_UPLOAD_PRESET: process.env.UPLOAD_PRESET,
  },
};

export default nextConfig;
