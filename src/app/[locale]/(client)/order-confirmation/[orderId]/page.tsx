"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft, Package } from "lucide-react"
import axios from "axios"
import { OrderDocument } from "@/types/order"

export default function OrderConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<OrderDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${params.orderId}`)
        if (response.data.success) {
          setOrder(response.data.order)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error("Erreur:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (params.orderId) {
      fetchOrder()
    }
  }, [params.orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Commande introuvable
          </h1>
          <button
            onClick={() => router.push("/")}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
        >
          {/* Icône de succès */}
          <div className="text-center mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Commande confirmée !
            </h1>
            <p className="text-gray-600">
              Merci <span className="font-semibold">{order.customerName}</span>,
              votre commande a été enregistrée.
            </p>
          </div>

          {/* Informations de commande */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="flex items-center mb-4">
              <Package className="text-orange-600 mr-2" size={20} />
              <h2 className="font-bold text-lg">Détails de la commande</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Numéro de commande:</span>
                <span className="font-mono text-xs">{order._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Client:</span>
                <span className="font-semibold">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ville:</span>
                <span className="font-semibold">{order.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Téléphone:</span>
                <span className="font-semibold">{order.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">
                  {new Date(order.orderDate).toLocaleDateString("fr-FR")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Statut:</span>
                <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Articles */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-4">Articles commandés</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{item.image}</div>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Quantité: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-orange-600">
                    {(item.price * item.quantity).toFixed(2)} MAD
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Sous-total:</span>
              <span>{order.subtotal.toFixed(2)} MAD</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Livraison:</span>
              <span>
                {order.shipping === 0
                  ? "Gratuite"
                  : `${order.shipping.toFixed(2)} MAD`}
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-800 border-t pt-2">
              <span>Total:</span>
              <span className="text-orange-600">
                {order.total.toFixed(2)} MAD
              </span>
            </div>
          </div>

          {/* Bouton retour */}
          <button
            onClick={() => router.push("/")}
            className="mt-6 w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span>Retour à l&apos;accueil</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
