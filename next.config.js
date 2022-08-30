/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "links.papareact.com",
      "ichef.bbci.co.uk",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
