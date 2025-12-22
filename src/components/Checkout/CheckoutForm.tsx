"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { User, MapPin, Phone, ShoppingCart, Truck } from "lucide-react"
import { CheckoutFormProps, CheckoutFormData, FormErrors } from "@/types/type"

export default function CheckoutForm({
  onSubmit,
  isProcessing,
  total
}: CheckoutFormProps) {
  const t = useTranslations("CheckoutForm")

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: "",
    customerAddress: "",
    customerPhone: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validation nom du client
    if (!formData.customerName.trim()) {
      newErrors.customerName = t("validation.customerName.required")
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = t("validation.customerName.minLength")
    }

    // Validation Adresse
    if (!formData.customerAddress.trim()) {
      newErrors.customerAddress = t("validation.customerAddress.required")
    } else if (formData.customerAddress.trim().length < 2) {
      newErrors.customerAddress = t("validation.customerAddress.minLength")
    }

    // Validation numéro de téléphone
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = t("validation.customerPhone.required")
    } else if (
      !/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(
        formData.customerPhone.trim()
      )
    ) {
      newErrors.customerPhone = t("validation.customerPhone.invalid")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof CheckoutFormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-full">
      {/* Header */}
      <div className="flex items-start sm:items-center mb-6">
        <div className="bg-orange-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
          <User className="text-secondColor" size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {t("header.title")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {t("header.subtitle")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Nom du client */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            {t("fields.customerName.label")}
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => handleChange("customerName", e.target.value)}
            className={`w-full px-3 sm:px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-firstColor focus:border-transparent transition-all text-base ${
              errors.customerName
                ? "border-red-500"
                : "border-gray-300 hover:border-orange-300"
            }`}
            placeholder={t("fields.customerName.placeholder")}
            disabled={isProcessing}
          />
          {errors.customerName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 flex items-start"
            >
              <span className="mr-1 flex-shrink-0">⚠️</span>
              <span className="break-words">{errors.customerName}</span>
            </motion.p>
          )}
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-2" />
            {t("fields.customerAddress.label")}
          </label>
          <input
            type="text"
            value={formData.customerAddress}
            onChange={(e) => handleChange("customerAddress", e.target.value)}
            className={`w-full px-3 sm:px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-firstColor focus:border-transparent transition-all text-base ${
              errors.customerAddress
                ? "border-red-500"
                : "border-gray-300 hover:border-orange-300"
            }`}
            placeholder={t("fields.customerAddress.placeholder")}
            disabled={isProcessing}
          />
          {errors.customerAddress && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 flex items-start"
            >
              <span className="mr-1 flex-shrink-0">⚠️</span>
              <span className="break-words">{errors.customerAddress}</span>
            </motion.p>
          )}
        </div>

        {/* Numéro de téléphone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="inline w-4 h-4 mr-2" />
            {t("fields.customerPhone.label")}
          </label>
          <input
            type="tel"
            value={formData.customerPhone}
            onChange={(e) => handleChange("customerPhone", e.target.value)}
            className={`w-full px-3 sm:px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-firstColor focus:border-transparent transition-all text-base ${
              errors.customerPhone
                ? "border-red-500"
                : "border-gray-300 hover:border-orange-300"
            }`}
            placeholder={t("fields.customerPhone.placeholder")}
            disabled={isProcessing}
          />
          {errors.customerPhone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 flex items-start"
            >
              <span className="mr-1 flex-shrink-0">⚠️</span>
              <span className="break-words">{errors.customerPhone}</span>
            </motion.p>
          )}
        </div>

        {/* Informations de livraison */}
        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-200">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
            <Truck className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-secondColor flex-shrink-0" />
            <span className="text-sm sm:text-base">{t("delivery.title")}</span>
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {t("delivery.description", {
              customerAddress:
                formData.customerAddress || t("delivery.placeholderCity"),
              customerPhone:
                formData.customerPhone || t("delivery.placeholderPhone")
            })}
          </p>
        </div>

        {/* Résumé de commande mobile */}
        <div className="lg:hidden bg-gray-50 p-3 sm:p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
            {t("summary.title")}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base">{t("summary.total")}</span>
            <span className="text-lg sm:text-xl font-bold text-secondColor">
              {total.toFixed(2)}MAD
            </span>
          </div>
        </div>

        {/* Bouton de validation */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.02 }}
          whileTap={{ scale: isProcessing ? 1 : 0.98 }}
          className="w-full bg-firstColor text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{t("button.processing")}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
              <span className="truncate">
                {t("button.confirm", { total: total.toFixed(2) })}
              </span>
            </div>
          )}
        </motion.button>

        {/* Note de sécurité */}
        <div className="text-center text-xs sm:text-sm text-gray-500">
          <p className="flex items-center justify-center">
            <span className="mr-1">🔒</span>
            <span>{t("security.message")}</span>
          </p>
        </div>
      </form>
    </div>
  )
}
