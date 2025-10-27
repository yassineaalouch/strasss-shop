import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin()
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.tissus-price.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "strass-shop.s3.us-east-1.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "www.lerobert.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "img.leboncoin.fr",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "www.coutureenfant.fr",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "static.mapetitemercerie.com",
        pathname: "/**"
      }
    ],
    unoptimized: true,
    formats: ["image/webp"],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
}

export default withNextIntl(nextConfig)
