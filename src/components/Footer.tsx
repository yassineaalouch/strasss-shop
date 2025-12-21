import { Mail, MapPin, Phone } from "lucide-react"
import { getTranslations, getLocale } from "next-intl/server"
import Image from "next/image"
import { Link } from "@/i18n/navigation"

async function getSiteInfo() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/site-info`, {
      cache: "no-store"
    })
    if (response.ok) {
      const data = await response.json()
      return data.success ? data.siteInfo : null
    }
  } catch (error) {
    // Erreur silencieuse - retourner null
  }
  return null
}

export default async function Footer() {
  const t = await getTranslations("Footer")
  const locale = await getLocale()
  const siteInfo = await getSiteInfo()

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="text-white p-2 rounded-lg mr-3">
                <Image
                  src="/logo.png"
                  alt="logo"
                  height={40}
                  width={40}
                  className="object-cover rounded-lg"
                />
              </div>
              <span className="text-xl font-bold font-lux">STRASS SHOP</span>
            </div> 
            <p className="text-gray-400 mb-4">{t("company.description")}</p>
            <div className="flex items-center mb-2">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">
                {siteInfo?.location?.[locale as "fr" | "ar"] || t("company.location")}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <Phone size={16} className="mr-2" />
              <span className="text-sm">
                {siteInfo?.phone || t("company.phone")}
              </span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span className="text-sm">
                {siteInfo?.email || t("company.email")}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("quickLinks.title")}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  {t("quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  {t("quickLinks.products")}
                </Link>
              </li>
              <li>
                <Link href="/packs" className="hover:text-white">
                  {t("quickLinks.packages")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {t("quickLinks.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("categories.title")}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/shop" className="hover:text-white">
                  {t("categories.threads")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  {t("categories.needles")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  {t("categories.scissors")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  {t("categories.machines")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("customerService.title")}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  {t("customerService.salesConditions")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  {t("customerService.deliveryPolicy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  {t("customerService.returnsExchanges")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {t("customerService.faq")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">{t("copyright")}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">
              {t("features.securePayment")}
            </span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">
              {t("features.fastDelivery")}
            </span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">
              {t("features.customerSupport")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
