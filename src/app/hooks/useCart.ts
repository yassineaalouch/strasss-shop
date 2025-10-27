// "use client"

// import { CartItem } from "@/types/type"
// import { useState, useEffect } from "react"

// export const useCart = () => {
//   // 📦 Livraison gratuite à partir de 1000 DH
//   const FREE_SHIPPING_THRESHOLD = 1000

//   const [cartItems, setCartItems] = useState<CartItem[]>([])
//   const [isCartOpen, setIsCartOpen] = useState(false)
//   const [coupon, setCoupon] = useState<string | null>(null)

//   // 🧠 Charger le panier au démarrage
//   useEffect(() => {
//     const savedCart = localStorage.getItem("couture-cart")
//     const savedCoupon = localStorage.getItem("couture-coupon")
//     if (savedCart) {
//       try {
//         setCartItems(JSON.parse(savedCart))
//       } catch (error) {
//         console.error("Erreur lors du chargement du panier:", error)
//       }
//     }
//     if (savedCoupon) setCoupon(savedCoupon)
//   }, [])

//   // 💾 Sauvegarder à chaque modification
//   useEffect(() => {
//     localStorage.setItem("couture-cart", JSON.stringify(cartItems))
//     if (coupon) {
//       localStorage.setItem("couture-coupon", coupon)
//     } else {
//       localStorage.removeItem("couture-coupon")
//     }
//   }, [cartItems, coupon])

//   const areCharacteristicsEqual = (
//     a: { name: string; value: string }[],
//     b: { name: string; value: string }[]
//   ): boolean => {
//     if (a.length !== b.length) return false
//     const sortFn = (x: { name: string; value: string }) =>
//       `${x.name}:${x.value}`.toLowerCase()
//     const sortedA = [...a].sort((x, y) => sortFn(x).localeCompare(sortFn(y)))
//     const sortedB = [...b].sort((x, y) => sortFn(x).localeCompare(sortFn(y)))
//     return JSON.stringify(sortedA) === JSON.stringify(sortedB)
//   }

//   // ➕ Ajouter un article (en prenant en compte les caractéristiques)
//   const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
//     setCartItems((currentItems) => {
//       const existingItem = currentItems.find(
//         (cartItem) =>
//           cartItem.id === item.id &&
//           areCharacteristicsEqual(
//             cartItem.characteristic || [],
//             item.characteristic || []
//           )
//       )

//       if (existingItem) {
//         return currentItems.map((cartItem) =>
//           cartItem.id === existingItem.id &&
//           areCharacteristicsEqual(
//             cartItem.characteristic || [],
//             item.characteristic || []
//           )
//             ? { ...cartItem, quantity: cartItem.quantity + quantity }
//             : cartItem
//         )
//       }

//       return [...currentItems, { ...item, quantity }]
//     })
//   }

//   // 🔄 Mettre à jour la quantité d’un article
//   const updateQuantity = (item: CartItem, quantity: number) => {
//     if (quantity <= 0) {
//       removeItem(item)
//       return
//     }

//     setCartItems((currentItems) =>
//       currentItems.map((cartItem) =>
//         cartItem.id === item.id &&
//         areCharacteristicsEqual(
//           cartItem.characteristic || [],
//           item.characteristic || []
//         )
//           ? { ...cartItem, quantity }
//           : cartItem
//       )
//     )
//   }
//   // ❌ Supprimer un article spécifique (avec caractéristiques)
//   const removeItem = (item: CartItem) => {
//     setCartItems((currentItems) =>
//       currentItems.filter(
//         (cartItem) =>
//           !(
//             cartItem.id === item.id &&
//             areCharacteristicsEqual(
//               cartItem.characteristic || [],
//               item.characteristic || []
//             )
//           )
//       )
//     )
//   }

//   // 🧹 Vider le panier
//   const clearCart = () => {
//     setCartItems([])
//     setCoupon(null)
//   }

//   // 🧾 Gérer le coupon
//   const applyCoupon = (code: string) => {
//     setCoupon(code)
//   }

//   const removeCoupon = () => {
//     setCoupon(null)
//   }

//   // 🚪 Gestion ouverture/fermeture du panier
//   const toggleCart = () => setIsCartOpen(!isCartOpen)
//   const openCart = () => setIsCartOpen(true)
//   const closeCart = () => setIsCartOpen(false)

//   // 💰 Calcul du prix en tenant compte des réductions
//   const calculateItemTotal = (item: CartItem): number => {
//     let total = item.price * item.quantity

//     if (item.discount) {
//       // 🟡 Cas 1 : réduction en pourcentage
//       if (item.discount.type === "PERCENTAGE") {
//         const percent = item.discount.value ?? 0
//         total -= (total * percent) / 100
//       }

//       // 🟢 Cas 2 : "Buy A get B free" (ex: buy2get1)
//       else if (item.discount.type === "BUY_X_GET_Y") {
//         const buyQuantity = item.discount.buyQuantity
//         const getQuantity = item.discount.getQuantity
//         if (getQuantity && buyQuantity) {
//           const group = buyQuantity + getQuantity
//           const freeCount = Math.floor(item.quantity / group) * getQuantity
//           const paidCount = item.quantity - freeCount
//           total = paidCount * item.price
//         }
//       }
//     }

//     return total
//   }

//   // 🧮 Calcul du total avant coupon
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + calculateItemTotal(item),
//     0
//   )

//   // 🎟️ Appliquer le coupon global
//   const calculateCouponDiscount = (total: number): number => {
//     if (!coupon) return total

//     // Exemple : coupon = "10%" ou "100DH"
//     if (coupon.endsWith("%")) {
//       const percent = parseFloat(coupon.replace("%", ""))
//       return total - (total * percent) / 100
//     } else if (coupon.toLowerCase().endsWith("dh")) {
//       const value = parseFloat(coupon.replace("dh", ""))
//       return Math.max(0, total - value)
//     }
//     return total
//   }

//   const totalPrice = calculateCouponDiscount(subtotal)

//   // 🚚 Livraison gratuite
//   const remainingForFreeShipping = Math.max(
//     0,
//     FREE_SHIPPING_THRESHOLD - totalPrice
//   )

//   const progressPercentage = Math.min(
//     100,
//     (totalPrice / FREE_SHIPPING_THRESHOLD) * 100
//   )

//   const hasFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD

//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

//   return {
//     // State
//     cartItems,
//     isCartOpen,
//     FREE_SHIPPING_THRESHOLD,
//     coupon,

//     // Actions
//     addItem,
//     updateQuantity,
//     removeItem,
//     clearCart,
//     toggleCart,
//     openCart,
//     closeCart,
//     applyCoupon,
//     removeCoupon,

//     // Computed values
//     totalItems,
//     totalPrice,
//     subtotal,
//     remainingForFreeShipping,
//     progressPercentage,
//     hasFreeShipping
//   }
// }

"use client"

import { CartItem } from "@/types/type"
import { Discount } from "@/types/discount"
import { useState, useEffect } from "react"

export const useCart = () => {
  const FREE_SHIPPING_THRESHOLD = 1000

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [coupon, setCoupon] = useState<string | null>(null)
  const [couponData, setCouponData] = useState<Discount | null>(null)
  const [couponError, setCouponError] = useState<string | null>(null)

  // 🧠 Charger le panier au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem("couture-cart")
    const savedCoupon = localStorage.getItem("couture-coupon")
    const savedCouponData = localStorage.getItem("couture-coupon-data")

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error)
      }
    }
    if (savedCoupon) setCoupon(savedCoupon)
    if (savedCouponData) {
      try {
        setCouponData(JSON.parse(savedCouponData))
      } catch (error) {
        console.error("Erreur lors du chargement des données du coupon:", error)
      }
    }
  }, [])

  // 💾 Sauvegarder à chaque modification
  useEffect(() => {
    localStorage.setItem("couture-cart", JSON.stringify(cartItems))
    if (coupon) {
      localStorage.setItem("couture-coupon", coupon)
    } else {
      localStorage.removeItem("couture-coupon")
    }
    if (couponData) {
      localStorage.setItem("couture-coupon-data", JSON.stringify(couponData))
    } else {
      localStorage.removeItem("couture-coupon-data")
    }
  }, [cartItems, coupon, couponData])

  const areCharacteristicsEqual = (
    a: { name: string; value: string }[],
    b: { name: string; value: string }[]
  ): boolean => {
    if (a.length !== b.length) return false
    const sortFn = (x: { name: string; value: string }) =>
      `${x.name}:${x.value}`.toLowerCase()
    const sortedA = [...a].sort((x, y) => sortFn(x).localeCompare(sortFn(y)))
    const sortedB = [...b].sort((x, y) => sortFn(x).localeCompare(sortFn(y)))
    return JSON.stringify(sortedA) === JSON.stringify(sortedB)
  }

  // ➕ Ajouter un article (en prenant en compte les caractéristiques)
  const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          areCharacteristicsEqual(
            cartItem.characteristic || [],
            item.characteristic || []
          )
      )

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === existingItem.id &&
          areCharacteristicsEqual(
            cartItem.characteristic || [],
            item.characteristic || []
          )
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      }

      return [...currentItems, { ...item, quantity }]
    })
  }

  // 🔄 Mettre à jour la quantité d'un article
  const updateQuantity = (item: CartItem, quantity: number) => {
    if (quantity <= 0) {
      removeItem(item)
      return
    }

    setCartItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.id === item.id &&
        areCharacteristicsEqual(
          cartItem.characteristic || [],
          item.characteristic || []
        )
          ? { ...cartItem, quantity }
          : cartItem
      )
    )
  }

  // ❌ Supprimer un article spécifique (avec caractéristiques)
  const removeItem = (item: CartItem) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (cartItem) =>
          !(
            cartItem.id === item.id &&
            areCharacteristicsEqual(
              cartItem.characteristic || [],
              item.characteristic || []
            )
          )
      )
    )
  }

  // 🧹 Vider le panier
  const clearCart = () => {
    setCartItems([])
    setCoupon(null)
    setCouponData(null)
    setCouponError(null)
  }

  // 🎟️ Appliquer un coupon avec vérification
  const applyCoupon = async (
    code: string
  ): Promise<{ success: boolean; message: string; discount?: Discount }> => {
    try {
      setCouponError(null)

      const response = await fetch(
        `/api/discounts/coupon/${encodeURIComponent(code)}`
      )
      const result = await response.json()

      if (!result.success) {
        setCouponError(result.message)
        return { success: false, message: result.message }
      }

      const discount = result.discount
      console.log("discount data", discount)
      // Vérifier le montant minimum d'achat
      const currentSubtotal = cartItems.reduce(
        (sum, item) => sum + calculateItemTotal(item),
        0
      )

      if (
        discount.minimumPurchase > 0 &&
        currentSubtotal > discount.minimumPurchase
      ) {
        const message = `Montant minimum requis: ${discount.value} MAD`
        setCouponError(message)
        return { success: false, message }
      }

      // Tout est valide, appliquer le coupon
      setCoupon(code)
      setCouponData(discount)
      setCouponError(null)

      return { success: true, message: "Coupon appliqué avec succès", discount }
    } catch (error) {
      console.error("Erreur lors de l'application du coupon:", error)
      const message = "Erreur lors de la vérification du coupon"
      setCouponError(message)
      return { success: false, message }
    }
  }

  const removeCoupon = () => {
    setCoupon(null)
    setCouponData(null)
    setCouponError(null)
  }

  // 💰 Calcul du prix en tenant compte des réductions
  const calculateItemTotal = (item: CartItem): number => {
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

  // 🧮 Calcul du total avant coupon
  const subtotal = cartItems.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  )

  // 🎟️ Appliquer le coupon global avec les nouvelles règles
  const calculateCouponDiscount = (): {
    discountAmount: number
    totalAfterDiscount: number
  } => {
    if (!couponData || !coupon) {
      return { discountAmount: 0, totalAfterDiscount: subtotal }
    }

    let discountAmount = 0

    if (couponData.type === "COUPON") {
      if (couponData.value) {
        // Pourcentage
        if (coupon.toLowerCase().includes("%")) {
          discountAmount = (subtotal * couponData.value) / 100
        }
        // Montant fixe
        else {
          discountAmount = Math.min(subtotal, couponData.value)
        }
      }
    }

    const totalAfterDiscount = Math.max(0, subtotal - discountAmount)

    return { discountAmount, totalAfterDiscount }
  }

  const { discountAmount, totalAfterDiscount } = calculateCouponDiscount()

  // 🚚 Livraison gratuite (basée sur le total après réduction)
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - totalAfterDiscount
  )

  const progressPercentage = Math.min(
    100,
    (totalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100
  )

  const hasFreeShipping = totalAfterDiscount >= FREE_SHIPPING_THRESHOLD

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Calcul des frais de livraison (exemple: 50 MAD si pas de livraison gratuite)
  const shippingCost = hasFreeShipping ? 0 : 50

  // 🚪 Gestion ouverture/fermeture du panier
  const toggleCart = () => setIsCartOpen(!isCartOpen)
  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  return {
    // State
    cartItems,
    isCartOpen,
    FREE_SHIPPING_THRESHOLD,
    coupon,
    couponData,
    couponError,

    // Actions
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    applyCoupon,
    removeCoupon,

    // Computed values
    totalItems,
    totalPrice: totalAfterDiscount,
    subtotal,
    discountAmount,
    shipping: shippingCost,
    remainingForFreeShipping,
    progressPercentage,
    hasFreeShipping
  }
}
