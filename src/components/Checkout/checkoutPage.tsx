// "use client"
// import { useState } from "react"
// import { motion } from "framer-motion"
// import { useTranslations } from "next-intl"
// import CheckoutForm from "@/components/Checkout/CheckoutForm"
// import CartSummary from "@/components/Checkout/CartSummary"
// import { ShoppingBag } from "lucide-react"
// import { CartItem, CheckoutFormData } from "@/types/type"

// export default function CheckoutPage() {
//   const t = useTranslations("CheckoutPage")

//   // Données d'exemple du panier avec traductions
//   const initialCartItems: CartItem[] = [
//     {
//       id: "1",
//       name: t("products.professionalScissors"),
//       price: 29.99,
//       quantity: 1,
//       image: "✂️",
//       category: t("categories.tools")
//     },
//     {
//       id: "2",
//       name: t("products.coloredThreadSpools"),
//       price: 24.5,
//       quantity: 2,
//       image: "🧵",
//       category: t("categories.threads")
//     },
//     {
//       id: "3",
//       name: t("products.coloredPins"),
//       price: 8.9,
//       quantity: 1,
//       image: "📍",
//       category: t("categories.pins")
//     },
//     {
//       id: "4",
//       name: t("products.flexibleTape"),
//       price: 12.3,
//       quantity: 1,
//       image: "📏",
//       category: t("categories.measurement")
//     }
//   ]

//   const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
//   const [isProcessing, setIsProcessing] = useState<boolean>(false)

//   // Calculs du panier
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   )
//   const shipping = subtotal >= 75 ? 0 : 6.9
//   const total = subtotal + shipping

//   // Gestion des quantités
//   const updateQuantity = (id: string, newQuantity: number): void => {
//     if (newQuantity <= 0) {
//       setCartItems((prev) => prev.filter((item) => item.id !== id))
//     } else {
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.id === id ? { ...item, quantity: newQuantity } : item
//         )
//       )
//     }
//   }

//   const removeItem = (id: string): void => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id))
//   }

//   const handleCheckout = async (formData: CheckoutFormData): Promise<void> => {
//     setIsProcessing(true)

//     try {
//       // Simulation de traitement
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       console.log("Commande confirmée:", { formData, cartItems, total })

//       // Message de succès traduit avec interpolation
//       const successMessage = t("checkout.success", {
//         customerName: formData.customerName,
//         total: total.toFixed(2),
//         city: formData.city
//       })
//       alert(successMessage)
//     } catch (error) {
//       console.error("Erreur lors du traitement:", error)
//       alert(t("checkout.error"))
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="container mx-auto px-4 py-6">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex items-center justify-center"
//           >
//             <div className="flex items-center space-x-3">
//               <div className="bg-orange-100 p-3 rounded-full">
//                 <ShoppingBag className="text-orange-600" size={24} />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">
//                   {t("header.title")}
//                 </h1>
//                 <p className="text-gray-600">{t("header.subtitle")}</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-2 md:px-4 py-8">
//         <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
//           {/* Formulaire de commande */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="order-2 lg:order-1"
//           >
//             <CheckoutForm
//               onSubmit={handleCheckout}
//               isProcessing={isProcessing}
//               total={total}
//             />
//           </motion.div>

//           {/* Résumé du panier */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="order-1 lg:order-2"
//           >
//             <CartSummary
//               items={cartItems}
//               updateQuantity={updateQuantity}
//               removeItem={removeItem}
//               subtotal={subtotal}
//               shipping={shipping}
//               total={total}
//             />
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   )
// }
"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import axios from "axios"
import CheckoutForm from "@/components/Checkout/CheckoutForm"
import CartSummary from "@/components/Checkout/CartSummary"
import { ShoppingBag, CheckCircle, XCircle } from "lucide-react"
import { CartItem, CheckoutFormData } from "@/types/type"

export default function CheckoutPage() {
  const t = useTranslations("CheckoutPage")
  const router = useRouter()

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
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [orderId, setOrderId] = useState<string>("")

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
    setErrorMessage("")

    try {
      // Vérifier qu'il y a des articles dans le panier
      if (cartItems.length === 0) {
        setErrorMessage(t("checkout.emptyCart") || "Le panier est vide")
        setShowErrorModal(true)
        return
      }

      // Préparer les données de la commande
      const orderData = {
        customerName: formData.customerName,
        city: formData.city,
        phoneNumber: formData.phoneNumber,
        items: cartItems,
        subtotal,
        shipping,
        total
      }

      // Envoyer la commande à l'API
      const response = await axios.post("/api/orders", orderData, {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 10000 // Timeout de 10 secondes
      })

      if (response.data.success) {
        // Succès - enregistrer l'ID de la commande
        setOrderId(response.data.orderId)
        setShowSuccessModal(true)

        // Vider le panier après succès
        setTimeout(() => {
          setCartItems([])
        }, 1000)

        // Redirection après 3 secondes
        setTimeout(() => {
          router.push(`/order-confirmation/${response.data.orderId}`)
        }, 3000)
      } else {
        throw new Error(response.data.message || "Erreur inconnue")
      }
    } catch (error: unknown) {
      console.error("Erreur lors de la soumission:", error)

      let message = t("checkout.error") || "Erreur lors de l'enregistrement"

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          message = error.response.data.message
        } else if (error.response?.data?.errors) {
          message = error.response.data.errors.join(", ")
        } else if (error.code === "ECONNABORTED") {
          message = "La requête a expiré. Veuillez réessayer."
        } else if (!error.response) {
          message = "Erreur de connexion. Vérifiez votre connexion internet."
        }
      }

      setErrorMessage(message)
      setShowErrorModal(true)
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
      <main className="container mx-auto px-2 md:px-4 py-8">
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

      {/* Modal de succès */}
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSuccessModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t("checkout.successTitle") || "Commande confirmée !"}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("checkout.successMessage") ||
                  "Votre commande a été enregistrée avec succès."}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">N° de commande:</span>
                </p>
                <p className="text-xs text-gray-500 break-all mt-1">
                  {orderId}
                </p>
              </div>
              <p className="text-sm text-gray-500">Redirection en cours...</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Modal d'erreur */}
      {showErrorModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowErrorModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="text-red-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t("checkout.errorTitle") || "Erreur"}
              </h2>
              <p className="text-gray-600 mb-6">{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors w-full"
              >
                {t("checkout.retry") || "Réessayer"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
