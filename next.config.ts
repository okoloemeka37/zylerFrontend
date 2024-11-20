import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ["encrypted-tbn0.gstatic.com","addict-clothes-store.com","via.placeholder.com","png.pngtree.com"], // Add the hostname here
  },
};

// next.config.js
// next.config.js
module.exports = {
  // Existing inertia or other configurations
  images: {
    domains: ["encrypted-tbn0.gstatic.com","addict-clothes-store.com","via.placeholder.com",'png.pngtree.com'], // Add the hostname here
  },
  // Add any other configurations specific to inertia or your setup
};


export default nextConfig;
