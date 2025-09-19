"use client"
import { Mail, Phone, ShoppingCart, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import SideCart from "./CartContext"
import { CartItem } from "@/types/type"
import { FREE_SHIPPING_THRESHOLD } from "@/data/data"
import Image from "next/image"
import LanguageToggle from "./LanguageToggle"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // État pour le scroll (seulement pour savoir si on a scrollé)
  const [isScrolled, setIsScrolled] = useState(false)

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

  // Gestion du scroll (simplifié - pas de masquage)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
    }

    // Throttle pour optimiser les performances
    let timeoutId: NodeJS.Timeout
    const throttledHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 10)
    }

    window.addEventListener("scroll", throttledHandleScroll)
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

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

  return (
    <>
      <header
        className={`
        bg-white shadow-lg transition-all duration-300 ease-in-out z-50
        ${
          isScrolled
            ? "fixed top-0 left-0 right-0 shadow-xl"
            : "relative shadow-lg"
        }
      `}
      >
        {/* Top Bar - Se masque au scroll */}
        <div
          className={`
          bg-firstColor text-white transition-all duration-300 ease-in-out overflow-hidden
          ${isScrolled ? "max-h-0 py-0" : "max-h-20 py-2"}
        `}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center">
                  <Phone size={14} className="mr-1" />
                  <span className="hidden xs:inline">+212 670366581</span>
                  <span className="xs:hidden">+212 670366581</span>
                </div>
                <div className="hidden sm:flex items-center">
                  <Mail size={14} className="mr-1" />
                  <span>Denon_taha@hotmail.fr</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-center text-xs sm:text-sm">
                  Livraison gratuite à partir de {FREE_SHIPPING_THRESHOLD} DH
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header - Plus compact au scroll */}
        <div
          className={`
          container mx-auto px-4 transition-all duration-300 ease-in-out
          ${isScrolled ? "py-2" : "py-4"}
        `}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div
                className={`
             text-white rounded-lg mr-3 transition-all duration-300 ease-in-out
                ${isScrolled ? "p-1.5" : "p-2"}
              `}
              >
                <Image
                  src="/logo.png"
                  alt="logo"
                  height={40}
                  width={40}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="hidden sm:block">
                <h1
                  className={`
                  font-bold font-lux text-gray-800 transition-all duration-300 ease-in-out
                  ${isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}
                `}
                >
                  STRASS SHOP
                </h1>
                <p
                  className={`
                  text-gray-400 transition-all duration-300 ease-in-out
                  ${
                    isScrolled
                      ? "text-xs opacity-75"
                      : "text-xs sm:text-sm opacity-100"
                  }
                `}
                >
                  Tout pour vos créations couture
                </p>
              </div>
              <div className="sm:hidden">
                <h1
                  className={`
                  font-bold text-gray-800 transition-all duration-300 ease-in-out
                  ${isScrolled ? "text-base" : "text-lg"}
                `}
                >
                  STRASS SHOP
                </h1>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Language Selector */}
              <div className="relative">
                {/* <button
                  onClick={toggleLanguage}
                  className="flex items-center text-gray-700 hover:text-firstColor px-2 py-1 rounded-lg border border-gray-300 hover:border-firstColor transition-colors duration-200"
                >
                  <Globe size={18} className="mr-1" />
                  <span className="text-sm font-medium">
                    {currentLanguage.toUpperCase()}
                  </span>
                </button> */}
                <LanguageToggle />
              </div>

              {/* Shopping Cart */}
              <button
                onClick={toggleCart}
                className="flex items-center text-gray-700 hover:text-firstColor relative transition-colors duration-200"
              >
                <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
                <span className="hidden sm:inline ml-1">Panier</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-firstColor text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-gray-700 hover:text-firstColor"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Reste visible */}
        <nav className="bg-firstColor text-white transition-all duration-300 ease-in-out">
          <div className="container mx-auto px-4">
            {/* Desktop Navigation */}
            <ul
              className={`
              hidden lg:flex lg:justify-center items-center space-x-6 xl:space-x-8 transition-all duration-300 ease-in-out
              ${isScrolled ? "py-2" : "py-3"}
            `}
            >
              <li>
                <Link
                  href="/"
                  className="hover:text-secondColor transition-colors duration-200 font-medium"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="shop"
                  className="hover:text-secondColor transition-colors duration-200 font-medium"
                >
                  Boutique
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-secondColor transition-colors duration-200 font-medium"
                >
                  Tissus
                </Link>
              </li>
            </ul>

            {/* Mobile Navigation */}
            <div
              className={`lg:hidden transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <ul className="py-4 space-y-2">
                <li>
                  <Link
                    href="/"
                    className="block py-3 px-4 hover:bg-secondColor rounded transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="shop"
                    className="block py-3 px-4 hover:bg-secondColor rounded transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Boutique
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="block py-3 px-4 hover:bg-secondColor rounded transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tissus
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer pour éviter le saut de contenu quand le header devient fixed */}
      {isScrolled && <div className="h-16 lg:h-20"></div>}

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
