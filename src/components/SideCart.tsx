// "use client"

// import React from "react"
// import { X, Plus, Minus, Trash2, ShoppingBag, Truck } from "lucide-react"
// import { useTranslations } from "next-intl"
// import { CartItem, SideCartProps } from "@/types/type"
// import Link from "next/link"
// import Image from "next/image"
// import { FREE_SHIPPING_THRESHOLD } from "@/data/data"

// const SideCart: React.FC<SideCartProps> = ({
//   isOpen,
//   onClose,
//   items,
//   onUpdateQuantity,
//   onRemoveItem
// }) => {
//   const t = useTranslations("SideCart")

//   // Calcul du total
//   const totalPrice = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   )

//   // Calcul du montant restant pour la livraison gratuite
//   const remainingForFreeShipping = Math.max(
//     0,
//     FREE_SHIPPING_THRESHOLD - totalPrice
//   )

//   // Pourcentage de progression vers la livraison gratuite
//   const progressPercentage = Math.min(
//     100,
//     (totalPrice / FREE_SHIPPING_THRESHOLD) * 100
//   )

//   // Fonction pour gérer le pluriel
//   const getItemCountText = (count: number) => {
//     return count > 1
//       ? t("header.itemCountPlural", { count })
//       : t("header.itemCount", { count })
//   }

//   const handleQuantityChange = (item: CartItem, change: number) => {
//     console.log("id", item.id)
//     console.log("item", item)
//     if (item) {
//       const newQuantity = Math.max(0, item.quantity + change)
//       if (newQuantity === 0) {
//         onRemoveItem(item)
//       } else {
//         onUpdateQuantity(item, newQuantity)
//       }
//     }
//   }

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-100 transition-opacity duration-300"
//           onClick={onClose}
//         />
//       )}

//       {/* Side Cart */}
//       <div
//         className={`
//         fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-110
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "translate-x-full"}
//       `}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="bg-firstColor text-white p-4 flex items-center justify-between">
//             <div className="flex items-center">
//               <ShoppingBag size={24} className="mr-3" />
//               <div>
//                 <h2 className="text-lg font-semibold">{t("header.title")}</h2>
//                 <p className="text-orange-100 text-sm">
//                   {getItemCountText(items.length)}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-secondColor rounded-full transition-colors duration-200"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* Progress Bar for Free Shipping */}
//           {totalPrice < FREE_SHIPPING_THRESHOLD && (
//             <div className="bg-orange-50 p-4 border-b">
//               <div className="mb-2">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-700 flex items-center">
//                     <Truck size={16} className="mr-1" />
//                     {t("freeShipping.label")}
//                   </span>
//                   <span className="text-secondColor font-medium">
//                     {t("freeShipping.remaining", {
//                       amount: remainingForFreeShipping
//                     })}
//                   </span>
//                 </div>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-firstColor h-2 rounded-full transition-all duration-500 ease-out"
//                   style={{ width: `${progressPercentage}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-gray-600 mt-1">
//                 {t("freeShipping.progressText", {
//                   amount: remainingForFreeShipping
//                 })}
//               </p>
//             </div>
//           )}

//           {/* Free Shipping Achieved */}
//           {totalPrice >= FREE_SHIPPING_THRESHOLD && (
//             <div className="bg-green-50 p-4 border-b">
//               <div className="flex items-center text-green-700">
//                 <Truck size={20} className="mr-2" />
//                 <div>
//                   <p className="font-medium">{t("freeShipping.achieved")}</p>
//                   <p className="text-sm">{t("freeShipping.achievedSubtext")}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Cart Items */}
//           <div className="flex-1 overflow-y-auto">
//             {items.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                 <ShoppingBag size={64} className="mb-4 text-gray-300" />
//                 <h3 className="text-lg font-medium mb-2">
//                   {t("emptyCart.title")}
//                 </h3>
//                 <p className="text-sm text-center px-4">
//                   {t("emptyCart.subtitle")}
//                 </p>
//               </div>
//             ) : (
//               <div className="p-4 space-y-4">
//                 {items.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
//                   >
//                     {/* Product Image */}
//                     <div className="w-20 h-20 bg-gray-100 rounded-lg mr-4 flex items-center justify-center overflow-hidden">
//                       <Image
//                         src={item.image}
//                         alt={item.name}
//                         width={80}
//                         height={80}
//                         className="object-cover w-full h-full"
//                       />
//                     </div>

//                     {/* Product Details */}
//                     <div className="flex-1">
//                       <h4 className="font-medium text-gray-800 mb-1 line-clamp-2">
//                         {item.name}
//                       </h4>
//                       {item.characteristic &&
//                         item.characteristic.map((char, index) => (
//                           <div
//                             key={index}
//                             className="text-xs text-gray-500 mb-2"
//                           >
//                             <span>
//                               {char.name}:{char.value}
//                             </span>
//                           </div>
//                         ))}

//                       <div className="flex items-center justify-between">
//                         {/* Quantity Controls */}
//                         <div className="flex items-center border border-gray-300 rounded-lg">
//                           <button
//                             onClick={() => handleQuantityChange(item, -1)}
//                             className="p-1 hover:bg-gray-100 transition-colors duration-200"
//                           >
//                             <Minus size={16} />
//                           </button>
//                           <span className="px-3 py-1 text-sm font-medium">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => handleQuantityChange(item, 1)}
//                             className="p-1 hover:bg-gray-100 transition-colors duration-200"
//                           >
//                             <Plus size={16} />
//                           </button>
//                         </div>

//                         {/* Price and Remove */}
//                         <div className="flex items-center space-x-2">
//                           <span className="font-semibold text-secondColor">
//                             {(item.price * item.quantity).toFixed(2)} MAD
//                           </span>
//                           <button
//                             onClick={() => onRemoveItem(item)}
//                             className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           {items.length > 0 && (
//             <div className="border-t bg-white p-4">
//               {/* Total */}
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-lg font-semibold text-gray-800">
//                   {t("total")}
//                 </span>
//                 <span className="text-xl font-bold text-secondColor">
//                   {totalPrice.toFixed(2)} MAD
//                 </span>
//               </div>

//               {/* Shipping Info */}
//               <div className="text-xs text-gray-500 mb-4 text-center">
//                 {totalPrice >= FREE_SHIPPING_THRESHOLD ? (
//                   <span className="text-green-600">
//                     {t("freeShipping.included")}
//                   </span>
//                 ) : (
//                   <span>{t("freeShipping.cost")}</span>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 text-center">
//                 <Link
//                   className="w-full bg-firstColor text-white py-3 rounded-lg font-semibold hover:bg-secondColor transition-colors duration-200"
//                   href="/checkout"
//                   onClick={onClose}
//                 >
//                   {t("buttons.validateOrder")}
//                 </Link>
//                 <Link
//                   className="w-full bg-white text-firstColor border-2 border-firstColor py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200"
//                   href="/shop"
//                   onClick={onClose}
//                 >
//                   {t("buttons.continueShopping")}
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default SideCart

"use client"

import React from "react"
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Truck,
  Sparkles,
  Package
} from "lucide-react"
import { useTranslations } from "next-intl"
import { CartItem, SideCartProps } from "@/types/type"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { FREE_SHIPPING_THRESHOLD } from "@/data/data"
import { motion, AnimatePresence } from "framer-motion"

const SideCart: React.FC<SideCartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const t = useTranslations("SideCart")

  // 💰 Calcul du prix d'un item en tenant compte des réductions
  const calculateItemTotal = (item: CartItem): number => {
    // Pour les packs, utiliser discountPrice si disponible
    if (item.type === "pack" && item.discountPrice) {
      return item.discountPrice * item.quantity
    }

    let total = item.price * item.quantity

    if (item.discount) {
      // 🟡 Cas 1 : réduction en pourcentage
      if (item.discount.type === "PERCENTAGE") {
        const percent = item.discount.value ?? 0
        total -= (total * percent) / 100
      }

      // 🟢 Cas 2 : "Buy A get B free" (ex: buy2get1)
      else if (item.discount.type === "BUY_X_GET_Y") {
        const buyQuantity = item.discount.buyQuantity
        const getQuantity = item.discount.getQuantity
        if (getQuantity && buyQuantity) {
          const group = buyQuantity + getQuantity
          const freeCount = Math.floor(item.quantity / group) * getQuantity
          const paidCount = item.quantity - freeCount
          total = paidCount * item.price
        }
      }
    }

    return total
  }

  // Calcul du sous-total avec réductions
  const subtotal = items.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  )

  // Calcul des frais de livraison
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shippingCost = hasFreeShipping ? 0 : 30

  // Calcul du total final (sous-total + frais de livraison)
  const totalPrice = subtotal + shippingCost

  // Calcul du montant restant pour la livraison gratuite
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  )

  // Pourcentage de progression vers la livraison gratuite
  const progressPercentage = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  )

  // Fonction pour gérer le pluriel
  const getItemCountText = (count: number) => {
    return count > 1
      ? t("header.itemCountPlural", { count })
      : t("header.itemCount", { count })
  }

  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = Math.max(0, item.quantity + change)
    if (newQuantity === 0) {
      onRemoveItem(item)
    } else {
      onUpdateQuantity(item, newQuantity)
    }
  }

  return (
    <>
      {/* Overlay avec animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Side Cart avec animation */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-white to-gray-50 shadow-2xl z-[110] overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header compact */}
          <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 shadow-lg">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center justify-between">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full mr-3">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-wide">
                    {t("header.title")}
                  </h2>
                  <p className="text-orange-100 text-xs mt-0.5">
                    {getItemCountText(items.length)}
                  </p>
                </div>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>

          {/* Progress Bar compact pour livraison gratuite */}
          <AnimatePresence mode="wait">
            {subtotal < FREE_SHIPPING_THRESHOLD ? (
              <motion.div
                key="progress"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-orange-50 to-yellow-50 p-3 border-b border-orange-100 shadow-sm"
              >
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs">
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="text-gray-700 flex items-center font-medium"
                    >
                      <Truck size={14} className="text-orange-600 mr-1" />
                      {t("freeShipping.label")}
                    </motion.span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-orange-600 font-bold text-sm"
                    >
                      {remainingForFreeShipping.toFixed(2)} MAD
                    </motion.span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="achieved"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 border-b border-green-200 shadow-sm"
              >
                <div className="flex items-center">
                  <Sparkles size={16} className="text-green-700 mr-2" />
                  <div className="flex-1">
                    <p className="font-bold text-green-800 text-sm">
                      {t("freeShipping.achieved")}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cart Items - Compact avec séparation produits/packs */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center h-full text-gray-500 p-6"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-4 bg-gray-100 rounded-full mb-4"
                >
                  <Package size={48} className="text-gray-300" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-gray-700">
                  {t("emptyCart.title")}
                </h3>
                <p className="text-xs text-center px-4 text-gray-500">
                  {t("emptyCart.subtitle")}
                </p>
              </motion.div>
            ) : (
              <div className="p-3 space-y-3">
                {/* Section Produits */}
                {items.filter((item) => item.type !== "pack").length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2 px-2">
                      <Package size={14} className="text-blue-600" />
                      <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Produits ({items.filter((item) => item.type !== "pack").length})
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <AnimatePresence>
                        {items
                          .filter((item) => item.type !== "pack")
                          .map((item, index) => (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -50 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              whileHover={{ scale: 1.01 }}
                              className="group bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center gap-2">
                                {/* Product Image compact */}
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                                >
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                  />
                                </motion.div>

                                {/* Product Details compact */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-800 text-xs mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
                                    {item.name}
                                  </h4>

                                  {item.characteristic && item.characteristic.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-1">
                                      {item.characteristic.slice(0, 2).map((char) => (
                                        <span
                                          key={char.name}
                                          className="bg-gray-100 rounded px-1.5 py-0.5 text-[10px] text-gray-600"
                                        >
                                          {char.name}: {char.value}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  <div className="flex items-center justify-between">
                                    {/* Quantity Controls compact */}
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg">
                                      <button
                                        onClick={() => handleQuantityChange(item, -1)}
                                        className="p-1 hover:bg-orange-100 rounded-l-lg transition-colors"
                                      >
                                        <Minus size={12} className="text-gray-600" />
                                      </button>
                                      <span className="px-2 py-0.5 text-xs font-bold text-gray-800 min-w-[28px] text-center">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => handleQuantityChange(item, 1)}
                                        className="p-1 hover:bg-orange-100 rounded-r-lg transition-colors"
                                      >
                                        <Plus size={12} className="text-gray-600" />
                                      </button>
                                    </div>

                                    {/* Price and Remove compact */}
                                    <div className="flex items-center gap-1.5">
                                      <div className="flex flex-col items-end">
                                        {(() => {
                                          const itemTotal = calculateItemTotal(item)
                                          const originalTotal = item.price * item.quantity
                                          const hasDiscount = itemTotal < originalTotal
                                          
                                          return hasDiscount ? (
                                            <>
                                              <span className="font-bold text-xs text-green-600">
                                                {itemTotal.toFixed(2)} MAD
                                              </span>
                                              <span className="text-[10px] text-gray-400 line-through">
                                                {originalTotal.toFixed(2)} MAD
                                              </span>
                                            </>
                                          ) : (
                                            <span className="font-bold text-sm text-orange-600">
                                              {itemTotal.toFixed(2)} MAD
                                            </span>
                                          )
                                        })()}
                                      </div>
                                      <button
                                        onClick={() => onRemoveItem(item)}
                                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* Section Packs */}
                {items.filter((item) => item.type === "pack").length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2 px-2">
                      <Sparkles size={14} className="text-purple-600" />
                      <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Packs ({items.filter((item) => item.type === "pack").length})
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <AnimatePresence>
                        {items
                          .filter((item) => item.type === "pack")
                          .map((item, index) => (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -50 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              whileHover={{ scale: 1.01 }}
                              className="group bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center gap-2">
                                {/* Pack Image compact avec badge */}
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                                >
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                  />
                                  <div className="absolute top-0 right-0 bg-purple-500 text-white text-[8px] px-1 rounded-bl font-bold">
                                    PACK
                                  </div>
                                </motion.div>

                                {/* Pack Details compact */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-800 text-xs mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors">
                                    {item.name}
                                  </h4>

                                  {item.packItems && (
                                    <p className="text-[10px] text-purple-600 mb-1 font-medium">
                                      {item.packItems.length} produit{item.packItems.length > 1 ? "s" : ""} inclus
                                    </p>
                                  )}

                                  <div className="flex items-center justify-between">
                                    {/* Quantity Controls compact */}
                                    <div className="flex items-center bg-white border border-purple-200 rounded-lg">
                                      <button
                                        onClick={() => handleQuantityChange(item, -1)}
                                        className="p-1 hover:bg-purple-100 rounded-l-lg transition-colors"
                                      >
                                        <Minus size={12} className="text-gray-600" />
                                      </button>
                                      <span className="px-2 py-0.5 text-xs font-bold text-gray-800 min-w-[28px] text-center">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => handleQuantityChange(item, 1)}
                                        className="p-1 hover:bg-purple-100 rounded-r-lg transition-colors"
                                      >
                                        <Plus size={12} className="text-gray-600" />
                                      </button>
                                    </div>

                                    {/* Price and Remove compact */}
                                    <div className="flex items-center gap-1.5">
                                      <div className="flex flex-col items-end">
                                        {item.discountPrice ? (
                                          <>
                                            <span className="font-bold text-xs text-green-600">
                                              {(item.discountPrice * item.quantity).toFixed(2)} MAD
                                            </span>
                                            <span className="text-[10px] text-gray-400 line-through">
                                              {(item.price * item.quantity).toFixed(2)} MAD
                                            </span>
                                          </>
                                        ) : (
                                          <span className="font-bold text-sm text-purple-600">
                                            {(item.price * item.quantity).toFixed(2)} MAD
                                          </span>
                                        )}
                                      </div>
                                      <button
                                        onClick={() => onRemoveItem(item)}
                                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer compact */}
          <AnimatePresence>
            {items.length > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="border-t-2 border-gray-100 bg-white p-4 shadow-2xl"
              >
                {/* Total compact */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-base font-semibold text-gray-700">
                    {t("total")}
                  </span>
                  <motion.div
                    key={totalPrice}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex items-baseline"
                  >
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {totalPrice.toFixed(2)}
                    </span>
                    <span className="ml-1 text-sm font-semibold text-gray-600">
                      MAD
                    </span>
                  </motion.div>
                </div>

                {/* Shipping Info compact */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center text-xs mb-3 p-2 bg-gray-50 rounded-lg"
                >
                  <Truck size={12} className="mr-1 text-gray-500" />
                  {hasFreeShipping ? (
                    <span className="text-green-600 font-semibold text-xs">
                      ✨ {t("freeShipping.included")}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-xs">
                      {t("freeShipping.cost")} (+{shippingCost.toFixed(2)} MAD)
                    </span>
                  )}
                </motion.div>

                {/* Action Buttons compact */}
                <div className="space-y-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-bold text-sm text-center shadow-lg hover:shadow-xl transform transition-all duration-300"
                      href="/checkout"
                      onClick={onClose}
                    >
                      <span className="flex items-center justify-center">
                        <ShoppingBag size={16} className="mr-2" />
                        {t("buttons.validateOrder")}
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      className="block w-full bg-white text-orange-600 border-2 border-orange-500 py-3 rounded-lg font-bold text-sm text-center hover:bg-orange-50 transform transition-all duration-300"
                      href="/shop"
                      onClick={onClose}
                    >
                      {t("buttons.continueShopping")}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}

export default SideCart
