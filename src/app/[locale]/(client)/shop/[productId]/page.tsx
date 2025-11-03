// "use client"
// import React, { useState, useEffect } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { useLocale } from "next-intl"
// import Image from "next/image"
// import axios from "axios"
// import {
//   Share2,
//   Heart,
//   ShoppingCart,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Link,
//   X
// } from "lucide-react"
// import { Product } from "@/types/product"

// const ProductPage: React.FC = () => {
//   const { productId } = useParams()
//   const router = useRouter()
//   const locale = useLocale() as "fr" | "ar"
//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0)
//   const [quantity, setQuantity] = useState(1)
//   const [isAddingToCart, setIsAddingToCart] = useState(false)
//   const [showShareModal, setShowShareModal] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false)

//   // Charger le produit
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true)
//         const response = await axios.get(`/api/products/${productId}`)

//         if (response.data.success) {
//           const productData = response.data.product
//           setProduct(productData)
//           console.log("productData", productData)
//           // Charger les détails de la catégorie
//           if (productData.category) {
//             // fetchCategory(productData.category)
//             console.log("productData.category", productData.category)
//           }
//         } else {
//           setError("Produit non trouvé")
//         }
//       } catch (err) {
//         console.error("Erreur:", err)
//         setError("Erreur lors du chargement du produit")
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (productId) {
//       fetchProduct()
//     }
//   }, [productId])

//   // Navigation des images
//   const nextImage = () => {
//     if (product && product.images.length > 0) {
//       setSelectedImageIndex((prev) =>
//         prev === product.images.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (product && product.images.length > 0) {
//       setSelectedImageIndex((prev) =>
//         prev === 0 ? product.images.length - 1 : prev - 1
//       )
//     }
//   }

//   // Ajouter au panier
//   const handleAddToCart = async () => {
//     if (!product) return

//     setIsAddingToCart(true)
//     try {
//       // Ici vous intégrerez votre logique d'ajout au panier
//       // Pour l'instant, simulation
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       // Exemple d'appel API
//       // await axios.post("/api/cart", {
//       //   productId: product._id,
//       //   quantity,
//       //   price: product.price
//       // })

//       alert(`${quantity} ${product.name[locale]} ajouté au panier!`)
//     } catch (err) {
//       console.error("Erreur:", err)
//       alert("Erreur lors de l'ajout au panier")
//     } finally {
//       setIsAddingToCart(false)
//     }
//   }

//   // Partager le produit
//   const handleShare = () => {
//     setShowShareModal(true)
//   }

//   const shareOnSocialMedia = (platform: string) => {
//     const productName = product?.name[locale] || "Produit"
//     const productUrl = window.location.href
//     const text = `Découvrez ${productName} sur notre site!`

//     const urls = {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//         productUrl
//       )}`,
//       twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
//         text
//       )}&url=${encodeURIComponent(productUrl)}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//         productUrl
//       )}`
//     }

//     if (urls[platform as keyof typeof urls]) {
//       window.open(
//         urls[platform as keyof typeof urls],
//         "_blank",
//         "width=600,height=400"
//       )
//     }
//   }

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href)
//       alert("Lien copié dans le presse-papier!")
//     } catch (err) {
//       console.error("Erreur:", err)
//     }
//   }

//   // Calcul du pourcentage de réduction
//   const getDiscountPercentage = () => {
//     if (!product?.originalPrice || product.originalPrice <= product.price)
//       return 0
//     return Math.round(
//       ((product.originalPrice - product.price) / product.originalPrice) * 100
//     )
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="animate-spin mx-auto mb-4" size={32} />
//           <p className="text-gray-600">Chargement du produit...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error || !product) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">
//             Produit non trouvé
//           </h1>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => router.push("/")}
//             className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Retour à l&apos;accueil
//           </button>
//         </div>
//       </div>
//     )
//   }

//   const discountPercentage = getDiscountPercentage()

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Modal de partage */}
//       {/* {showShareModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//             <h3 className="text-lg font-semibold mb-4">Partager ce produit</h3>
//             <div className="grid grid-cols-4 gap-4 mb-4">
//               <button
//                 onClick={() => shareOnSocialMedia("facebook")}
//                 className="flex flex-col items-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 <Facebook size={24} />
//                 <span className="text-xs mt-1">Facebook</span>
//               </button>
//               <button
//                 onClick={() => shareOnSocialMedia("twitter")}
//                 className="flex flex-col items-center p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
//               >
//                 <Twitter size={24} />
//                 <span className="text-xs mt-1">Twitter</span>
//               </button>
//               <button
//                 onClick={() => shareOnSocialMedia("linkedin")}
//                 className="flex flex-col items-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 <Linkedin size={24} />
//                 <span className="text-xs mt-1">LinkedIn</span>
//               </button>
//               <button
//                 onClick={copyToClipboard}
//                 className="flex flex-col items-center p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//               >
//                 <LinkIcon size={24} />
//                 <span className="text-xs mt-1">Copier</span>
//               </button>
//             </div>
//             <button
//               onClick={() => setShowShareModal(false)}
//               className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//             >
//               Fermer
//             </button>
//           </div>
//         </div>
//       )} */}
//       {showShareModal && (
//         <div
//           onClick={() => setShowShareModal(false)}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//         >
//           <div className="relative rounded-2xl bg-white p-6 shadow-2xl max-w-md w-full animate-fade-in-up">
//             {/* En-tête de la modale */}
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Partager ce produit
//               </h3>
//               <button
//                 onClick={() => setShowShareModal(false)}
//                 className="rounded-full p-1 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Boutons de partage */}
//             <div className="grid grid-cols-4 gap-4 mb-6">
//               <button
//                 onClick={() => shareOnSocialMedia("facebook")}
//                 className="flex flex-col items-center justify-center p-3 rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600 group"
//               >
//                 <Facebook
//                   size={24}
//                   className="group-hover:scale-110 transition-transform"
//                 />
//                 <span className="text-xs mt-1 font-medium group-hover:text-blue-600">
//                   Facebook
//                 </span>
//               </button>
//               <button
//                 onClick={() => shareOnSocialMedia("twitter")}
//                 className="flex flex-col items-center justify-center p-3 rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-cyan-500 group"
//               >
//                 <Twitter
//                   size={24}
//                   className="group-hover:scale-110 transition-transform"
//                 />
//                 <span className="text-xs mt-1 font-medium group-hover:text-cyan-500">
//                   Twitter
//                 </span>
//               </button>
//               <button
//                 onClick={() => shareOnSocialMedia("linkedin")}
//                 className="flex flex-col items-center justify-center p-3 rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700 group"
//               >
//                 <Linkedin
//                   size={24}
//                   className="group-hover:scale-110 transition-transform"
//                 />
//                 <span className="text-xs mt-1 font-medium group-hover:text-blue-700">
//                   LinkedIn
//                 </span>
//               </button>
//               <button
//                 onClick={copyToClipboard}
//                 className="flex flex-col items-center justify-center p-3 rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800 group"
//               >
//                 <Link
//                   size={24}
//                   className="group-hover:scale-110 transition-transform"
//                 />
//                 <span className="text-xs mt-1 font-medium group-hover:text-gray-800">
//                   Copier
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Galerie d'images */}
//           <div className="space-y-4">
//             {/* Image principale */}
//             <div className="relative aspect-square bg-white rounded-lg overflow-hidden border">
//               {product.images.length > 0 ? (
//                 <>
//                   <Image
//                     src={product.images[selectedImageIndex]}
//                     alt={product.name[locale]}
//                     fill
//                     className="object-cover"
//                     priority
//                   />

//                   {/* Badges */}
//                   <div className="absolute top-4 left-4 flex flex-col space-y-2">
//                     {product.isNewProduct && (
//                       <span className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full">
//                         {locale === "fr" ? "Nouveau" : "جديد"}
//                       </span>
//                     )}
//                     {product.isOnSale && discountPercentage > 0 && (
//                       <span className="bg-red-500 text-white px-3 py-1 text-sm rounded-full">
//                         -{discountPercentage}%
//                       </span>
//                     )}
//                     {!product.inStock && (
//                       <span className="bg-gray-500 text-white px-3 py-1 text-sm rounded-full">
//                         {locale === "fr" ? "Rupture" : "نفذت الكمية"}
//                       </span>
//                     )}
//                   </div>

//                   {/* Navigation des images */}
//                   {product.images.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
//                       >
//                         <ChevronLeft size={24} />
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
//                       >
//                         <ChevronRight size={24} />
//                       </button>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                   <span className="text-gray-500">
//                     {locale === "fr" ? "Aucune image" : "لا توجد صورة"}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Vignettes des images */}
//             {product.images.length > 1 && (
//               <div className="grid grid-cols-4 gap-2">
//                 {product.images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImageIndex(index)}
//                     className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
//                       selectedImageIndex === index
//                         ? "border-blue-500"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <Image
//                       src={image}
//                       alt={`${product.name[locale]} ${index + 1}`}
//                       fill
//                       className="object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Informations du produit */}
//           <div className="space-y-6">
//             {/* En-tête */}
//             <div className="flex justify-between items-start">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                   {product.name[locale]}
//                 </h1>
//                 {product.category && (
//                   <p className="text-gray-500 text-sm">
//                     {locale === "fr" ? "Catégorie: " : "الفئة: "}
//                     {product.category.name[locale]}
//                   </p>
//                 )}
//               </div>

//               {/* Actions */}
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setIsFavorite(!isFavorite)}
//                   className={`p-2 rounded-full border ${
//                     isFavorite
//                       ? "bg-red-50 border-red-200 text-red-500"
//                       : "bg-gray-50 border-gray-200 text-gray-500"
//                   }`}
//                 >
//                   <Heart
//                     size={20}
//                     fill={isFavorite ? "currentColor" : "none"}
//                   />
//                 </button>
//                 <button
//                   onClick={handleShare}
//                   className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100"
//                 >
//                   <Share2 size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* Prix */}
//             <div className="flex items-center space-x-4">
//               <span className="text-3xl font-bold text-orange-600">
//                 {product.price} MAD
//               </span>
//               {product.originalPrice &&
//                 product.originalPrice > product.price && (
//                   <>
//                     <span className="text-xl text-gray-500 line-through">
//                       {product.originalPrice} MAD
//                     </span>
//                     {discountPercentage > 0 && (
//                       <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
//                         -{discountPercentage}%
//                       </span>
//                     )}
//                   </>
//                 )}
//             </div>

//             {/* Description */}
//             <div className="prose max-w-none">
//               <h3 className="text-lg font-semibold mb-2">
//                 {locale === "fr" ? "Description" : "الوصف"}
//               </h3>
//               <p className="text-gray-700 leading-relaxed">
//                 {product.description[locale]}
//               </p>
//             </div>

//             {/* 🧩 Caractéristiques du produit */}
//             {product.Characteristic && product.Characteristic.length > 0 && (
//               <div className="border-t pt-6">
//                 <h3 className="text-lg font-semibold mb-4">
//                   {locale === "fr" ? "Caractéristiques" : "المواصفات"}
//                 </h3>

//                 <div className="space-y-3">
//                   {product.Characteristic.map((char, index) => (
//                     <div
//                       key={index}
//                       className="flex flex-col sm:flex-row sm:items-center"
//                     >
//                       {/* Nom de la caractéristique */}
//                       <span className="font-medium text-gray-700 sm:w-48 mb-1 sm:mb-0">
//                         {
//                           "name" in char.name // `char.name` est de type `ICharacteristic`
//                             ? char.name?.name?.[locale] ?? "Caractéristique"
//                             : "Caractéristique" // `char.name` est de type `ObjectId`
//                         }{" "}
//                       </span>

//                       {/* Valeurs de la caractéristique */}
//                       <div className="flex flex-wrap gap-2">
//                         {char.values.map((value) => (
//                           <span
//                             key={value._id}
//                             className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
//                           >
//                             {value?.[locale] ?? "---"}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quantité et Ajout au panier */}
//             <div className="border-t pt-6 space-y-4">
//               <div className="flex items-center space-x-4">
//                 <span className="font-medium text-gray-700">
//                   {locale === "fr" ? "Quantité" : "الكمية"}
//                 </span>
//                 <div className="flex items-center border border-gray-300 rounded-lg">
//                   <button
//                     onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//                     className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
//                     disabled={quantity <= 1}
//                   >
//                     -
//                   </button>
//                   <span className="px-4 py-2 min-w-12 text-center">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={() => setQuantity((prev) => prev + 1)}
//                     className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
//                     disabled={quantity >= product.quantity}
//                   >
//                     +
//                   </button>
//                 </div>
//                 <span className="text-sm text-gray-500">
//                   {product.quantity} {locale === "fr" ? "disponibles" : "متاح"}
//                 </span>
//               </div>

//               <div className="flex space-x-4">
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={!product.inStock || isAddingToCart}
//                   className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg font-medium ${
//                     product.inStock
//                       ? "bg-orange-500 text-white hover:bg-orange-600"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   {isAddingToCart ? (
//                     <>
//                       <Loader2 className="animate-spin mr-2" size={20} />
//                       {locale === "fr" ? "Ajout..." : "جاري الإضافة..."}
//                     </>
//                   ) : (
//                     <>
//                       <ShoppingCart size={20} className="mr-2" />
//                       {product.inStock
//                         ? locale === "fr"
//                           ? "Ajouter au panier"
//                           : "أضف إلى السلة"
//                         : locale === "fr"
//                         ? "Rupture de stock"
//                         : "نفذت الكمية"}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductPage
"use client"
import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import Image from "next/image"
import axios from "axios"
import {
  Share2,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Facebook,
  Twitter,
  Linkedin,
  Link,
  X
} from "lucide-react"
import { Product } from "@/types/product"
import { RelatedProducts } from "@/components/shop/Relatedproducts"
import { useCartContext } from "@/app/context/CartContext"

const ProductPage: React.FC = () => {
  const { productId } = useParams()
  const router = useRouter()
  const locale = useLocale() as "fr" | "ar"
  const { addItem, cartItems, updateQuantity, removeItem } = useCartContext()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Check if product is in cart and get cart quantity
  const cartItem = product
    ? cartItems.find((item) => item.id === product._id && item.type !== "pack")
    : null
  const cartQuantity = cartItem?.quantity || 0
  const isInCart = cartQuantity > 0

  // Calculate discount percentage
  const discountPercentage =
    product && product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0

  // Charger le produit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/products/${productId}`)

        if (response.data.success) {
          const productData = response.data.product
          setProduct(productData)
          console.log("productData", productData)
          // Charger les détails de la catégorie
          if (productData.category) {
            // fetchCategory(productData.category)
            console.log("productData.category", productData.category)
          }
        } else {
          setError("Produit non trouvé")
        }
      } catch (err) {
        setError("Erreur lors du chargement du produit")
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  // Navigation des images
  const nextImage = () => {
    if (product && product.images.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (product && product.images.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      )
    }
  }

  // Ajouter au panier
  const handleAddToCart = () => {
    if (!product) return

    setIsAddingToCart(true)
    try {
      // Include discount if it exists and is not a COUPON type
      const discount = product.discount && product.discount.type !== "COUPON"
        ? {
            type: product.discount.type as "PERCENTAGE" | "BUY_X_GET_Y",
            value: product.discount.value,
            buyQuantity: product.discount.buyQuantity,
            getQuantity: product.discount.getQuantity
          }
        : null

      // Add product to cart with discount info
      addItem(
        {
          id: product._id,
          name: product.name[locale],
          price: product.price,
          image: product.images?.[0] ?? "/No_Image_Available.jpg",
          type: "product",
          discount: discount
        },
        quantity
      )

      setIsAddingToCart(false)
    } catch (err) {
      setIsAddingToCart(false)
      // Erreur gérée par le contexte du panier
    }
  }

  // Partager le produit
  const handleShare = () => {
    setShowShareModal(true)
  }

  const shareOnSocialMedia = (platform: string) => {
    const productName = product?.name[locale] || "Produit"
    const productUrl = window.location.href
    const text = `Découvrez ${productName} sur notre site!`

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        productUrl
      )}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(productUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        productUrl
      )}`
    }

    if (urls[platform as keyof typeof urls]) {
      window.open(
        urls[platform as keyof typeof urls],
        "_blank",
        "width=600,height=400"
      )
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      // Le succès peut être géré par une notification si nécessaire
    } catch (err) {
      // Erreur silencieuse pour la copie dans le presse-papier
    }
  }

  // Calcul du pourcentage de réduction
  const getDiscountPercentage = () => {
    if (!product?.originalPrice || product.originalPrice <= product.price)
      return 0
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={32} />
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Produit non trouvé
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal de partage */}
      {/* {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Partager ce produit</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <button
                onClick={() => shareOnSocialMedia("facebook")}
                className="flex flex-col items-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Facebook size={24} />
                <span className="text-xs mt-1">Facebook</span>
              </button>
              <button
                onClick={() => shareOnSocialMedia("twitter")}
                className="flex flex-col items-center p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
              >
                <Twitter size={24} />
                <span className="text-xs mt-1">Twitter</span>
              </button>
              <button
                onClick={() => shareOnSocialMedia("linkedin")}
                className="flex flex-col items-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Linkedin size={24} />
                <span className="text-xs mt-1">LinkedIn</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex flex-col items-center p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <LinkIcon size={24} />
                <span className="text-xs mt-1">Copier</span>
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Fermer
            </button>
          </div>
        </div>
      )} */}
      {showShareModal && (
        <div
          onClick={() => setShowShareModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="relative rounded-2xl bg-white p-6 shadow-2xl max-w-md w-full animate-fade-in-up">
            {/* En-tête de la modale */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Partager ce produit
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="rounded-full p-1 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Boutons de partage */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <button
                onClick={() => shareOnSocialMedia("facebook")}
                className="flex flex-col items-center justify-center p-3 rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600 group"
              >
                <Facebook
                  size={24}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-xs mt-1 font-medium group-hover:text-blue-600">
                  Facebook
                </span>
              </button>
              <button
                onClick={() => shareOnSocialMedia("twitter")}
                className="flex flex-col items-center justify-center p-3 rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-cyan-500 group"
              >
                <Twitter
                  size={24}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-xs mt-1 font-medium group-hover:text-cyan-500">
                  Twitter
                </span>
              </button>
              <button
                onClick={() => shareOnSocialMedia("linkedin")}
                className="flex flex-col items-center justify-center p-3 rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700 group"
              >
                <Linkedin
                  size={24}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-xs mt-1 font-medium group-hover:text-blue-700">
                  LinkedIn
                </span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex flex-col items-center justify-center p-3 rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800 group"
              >
                <Link
                  size={24}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-xs mt-1 font-medium group-hover:text-gray-800">
                  Copier
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galerie d'images */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden border">
              {product.images.length > 0 ? (
                <>
                  <Image
                    src={product.images[selectedImageIndex]}
                    alt={product.name[locale]}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isNewProduct && (
                      <span className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full">
                        {locale === "fr" ? "Nouveau" : "جديد"}
                      </span>
                    )}
                    {product.isOnSale && discountPercentage > 0 && (
                      <span className="bg-red-500 text-white px-3 py-1 text-sm rounded-full">
                        -{discountPercentage}%
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="bg-gray-500 text-white px-3 py-1 text-sm rounded-full">
                        {locale === "fr" ? "Rupture" : "نفذت الكمية"}
                      </span>
                    )}
                  </div>

                  {/* Navigation des images */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">
                    {locale === "fr" ? "Aucune image" : "لا توجد صورة"}
                  </span>
                </div>
              )}
            </div>

            {/* Vignettes des images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name[locale]} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations du produit */}
          <div className="space-y-6">
            {/* En-tête */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name[locale]}
                </h1>
                {product.category && (
                  <p className="text-gray-500 text-sm">
                    {locale === "fr" ? "Catégorie: " : "الفئة: "}
                    {product.category.name[locale]}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full border ${
                    isFavorite
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Prix avec réduction bien visible */}
            <div className="space-y-3">
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-gray-400 line-through font-medium">
                    {product.originalPrice} MAD
                  </span>
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                    -{discountPercentage}%
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-orange-600">
                  {product.price}
                </span>
                <span className="text-xl font-bold text-gray-600">MAD</span>
                {product.discount && product.discount.type !== "COUPON" && (
                  <div className="ml-4 flex flex-col">
                    {product.discount.type === "PERCENTAGE" && (
                      <span className="text-sm font-semibold text-green-600">
                        🔥 Réduction {product.discount.value}% appliquée
                      </span>
                    )}
                    {product.discount.type === "BUY_X_GET_Y" && (
                      <span className="text-sm font-semibold text-green-600">
                        🎁 Achetez {product.discount.buyQuantity}, obtenez {product.discount.getQuantity} gratuit
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">
                {locale === "fr" ? "Description" : "الوصف"}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description[locale]}
              </p>
            </div>

            {/* 🧩 Caractéristiques du produit */}
            {product.Characteristic && product.Characteristic.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  {locale === "fr" ? "Caractéristiques" : "المواصفات"}
                </h3>

                <div className="space-y-3">
                  {product.Characteristic.map((char, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center"
                    >
                      {/* Nom de la caractéristique */}
                      <span className="font-medium text-gray-700 sm:w-48 mb-1 sm:mb-0">
                        {
                          "name" in char.name // `char.name` est de type `ICharacteristic`
                            ? char.name?.name?.[locale] ?? "Caractéristique"
                            : "Caractéristique" // `char.name` est de type `ObjectId`
                        }{" "}
                      </span>

                      {/* Valeurs de la caractéristique */}
                      <div className="flex flex-wrap gap-2">
                        {char.values.map((value) => (
                          <span
                            key={value._id}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {value?.[locale] ?? "---"}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantité et Ajout au panier */}
            <div className="border-t pt-6 space-y-4">
              {isInCart ? (
                /* Quantity Controller when in cart */
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">
                      {locale === "fr" ? "Quantité dans le panier" : "الكمية في السلة"}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      ✓ {locale === "fr" ? "Dans le panier" : "في السلة"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-orange-500 rounded-lg bg-orange-50">
                      <button
                        onClick={() => {
                          if (cartQuantity > 1) {
                            updateQuantity(cartItem!, cartQuantity - 1)
                          } else {
                            removeItem(cartItem!)
                          }
                        }}
                        className="px-4 py-3 hover:bg-orange-100 font-bold text-orange-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-6 py-3 min-w-16 text-center font-bold text-lg text-orange-700">
                        {cartQuantity}
                      </span>
                      <button
                        onClick={() => {
                          if (cartQuantity < product.quantity) {
                            updateQuantity(cartItem!, cartQuantity + 1)
                          }
                        }}
                        disabled={cartQuantity >= product.quantity}
                        className="px-4 py-3 hover:bg-orange-100 font-bold text-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(cartItem!)}
                      className="px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors border border-red-200"
                    >
                      {locale === "fr" ? "Retirer" : "إزالة"}
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.quantity - cartQuantity} {locale === "fr" ? "disponibles restants" : "المتاحة المتبقية"}
                  </span>
                </div>
              ) : (
                /* Add to Cart when not in cart */
                <>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">
                      {locale === "fr" ? "Quantité" : "الكمية"}
                    </span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-2 min-w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
                        disabled={quantity >= product.quantity}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.quantity} {locale === "fr" ? "disponibles" : "متاح"}
                    </span>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock || isAddingToCart}
                      className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg font-medium ${
                        product.inStock
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isAddingToCart ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={20} />
                          {locale === "fr" ? "Ajout..." : "جاري الإضافة..."}
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} className="mr-2" />
                          {product.inStock
                            ? locale === "fr"
                              ? "Ajouter au panier"
                              : "أضف إلى السلة"
                            : locale === "fr"
                            ? "Rupture de stock"
                            : "نفذت الكمية"}
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {product.category && (
        <RelatedProducts
          categoryId={product.category?._id}
          currentProductId={product._id}
        />
      )}
    </div>
  )
}

export default ProductPage
