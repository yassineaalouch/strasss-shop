"use client"
import React, { useState } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { useCartContext } from "@/app/context/CartContext"
import {
  X,
  ShoppingCart,
  Star,
  Check,
  Sparkles,
  Package,
  Heart,
  TrendingUp,
  Clock,
  Eye,
  Zap,
  Shield
} from "lucide-react"
import { ProductCardProps } from "@/types/type"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = "grid"
}) => {
  const locale = useLocale() as "fr" | "ar"
  const { addItem } = useCartContext()
  const t = useTranslations("ProductCard")
  const [showModal, setShowModal] = useState(false)
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  )
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    if (product.Characteristic && product.Characteristic.length > 0) {
      setShowModal(true)
    } else {
      addItem({
        id: product._id,
        name: locale === "ar" ? product.name.ar : product.name.fr,
        price: product.price,
        image: product.images?.[0] ?? "/No_Image_Available.jpg"
      })

      // Animation de succès
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const handleSelectValue = (charId: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [charId]: value }))
  }

  const handleConfirm = () => {
    if (
      product.Characteristic?.some(
        (char) =>
          !selectedValues[
            "name" in char.name ? char.name.name[locale] : String(char.name)
          ]
      )
    ) {
      alert(
        locale === "fr"
          ? "selectionner pour chaque properiete une valeur"
          : "اختر قيمة لكل خاصية"
      )
      return
    }

    const formattedCharacteristics = Object.entries(selectedValues).map(
      ([name, value]) => ({
        name,
        value
      })
    )

    addItem({
      id: product._id,
      name: locale === "ar" ? product.name.ar : product.name.fr,
      price: product.price,
      image: product.images?.[0] ?? "/No_Image_Available.jpg",
      characteristic: formattedCharacteristics
    })

    setShowModal(false)
    setSelectedValues({})
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleCancel = () => {
    setShowModal(false)
    setSelectedValues({})
  }

  // ========= MODE LISTE =========
  if (viewMode === "list") {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ x: 5 }}
          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Container pour mode liste */}
            <div className="relative w-full lg:w-72 h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 flex-shrink-0">
              {/* Bouton Favoris */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-3 right-3 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
              >
                <motion.div
                  animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    size={20}
                    className={`transition-colors duration-200 ${
                      isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </motion.div>
              </motion.button>

              {/* Badges pour mode liste */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <AnimatePresence>
                  {product.isNewProduct && (
                    <motion.span
                      key={`new-badge-list-${product._id}`}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg flex items-center gap-1"
                    >
                      <Sparkles size={12} />
                      {t("badges.new")}
                    </motion.span>
                  )}
                  {product.isOnSale && (
                    <motion.span
                      key={`sale-badge-list-${product._id}`}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg flex items-center gap-1"
                    >
                      <Zap size={12} />
                      {t("badges.sale")}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Image avec effet parallax */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Link href={`/shop/${product._id}`}>
                  <Image
                    src={product.images?.[0] ?? "/No_Image_Available.jpg"}
                    alt={locale === "ar" ? product.name.ar : product.name.fr}
                    fill
                    sizes="(max-width: 1024px) 100vw, 300px"
                    className="object-cover"
                    onLoad={() => setImageLoading(false)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            </div>

            {/* Content Container pour mode liste */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  {/* Titre */}
                  <h3 className="font-bold text-xl lg:text-2xl text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                    {locale === "ar" ? product.name.ar : product.name.fr}
                  </h3>

                  {/* Rating et stats */}
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-600 ml-1">
                        (4.5)
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
                      >
                        <Eye size={16} />
                        <span>234 vues</span>
                      </motion.span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>Il y a 2h</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Prix section (desktop) */}
                <div className="hidden lg:flex flex-col items-end">
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through mb-1">
                      {product.originalPrice} DH
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      key={`price-list-${product._id}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
                    >
                      {product.price}
                    </motion.span>
                    <span className="text-lg font-bold text-gray-600">DH</span>
                  </div>
                  {product.isOnSale && product.originalPrice && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 mt-2 bg-green-50 px-2 py-1 rounded-full"
                    >
                      <TrendingUp size={14} className="text-green-600" />
                      <span className="text-xs text-green-700 font-bold">
                        Économisez{" "}
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        %
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-2 lg:line-clamp-3 leading-relaxed text-sm lg:text-base">
                {locale === "ar"
                  ? product.description?.ar
                  : product.description?.fr}
              </p>

              {/* Features/Tags */}
              <div className="flex flex-wrap gap-2 mb-auto pb-4">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-orange-200"
                >
                  <Zap size={14} />
                  Livraison Express
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-200"
                >
                  <Shield size={14} />
                  Garantie 2 ans
                </motion.span>
                {product.inStock ? (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-200"
                  >
                    <Package size={14} />
                    En stock
                  </motion.span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-red-200">
                    <X size={14} />
                    Rupture de stock
                  </span>
                )}
              </div>

              {/* Bottom Action Bar */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mt-auto pt-4 border-t border-gray-100">
                {/* Prix mobile */}
                <div className="flex lg:hidden items-center justify-between">
                  <div>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {product.originalPrice} DH
                      </span>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-orange-600">
                        {product.price}
                      </span>
                      <span className="text-sm font-bold text-gray-600">
                        DH
                      </span>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3 w-full lg:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group/btn"
                  >
                    <Eye
                      size={20}
                      className="text-gray-600 group-hover/btn:text-orange-600"
                    />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: product.inStock ? 1.02 : 1 }}
                    whileTap={{ scale: product.inStock ? 0.98 : 1 }}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 lg:flex-initial px-8 py-3 rounded-xl font-bold transition-all duration-300 min-w-[180px] ${
                      product.inStock
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart ? (
                        <motion.div
                          key={`success-list-${product._id}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Check size={20} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`add-list-${product._id}`}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={20} />
                          <span>{t("buttons.addToCart")}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modal pour mode liste */}
        {renderModal()}
      </>
    )
  }

  // ========= MODE GRILLE (par défaut) =========
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 relative"
      >
        {/* Image Container pour mode grille */}
        <Link href={`/shop/${product._id}`}>
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
            {/* Bouton Favoris */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
            >
              <motion.div
                animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  size={20}
                  className={`transition-colors duration-200 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </motion.div>
            </motion.button>

            {/* Image avec effet de chargement */}
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: imageLoading ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="relative h-full w-full"
            >
              <Image
                src={product.images?.[0] ?? "/No_Image_Available.jpg"}
                alt={locale === "ar" ? product.name.ar : product.name.fr}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onLoad={() => setImageLoading(false)}
              />
            </motion.div>

            {/* Badges avec animations */}
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
              <AnimatePresence>
                {product.isNewProduct && (
                  <motion.span
                    key={`new-badge-grid-${product._id}`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 text-xs font-semibold rounded-full shadow-lg flex items-center gap-1"
                  >
                    <Sparkles size={12} />
                    {t("badges.new")}
                  </motion.span>
                )}
                {product.isOnSale && (
                  <motion.span
                    key={`sale-badge-grid-${product._id}`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 text-xs font-semibold rounded-full shadow-lg animate-pulse"
                  >
                    {t("badges.sale")}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Overlay gradient au survol */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Content Container pour mode grille */}
        <div className="p-5">
          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.0)</span>
          </div>

          {/* Titre du produit */}
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
            {locale === "ar" ? product.name.ar : product.name.fr}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
            {locale === "ar"
              ? product.description?.ar
              : product.description?.fr}
          </p>

          {/* Prix avec animation */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <motion.span
                key={`price-grid-${product._id}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
              >
                {product.price}
              </motion.span>
              <span className="text-sm font-semibold text-gray-600">DH</span>
            </div>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice} DH
              </span>
            )}
          </div>

          {/* Bouton Add to Cart avec animation */}
          <motion.button
            whileHover={{ scale: product.inStock ? 1.02 : 1 }}
            whileTap={{ scale: product.inStock ? 0.98 : 1 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`relative w-full py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
              product.inStock
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <AnimatePresence mode="wait">
              {addedToCart ? (
                <motion.div
                  key={`success-grid-${product._id}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key={`add-grid-${product._id}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  {product.inStock ? (
                    <>
                      <ShoppingCart size={18} />
                      <span>{t("buttons.addToCart")}</span>
                    </>
                  ) : (
                    <>
                      <Package size={18} />
                      <span>{t("buttons.unavailable")}</span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Modal pour mode grille */}
      {renderModal()}
    </>
  )

  // Fonction pour rendre le modal (partagé entre les deux modes)
  function renderModal() {
    return (
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            />

            {/* Modal */}
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-0 flex items-center justify-center z-[10000] p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancel}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  <h2 className="text-xl font-bold pr-10">
                    {locale === "fr"
                      ? "Personnalisez votre choix"
                      : "قم بتخصيص اختيارك"}
                  </h2>
                  <p className="text-orange-100 text-sm mt-1">
                    {locale === "fr"
                      ? "Sélectionnez vos préférences"
                      : "حدد تفضيلاتك"}{" "}
                  </p>
                </div>

                {/* Modal Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  <div className="space-y-6">
                    {product.Characteristic?.map((char, index) => (
                      <motion.div
                        key={`char-${char._id || index}-${product._id}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4"
                      >
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <div className="w-1 h-4 bg-orange-500 rounded-full" />
                          {"name" in char.name
                            ? char.name.name[locale]
                            : String(char.name)}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {char.values.map((val, i) => {
                            const label = val[locale]
                            const charName =
                              "name" in char.name
                                ? char.name.name[locale]
                                : String(char.name)
                            const isSelected =
                              selectedValues[charName] === label

                            return (
                              <motion.button
                                key={`value-${i}-${char._id || index}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  handleSelectValue(charName, label)
                                }
                                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                  isSelected
                                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
                                }`}
                              >
                                {label}
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                                  >
                                    <Check size={12} className="text-white" />
                                  </motion.div>
                                )}
                              </motion.button>
                            )
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t bg-gray-50 p-6">
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancel}
                      className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                    >
                      {locale === "fr" ? "Annuler" : "إلغاء"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirm}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 shadow-lg transition-all duration-200"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <ShoppingCart size={18} />
                        {locale === "fr" ? "confermer" : "تأكيد "}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }
}

export default ProductCard
