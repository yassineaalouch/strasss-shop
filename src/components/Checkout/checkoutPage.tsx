"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import CheckoutForm from "@/components/Checkout/CheckoutForm"
import CartSummary from "@/components/Checkout/CartSummary"
import { ShoppingBag } from "lucide-react"
import { CartItem, CheckoutFormData } from "@/types/type"

export default function CheckoutPage() {
  const t = useTranslations("CheckoutPage")

  // Données d'exemple du panier avec traductions
  const initialCartItems: CartItem[] = [
    {
      id: "1",
      name: t("products.professionalScissors"),
      price: 29.99,
      quantity: 1,
      image: "✂️",
      category: t("categories.tools")
    },
    {
      id: "2",
      name: t("products.coloredThreadSpools"),
      price: 24.5,
      quantity: 2,
      image: "🧵",
      category: t("categories.threads")
    },
    {
      id: "3",
      name: t("products.coloredPins"),
      price: 8.9,
      quantity: 1,
      image: "📍",
      category: t("categories.pins")
    },
    {
      id: "4",
      name: t("products.flexibleTape"),
      price: 12.3,
      quantity: 1,
      image: "📏",
      category: t("categories.measurement")
    }
  ]

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  // Calculs du panier
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = subtotal >= 75 ? 0 : 6.9
  const total = subtotal + shipping

  // Gestion des quantités
  const updateQuantity = (id: string, newQuantity: number): void => {
    if (newQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const removeItem = (id: string): void => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCheckout = async (formData: CheckoutFormData): Promise<void> => {
    setIsProcessing(true)

    try {
      // Simulation de traitement
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Commande confirmée:", { formData, cartItems, total })

      // Message de succès traduit avec interpolation
      const successMessage = t("checkout.success", {
        customerName: formData.customerName,
        total: total.toFixed(2),
        city: formData.city
      })
      alert(successMessage)
    } catch (error) {
      console.error("Erreur lors du traitement:", error)
      alert(t("checkout.error"))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <ShoppingBag className="text-orange-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {t("header.title")}
                </h1>
                <p className="text-gray-600">{t("header.subtitle")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Formulaire de commande */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <CheckoutForm
              onSubmit={handleCheckout}
              isProcessing={isProcessing}
              total={total}
            />
          </motion.div>

          {/* Résumé du panier */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <CartSummary
              items={cartItems}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
            />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
