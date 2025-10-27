import { Mail, MapPin, Phone } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import Link from "next/link"
export default async function Footer() {
  const t = await getTranslations("Footer")
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
              <span className="text-xl font-bold">{t("company.name")}</span>
            </div>
            <p className="text-gray-400 mb-4">{t("company.description")}</p>
            <div className="flex items-center mb-2">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">{t("company.location")}</span>
            </div>
            <div className="flex items-center mb-2">
              <Phone size={16} className="mr-2" />
              <span className="text-sm">{t("company.phone")}</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span className="text-sm">{t("company.email")}</span>
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
                  {t("quickLinks.shop")}
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
                  {t("categories.rigidFencing")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  {t("categories.flexibleMesh")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  {t("categories.gates")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  {t("categories.accessories")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  {t("categories.completePacks")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
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
