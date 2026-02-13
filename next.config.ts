import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  generateBuildId: async () => {
    // Benzersiz bir ID ureterek cache sorunlarini onle
    return `build-${Date.now()}`;
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
