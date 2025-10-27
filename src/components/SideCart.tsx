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
import Link from "next/link"
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

  // Calcul du total
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // Calcul du montant restant pour la livraison gratuite
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - totalPrice
  )

  // Pourcentage de progression vers la livraison gratuite
  const progressPercentage = Math.min(
    100,
    (totalPrice / FREE_SHIPPING_THRESHOLD) * 100
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
        className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-white to-gray-50 shadow-2xl z-[110] overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header amélioré avec gradient */}
          <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 shadow-lg">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center justify-between">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full mr-4">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-wide">
                    {t("header.title")}
                  </h2>
                  <p className="text-orange-100 text-sm mt-1">
                    {getItemCountText(items.length)}
                  </p>
                </div>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-3 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <X size={24} />
              </motion.button>
            </div>
          </div>

          {/* Progress Bar amélioré pour livraison gratuite */}
          <AnimatePresence mode="wait">
            {totalPrice < FREE_SHIPPING_THRESHOLD ? (
              <motion.div
                key="progress"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 border-b border-orange-100 shadow-sm"
              >
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="text-gray-700 flex items-center font-medium"
                    >
                      <div className="p-1.5 bg-orange-200 rounded-full mr-2">
                        <Truck size={18} className="text-orange-700" />
                      </div>
                      {t("freeShipping.label")}
                    </motion.span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-orange-600 font-bold text-base"
                    >
                      {remainingForFreeShipping.toFixed(2)} MAD
                    </motion.span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full shadow-sm relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </motion.div>
                  </div>
                  {progressPercentage > 10 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-1 h-5 w-5 bg-orange-500 rounded-full shadow-md"
                      style={{ left: `calc(${progressPercentage}% - 10px)` }}
                    >
                      <div className="w-full h-full bg-white/30 rounded-full animate-ping"></div>
                    </motion.div>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-2 italic">
                  {t("freeShipping.progressText", {
                    amount: remainingForFreeShipping.toFixed(2)
                  })}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="achieved"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 border-b border-green-200 shadow-sm"
              >
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-2 bg-green-200 rounded-full mr-3"
                  >
                    <Sparkles size={24} className="text-green-700" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-bold text-green-800 text-base">
                      {t("freeShipping.achieved")}
                    </p>
                    <p className="text-sm text-green-600 mt-0.5">
                      {t("freeShipping.achievedSubtext")}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cart Items avec animations */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center h-full text-gray-500 p-8"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-6 bg-gray-100 rounded-full mb-6"
                >
                  <Package size={72} className="text-gray-300" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-gray-700">
                  {t("emptyCart.title")}
                </h3>
                <p className="text-sm text-center px-4 text-gray-500 leading-relaxed">
                  {t("emptyCart.subtitle")}
                </p>
              </motion.div>
            ) : (
              <div className="p-5 space-y-4">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex">
                        {/* Product Image avec effet hover */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mr-4 overflow-hidden shadow-sm"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                          />
                        </motion.div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {item.name}
                          </h4>

                          {item.characteristic && (
                            <div className="space-y-1 mb-3">
                              {item.characteristic.map((char, idx) => (
                                <motion.div
                                  key={char.name}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.1 + idx * 0.05 }}
                                  className="inline-flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600 mr-2"
                                >
                                  <span className="font-medium">
                                    {char.name}:
                                  </span>
                                  <span className="ml-1">{char.value}</span>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls améliorés */}
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full shadow-sm">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleQuantityChange(item, -1)}
                                className="p-2 hover:bg-orange-100 rounded-full transition-all duration-200"
                              >
                                <Minus size={18} className="text-gray-600" />
                              </motion.button>
                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={item.quantity}
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  className="px-4 py-1 text-sm font-bold text-gray-800 min-w-[40px] text-center"
                                >
                                  {item.quantity}
                                </motion.span>
                              </AnimatePresence>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleQuantityChange(item, 1)}
                                className="p-2 hover:bg-orange-100 rounded-full transition-all duration-200"
                              >
                                <Plus size={18} className="text-gray-600" />
                              </motion.button>
                            </div>

                            {/* Price and Remove avec animations */}
                            <div className="flex items-center space-x-3">
                              <motion.span
                                key={item.price * item.quantity}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
                              >
                                {(item.price * item.quantity).toFixed(2)} MAD
                              </motion.span>
                              <motion.button
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onRemoveItem(item)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                              >
                                <Trash2 size={18} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer amélioré */}
          <AnimatePresence>
            {items.length > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="border-t-2 border-gray-100 bg-white p-6 shadow-2xl"
              >
                {/* Total avec animation */}
                <div className="flex justify-between items-center mb-5">
                  <span className="text-lg font-semibold text-gray-700">
                    {t("total")}
                  </span>
                  <motion.div
                    key={totalPrice}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex items-baseline"
                  >
                    <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {totalPrice.toFixed(2)}
                    </span>
                    <span className="ml-1 text-lg font-semibold text-gray-600">
                      MAD
                    </span>
                  </motion.div>
                </div>

                {/* Shipping Info avec icône */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center text-xs mb-5 p-3 bg-gray-50 rounded-lg"
                >
                  <Truck size={16} className="mr-2 text-gray-500" />
                  {totalPrice >= FREE_SHIPPING_THRESHOLD ? (
                    <span className="text-green-600 font-semibold">
                      ✨ {t("freeShipping.included")}
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      {t("freeShipping.cost")}
                    </span>
                  )}
                </motion.div>

                {/* Action Buttons avec animations */}
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-center shadow-lg hover:shadow-xl transform transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
                      href="/checkout"
                      onClick={onClose}
                    >
                      <span className="flex items-center justify-center">
                        <ShoppingBag size={20} className="mr-2" />
                        {t("buttons.validateOrder")}
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      className="block w-full bg-white text-orange-600 border-2 border-orange-500 py-4 rounded-xl font-bold text-center hover:bg-orange-50 transform transition-all duration-300 shadow-sm hover:shadow-md"
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
