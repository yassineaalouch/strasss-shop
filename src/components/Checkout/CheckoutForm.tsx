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
    city: "",
    phoneNumber: ""
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

    // Validation ville
    if (!formData.city.trim()) {
      newErrors.city = t("validation.city.required")
    } else if (formData.city.trim().length < 2) {
      newErrors.city = t("validation.city.minLength")
    }

    // Validation numéro de téléphone
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t("validation.phoneNumber.required")
    } else if (
      !/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(
        formData.phoneNumber.trim()
      )
    ) {
      newErrors.phoneNumber = t("validation.phoneNumber.invalid")
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
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="bg-orange-100 p-3 rounded-lg mr-4">
          <User className="text-secondColor" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {t("header.title")}
          </h2>
          <p className="text-gray-600">{t("header.subtitle")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-firstColor focus:border-transparent transition-all ${
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
              className="text-red-500 text-sm mt-2 flex items-center"
            >
              <span className="mr-1">⚠️</span>
              {errors.customerName}
            </motion.p>
          )}
        </div>

        {/* Ville */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-2" />
            {t("fields.city.label")}
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-firstColor focus:border-transparent transition-all ${
              errors.city
                ? "border-red-500"
                : "border-gray-300 hover:border-orange-300"
            }`}
            placeholder={t("fields.city.placeholder")}
            disabled={isProcessing}
          />
          {errors.city && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 flex items-center"
            >
              <span className="mr-1">⚠️</span>
              {errors.city}
            </motion.p>
          )}
        </div>

        {/* Numéro de téléphone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="inline w-4 h-4 mr-2" />
            {t("fields.phoneNumber.label")}
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-firstColor focus:border-transparent transition-all ${
              errors.phoneNumber
                ? "border-red-500"
                : "border-gray-300 hover:border-orange-300"
            }`}
            placeholder={t("fields.phoneNumber.placeholder")}
            disabled={isProcessing}
          />
          {errors.phoneNumber && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 flex items-center"
            >
              <span className="mr-1">⚠️</span>
              {errors.phoneNumber}
            </motion.p>
          )}
        </div>

        {/* Informations de livraison */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
            <Truck className="w-5 h-5 mr-2 text-secondColor" />
            {t("delivery.title")}
          </h3>
          <p className="text-gray-600 text-sm">
            {t("delivery.description", {
              city: formData.city || t("delivery.placeholderCity"),
              phoneNumber:
                formData.phoneNumber || t("delivery.placeholderPhone")
            })}
          </p>
        </div>

        {/* Résumé de commande mobile */}
        <div className="lg:hidden bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">
            {t("summary.title")}
          </h3>
          <div className="flex justify-between items-center">
            <span>{t("summary.total")}</span>
            <span className="text-xl font-bold text-secondColor">
              {total.toFixed(2)}€
            </span>
          </div>
        </div>

        {/* Bouton de validation */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.02 }}
          whileTap={{ scale: isProcessing ? 1 : 0.98 }}
          className="w-full bg-firstColor text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{t("button.processing")}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <ShoppingCart size={20} />
              <span>{t("button.confirm", { total: total.toFixed(2) })}</span>
            </div>
          )}
        </motion.button>

        {/* Note de sécurité */}
        <div className="text-center text-sm text-gray-500">
          <p className="flex items-center justify-center">
            <span className="mr-1">🔒</span>
            {t("security.message")}
          </p>
        </div>
      </form>
    </div>
  )
}
