import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
      { protocol: "https", hostname: "sgc.tbrweb.com.br", pathname: "/**" },
      ...(process.env.SGC_IMAGE_HOSTS || "")
        .split(",")
        .map((host) => host.trim())
        .filter(Boolean)
        .map((hostname) => ({
          protocol: "https" as const,
          hostname,
          pathname: "/**",
        })),
    ],
  },
};
export default nextConfig;
