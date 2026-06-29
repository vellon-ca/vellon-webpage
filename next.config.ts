import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        // Send the default Vercel domain to the canonical custom domain.
        source: "/:path*",
        has: [{ type: "host", value: "vellon-webpage.vercel.app" }],
        destination: "https://vellon.ca/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
