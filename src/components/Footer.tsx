import { Mail, MapPin, Phone } from "lucide-react"
import { getTranslations, getLocale } from "next-intl/server"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import axios from "axios"
import { headers } from "next/headers"

async function getSiteInfo() {
  try {
    const headersList = await headers()
    const host = headersList.get("host")
    const protocol = headersList.get("x-forwarded-proto") || "http"
    const baseUrl = `${protocol}://${host}`
    
    const response = await axios.get(`${baseUrl}/api/site-info`)
    if (response.data.success) {
      return response.data.siteInfo
    }
  } catch (error) {
    // Erreur silencieuse - retourner null
  }
  return null
}

async function checkPacks() {
  try {
    const headersList = await headers()
    const host = headersList.get("host")
    const protocol = headersList.get("x-forwarded-proto") || "http"
    const baseUrl = `${protocol}://${host}`
    
    const response = await axios.get(`${baseUrl}/api/product-packs`)
    return response.data.success && response.data.data && response.data.data.length > 0
  } catch (error) {
    // Erreur silencieuse - par défaut, pas de packs
  }
  return false
}

async function getParentCategories() {
  try {
    const headersList = await headers()
    const host = headersList.get("host")
    const protocol = headersList.get("x-forwarded-proto") || "http"
    const baseUrl = `${protocol}://${host}`
    
    const response = await axios.get(`${baseUrl}/api/categories`)
    if (response.data.success && response.data.categories) {
      // Filtrer uniquement les catégories parentes (sans parentId) et actives
      const parentCategories = response.data.categories.filter(
        (cat: { parentId?: string | null; isActive?: boolean }) =>
          !cat.parentId && cat.isActive !== false
      )
      // Trier par ordre
      return parentCategories.sort(
        (a: { order?: number }, b: { order?: number }) =>
          (a.order || 0) - (b.order || 0)
      )
    }
  } catch (error) {
    // Erreur silencieuse - retourner un tableau vide
  }
  return []
}

export default async function Footer() {
  const t = await getTranslations("Footer")
  const locale = await getLocale()
  const siteInfo = await getSiteInfo()
  const hasPacks = await checkPacks()
  const parentCategories = await getParentCategories()

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
              <span className="text-xl font-bold font-lux"><span className="text-amber-600">Strass</span> Shop</span>
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
              {hasPacks && (
                <li>
                  <Link href="/packs" className="hover:text-white">
                    {t("quickLinks.packages")}
                  </Link>
                </li>
              )}
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
            {parentCategories.length > 0 ? (
              <ul className="space-y-2 text-gray-400">
                {parentCategories.map((category: {
                  _id: string
                  name: { fr: string; ar: string }
                  slug?: string
                }) => (
                  <li key={category._id}>
                    <Link
                      href={`/shop${`?category=${category.name[locale as "fr" | "ar"]}`}`}
                      className="hover:text-white"
                    >
                      {category.name[locale as "fr" | "ar"]}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
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
            )}
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
