/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "nblrfiijzirubccgrdxs.supabase.co",
      },
      {
        protocol: "https",
        hostname: "api.saefulrohman.dev",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
