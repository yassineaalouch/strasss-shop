"use client"
import { motion } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingCart, Gift, Phone } from "lucide-react"
import { useTranslations } from "next-intl"
import { CartSummaryProps } from "@/types/type"
import Link from "next/link"
import { FREE_SHIPPING_THRESHOLD } from "@/data/data"

export default function CartSummary({
  items,
  updateQuantity,
  removeItem,
  subtotal,
  shipping,
  total
}: CartSummaryProps) {
  const t = useTranslations("CartSummary")
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Fonction pour gérer le pluriel
  const getItemCountText = (count: number) => {
    return count > 1
      ? t("header.itemCountPlural", { count })
      : t("header.itemCount", { count })
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-orange-100 p-2 rounded-lg mr-3">
            <ShoppingCart className="text-secondColor" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {t("header.title")}
          </h2>
        </div>
        <div className="bg-firstColor text-white px-3 py-1 rounded-full text-sm font-bold">
          {getItemCountText(itemCount)}
        </div>
      </div>

      {/* Articles du panier */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            {/* Image du produit */}
            <div className="w-16 h-16 bg-orange-50 rounded-lg flex items-center justify-center text-2xl">
              {item.image}
            </div>

            {/* Informations produit */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{item.category}</p>
              <p className="font-bold text-secondColor mt-1">
                {item.price.toFixed(2)} MAD
              </p>
            </div>

            {/* Contrôles quantité */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center bg-gray-100 rounded-lg">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                  type="button"
                >
                  <Minus size={14} className="text-gray-600" />
                </button>
                <span className="px-3 py-2 font-semibold text-gray-800 min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                  type="button"
                >
                  <Plus size={14} className="text-gray-600" />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors p-1"
                title={t("actions.removeItem")}
                type="button"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Code promo */}
      <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
        <div className="flex items-center mb-2">
          <Gift className="text-secondColor mr-2" size={16} />
          <h3 className="font-semibold text-gray-800 text-sm">
            {t("promoCode.title")}
          </h3>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder={t("promoCode.placeholder")}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-firstColor focus:border-transparent"
          />
          <button
            className="bg-firstColor text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondColor transition-colors"
            type="button"
          >
            {t("actions.apply")}
          </button>
        </div>
      </div>

      {/* Récapitulatif des prix */}
      <div className="space-y-3 py-4 border-t border-gray-200">
        <div className="flex justify-between text-gray-700">
          <span>{t("pricing.subtotal", { count: itemCount })}</span>
          <span className="font-semibold">{subtotal.toFixed(2)}MAD</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>{t("pricing.shipping")}</span>
          <span className="font-semibold">
            {shipping === 0 ? (
              <span className="text-green-600">{t("pricing.free")}</span>
            ) : (
              `${shipping.toFixed(2)}MAD`
            )}
          </span>
        </div>

        {subtotal >= FREE_SHIPPING_THRESHOLD && (
          <div className="flex items-center justify-center p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-700 text-sm font-semibold">
              {t("shipping.freeShippingAchieved")}
            </span>
          </div>
        )}

        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <div className="flex items-center justify-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-blue-700 text-sm">
              {t("shipping.freeShippingRemaining", {
                amount: (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)
              })}
            </span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-4 border-t-2 border-orange-200">
        <span className="text-xl font-bold text-gray-800">
          {t("pricing.total")}
        </span>
        <span className="text-2xl font-bold text-secondColor">
          {total.toFixed(2)}MAD
        </span>
      </div>

      {/* Aide */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">{t("help.question")}</p>
        <div className="flex justify-center space-x-4">
          <Link
            href={`tel:${t("help.phone")}`}
            className="text-secondColor hover:text-orange-700 text-sm font-semibold flex items-center"
          >
            <Phone size={14} className="mr-1" />
            <span>{t("help.phone")}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
