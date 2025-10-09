"use client"
import {
  Mail,
  Phone,
  ShoppingCart,
  Menu,
  X,
  Home,
  Store,
  Scissors,
  Facebook,
  Instagram,
  Youtube
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useTranslations } from "next-intl"
import SideCart from "./CartContext"
import { CartItem } from "@/types/type"
import { FREE_SHIPPING_THRESHOLD } from "@/data/data"
import Image from "next/image"
import LanguageToggle from "./LanguageToggle"

const Header: React.FC = () => {
  const t = useTranslations("Header")

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const socialMediaLinks = [
    {
      url: "https://facebook.com",
      icon: Facebook,
      className: "text-blue-600 hover:text-blue-800",
      name: "Facebook"
    },
    {
      url: "https://instagram.com",
      icon: Instagram,
      className: "text-pink-500 hover:text-pink-700",
      name: "Instagram"
    },
    {
      url: "https://youtube.com",
      icon: Youtube,
      className: "text-red-600 hover:text-red-800",
      name: "YouTube"
    }
  ]
  // État du panier
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Fil à coudre polyester - Lot de 10 bobines",
      price: 45.0,
      quantity: 2,
      category: "Tissus",
      image:
        "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg",
      color: "Multicolore"
    },
    {
      id: "2",
      name: "Ciseaux de couture professionnels 25cm",
      price: 120.0,
      quantity: 1,
      category: "Boutons et Fermetures",
      image:
        "https://static.mapetitemercerie.com/99298-large_default/kit-de-11-fils-a-coudre-guetermann-accessoires.jpg"
    },
    {
      id: "3",
      name: "Épingles à tête colorée - 100 pièces",
      price: 25.0,
      quantity: 3,
      category: "Fils et Aiguilles",
      image:
        "https://static.mapetitemercerie.com/48913-large_default/machine-a-coudre-smarter-260c-pfaff.jpg",
      size: "Standard"
    }
  ])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
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
      label: t("navigation.fabrics"),
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
                  <span>{t("contact.phone")}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={12} className="mr-1" />
                  <span>{t("contact.email")}</span>
                </div>
              </div>
              <div>
                <span>
                  {t("freeShipping", { threshold: FREE_SHIPPING_THRESHOLD })}
                </span>
              </div>
              s{" "}
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
                  className="w-full h-full object-cover rounded-lg animate-bounce"
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
                  href="/shop"
                  className="hover:text-secondColor transition-colors duration-200 font-medium text-sm"
                >
                  {t("navigation.fabrics")}
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
              <span>{t("contact.phone")}</span>
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <Mail size={18} className="mr-2" />
              <span>{t("contact.email")}</span>
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
