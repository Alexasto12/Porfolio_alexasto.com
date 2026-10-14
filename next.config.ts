import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    /** One 404 for every locale (there is a root layout per locale): app/global-not-found.tsx. */
    globalNotFound: true,
  },
  async redirects() {
    // Spanish lives at the root; /es is a common guess.
    return [
      { source: "/es", destination: "/", permanent: true },
      { source: "/es/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
