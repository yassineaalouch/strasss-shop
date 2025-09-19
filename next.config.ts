import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin()
const nextConfig: NextConfig = {
  images: {
    domains: [
      "www.tissus-price.com",
      "www.lerobert.com",
      "img.leboncoin.fr",
      "www.coutureenfant.fr",
      "static.mapetitemercerie.com"
    ]
  }
}

export default withNextIntl(nextConfig)
