"use client"
import {
  Mail,
  Phone,
  ShoppingCart,
  Menu,
  X,
  Home,
  Store,
  Scissors
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import SideCart from "./SideCart"
import { FREE_SHIPPING_THRESHOLD } from "@/data/data"
import Image from "next/image"
import LanguageToggle from "./LanguageToggle"
import { useCartContext } from "@/app/context/CartContext"
import { useToast } from "@/components/ui/Toast"

interface SiteInfo {
  email: string
  phone: string
  location: {
    fr: string
    ar: string
  }
}

const Header: React.FC = () => {
  const t = useTranslations("Header")
  const locale = useLocale()
  const { cartItems, updateQuantity, removeItem } = useCartContext()
  const { showToast } = useToast()
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    fetchSiteInfo()
  }, [])

  const fetchSiteInfo = async () => {
    try {
      const response = await fetch("/api/site-info")
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des informations")
      }
      const data = await response.json()
      if (data.success) {
        setSiteInfo(data.siteInfo)
      } else {
        showToast(data.message || "Erreur lors du chargement des informations", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement des informations du site", "error")
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  // Calcul du nombre total d'articles
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const menuItems = [
    { href: "/", label: t("navigation.home"), icon: Home, delay: "delay-100" },
    {
      href: "/shop",
      label: t("navigation.shop"),
      icon: Store,
      delay: "delay-200"
    },
    {
      href: "/shop",
      label: t("navigation.shop"),
      icon: Scissors,
      delay: "delay-300"
    },
    {
      href: "/packs",
      label: t("navigation.packages"),
      icon: Scissors,
      delay: "delay-300"
    },
    {
      href: "/contact",
      label: t("navigation.contact"),
      icon: Scissors,
      delay: "delay-300"
    }
  ]
  return (
    <>
      {/* Header fixe compact */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        {/* Top Bar - Plus compact */}
        <div className="bg-firstColor text-white py-1 hidden sm:block">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Phone size={12} className="mr-1" />
                  <span>{siteInfo?.phone || t("contact.phone")}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={12} className="mr-1" />
                  <span>{siteInfo?.email || t("contact.email")}</span>
                </div>
              </div>
              <div>
                <span>
                  {t("freeShipping", { threshold: FREE_SHIPPING_THRESHOLD })}
                </span>
              </div>{" "}
            </div>
          </div>
        </div>

        {/* Main Header - Plus compact */}
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo compact */}
            <div className="flex items-center">
              <div className="text-white rounded-lg mr-2 p-1">
                <Image
                  src="/logo.png"
                  alt="logo"
                  height={32}
                  width={32}
                  className="object-cover rounded-lg animate-bounce"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold font-lux text-gray-800">
                  STRASS SHOP
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">
                  {t("tagline")}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <div className="relative hidden sm:block">
                <LanguageToggle />
              </div>

              {/* Shopping Cart */}
              <button
                onClick={toggleCart}
                className="flex items-center text-gray-700 hover:text-firstColor relative transition-colors duration-200"
                aria-label={t("cart")}
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline ml-1">{t("cart")}</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-firstColor text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-gray-700 hover:text-firstColor relative z-50 transition-all duration-300"
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                <div
                  className={`transform transition-all duration-300 ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Desktop - Plus compact */}
        <div className="bg-firstColor text-white py-2 hidden lg:block">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center items-center space-x-8">
              <li>
                <Link
                  href="/"
                  className="hover:text-secondColor transition-colors duration-200 font-medium text-sm"
                >
                  {t("navigation.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-secondColor transition-colors duration-200 font-medium text-sm"
                >
                  {t("navigation.shop")}
                </Link>
              </li>
              <li>
                <Link
                  href="/packs"
                  className="hover:text-secondColor transition-colors duration-200 font-medium text-sm"
                >
                  {t("navigation.packages")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-secondColor transition-colors duration-200 font-medium text-sm"
                >
                  {t("navigation.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Menu Mobile Simple */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Arrière-plan simple */}
        <div
          className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-50"
          onClick={toggleMenu}
        ></div>

        {/* Contenu du menu simple */}
        <div
          className={`relative h-full bg-white flex flex-col justify-center items-center transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu items simple */}
          <nav className="text-center">
            <ul className="space-y-8">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-center space-x-3 text-2xl font-medium text-gray-800 hover:text-firstColor transition-colors duration-200 py-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon size={28} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Informations de contact simples */}
          <div className="mt-16 text-center space-y-4">
            <div className="flex items-center justify-center text-gray-600">
              <Phone size={18} className="mr-2" />
              <span>{siteInfo?.phone || t("contact.phone")}</span>
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <Mail size={18} className="mr-2" />
              <span>{siteInfo?.email || t("contact.email")}</span>
            </div>
          </div>

          {/* Language Toggle simple */}
          <div className="mt-8">
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Spacer plus petit pour compenser le header fixe */}
      <div className="h-20 sm:h-24"></div>

      {/* Side Cart */}
      <SideCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </>
  )
}

export default Header
