/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "http://localhost:3000",
    //   "https://digital-hippo-theta-seven.vercel.app"
    // ],
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;
