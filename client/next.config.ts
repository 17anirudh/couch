import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [process.env.NEXT_ALLOWED_IP_ADDRESS!],
};

export default nextConfig;