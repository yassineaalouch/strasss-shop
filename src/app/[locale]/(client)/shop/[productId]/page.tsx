
"use client"
import React, { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
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
import { getMainImage } from "@/lib/getMainImage"
import { RelatedProducts } from "@/components/shop/Relatedproducts"
import { useCartContext } from "@/app/context/CartContext"
import { ShareMenu } from "@/components/ShareMenu"
import { isColorCharacteristic, normalizeHexColor, isValidHexColor } from "@/utils/colorCharacteristic"

const ProductPage: React.FC = () => {
  const { productId } = useParams()
  const router = useRouter()
  const locale = useLocale() as "fr" | "ar"
  const tDetails = useTranslations("ProductPage.details")
  const { addItem, cartItems, updateQuantity, removeItem } = useCartContext()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const selectedImageIndexRef = useRef(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<Record<string, string>>({})
  
  // États pour l'effet de zoom
  const [isZoomActive, setIsZoomActive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [imageRef, setImageRef] = useState<HTMLDivElement | null>(null)
  const [zoomBoxPosition, setZoomBoxPosition] = useState({ top: 0, left: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Helpers de comparaison pour identifier une variante panier
  const areCharacteristicsEqual = (
    a: { name: string; value: string }[] = [],
    b: { name: string; value: string }[] = []
  ) => {
    if (a.length !== b.length) return false
    const sortFn = (x: { name: string; value: string }) =>
      `${x.name}:${x.value}`.toLowerCase()
    const sortedA = [...a].sort((x, y) => sortFn(x).localeCompare(sortFn(y)))
    const sortedB = [...b].sort((x, y) => sortFn(x).localeCompare(sortFn(y)))
    return JSON.stringify(sortedA) === JSON.stringify(sortedB)
  }

  const selectedVariantCharacteristics =
    Object.keys(selectedCharacteristics).length > 0
      ? Object.entries(selectedCharacteristics).map(([name, value]) => ({
          name,
          value
        }))
      : []

  const productCartItems = product
    ? cartItems.filter((item) => item.id === product._id && item.type !== "pack")
    : []

  const quantityByImage = productCartItems.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.image] = (acc[item.image] || 0) + item.quantity
      return acc
    },
    {}
  )

  const selectedImage = product?.images[selectedImageIndex] || ""
  const selectedImageCartQuantity = selectedImage
    ? quantityByImage[selectedImage] || 0
    : 0
  const totalInCartForProduct = productCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
  const remainingAvailableForProduct = product
    ? Math.max(0, product.quantity - totalInCartForProduct)
    : 0

  // Ligne exacte (même image + mêmes caractéristiques)
  const selectedVariantCartItem =
    selectedImage && product
      ? productCartItems.find(
          (item) =>
            item.image === selectedImage &&
            areCharacteristicsEqual(
              item.characteristic || [],
              selectedVariantCharacteristics
            )
        ) || null
      : null
  const selectedVariantQuantity = selectedVariantCartItem?.quantity || 0
  const maxQuantityForSelectedVariant = product
    ? selectedVariantQuantity + remainingAvailableForProduct
    : selectedVariantQuantity

  const orderedImages = product
    ? [...product.images].sort((a, b) => {
        const diff = (quantityByImage[b] || 0) - (quantityByImage[a] || 0)
        if (diff !== 0) return diff
        return product.images.indexOf(a) - product.images.indexOf(b)
      })
    : []

  const selectImageIndex = (nextIndex: number) => {
    selectedImageIndexRef.current = nextIndex
    setSelectedImageIndex(nextIndex)
    setImageLoaded(false)
    setImageError(false)
  }

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
          setSelectedImageIndex(
            (() => {
              const initialIndex = Math.min(
                Math.max(0, productData.mainImageIndex ?? 0),
                (productData.images?.length ?? 1) - 1
              )
              selectedImageIndexRef.current = initialIndex
              return initialIndex
            })()
          )
          setImageLoaded(false)
          setImageError(false)
          setIsZoomActive(false)
          // Charger les détails de la catégorie
          if (productData.category) {
            // fetchCategory(productData.category)
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
      const nextIndex =
        selectedImageIndexRef.current === product.images.length - 1
          ? 0
          : selectedImageIndexRef.current + 1
      selectImageIndex(nextIndex)
    }
  }

  const prevImage = () => {
    if (product && product.images.length > 0) {
      const prevIndex =
        selectedImageIndexRef.current === 0
          ? product.images.length - 1
          : selectedImageIndexRef.current - 1
      selectImageIndex(prevIndex)
    }
  }

  // Réinitialiser l'état de chargement quand l'image change
  useEffect(() => {
    if (product && product.images[selectedImageIndex]) {
      setImageLoaded(false)
      setImageError(false)
      setIsZoomActive(false)
    }
  }, [product, selectedImageIndex])

  // Handle characteristic selection
  const handleCharacteristicSelect = (charName: string, value: string) => {
    setSelectedCharacteristics((prev) => {
      // Toggle selection: if same value is clicked, deselect it
      if (prev[charName] === value) {
        const newState = { ...prev }
        delete newState[charName]
        return newState
      }
      // Otherwise, update the selection
      return { ...prev, [charName]: value }
    })
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

      // Format characteristics if any are selected
      const formattedCharacteristics = Object.keys(selectedCharacteristics).length > 0
        ? Object.entries(selectedCharacteristics).map(([name, value]) => ({
            name,
            value
          }))
        : undefined

      // Image : exactement celle affichée à l'écran (que le client voit avant d'ajouter au panier)
      // pour qu'elle soit la même dans le panier, checkout et détail commande admin
      const selectedIndex = selectedImageIndexRef.current
      const itemImage =
        product.images[selectedIndex] ??
        getMainImage(product) ??
        "/No_Image_Available.jpg"

      // Clé de variante robuste: produit + index image + caractéristiques triées
      const sortedCharacteristicKey = formattedCharacteristics
        ? [...formattedCharacteristics]
            .sort((a, b) =>
              `${a.name}:${a.value}`.localeCompare(`${b.name}:${b.value}`)
            )
            .map((x) => `${x.name}:${x.value}`)
            .join("|")
        : ""
      const variantKey = `${product._id}::img:${selectedIndex}::opts:${sortedCharacteristicKey}`

      // Add product to cart with discount info and characteristics
      addItem(
        {
          id: product._id,
          name: product.name[locale],
          price: product.price,
          image: itemImage,
          variantKey,
          type: "product",
          discount: discount,
          characteristic: formattedCharacteristics,
          maxQuantity: product.quantity // Stocker la quantité maximale disponible
        },
        Math.min(quantity, remainingAvailableForProduct)
      )

      // Reset characteristics selection after adding to cart
      setSelectedCharacteristics({})
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
                  <div
                    ref={setImageRef}
                    className={`relative w-full h-full ${imageLoaded && !imageError ? 'cursor-zoom-in' : 'cursor-default'}`}
                    onMouseEnter={() => {
                      if (imageLoaded && !imageError) {
                        setIsZoomActive(true)
                      }
                    }}
                    onMouseLeave={() => setIsZoomActive(false)}
                    onMouseMove={(e) => {
                      if (!imageLoaded || imageError) {
                        setIsZoomActive(false)
                        return
                      }
                      if (imageRef) {
                        const rect = imageRef.getBoundingClientRect()
                        const x = ((e.clientX - rect.left) / rect.width) * 100
                        const y = ((e.clientY - rect.top) / rect.height) * 100
                        setMousePosition({ x, y })
                        
                        // Calculer la position de la boîte de zoom
                        const zoomBoxSize = 384 // w-96 = 384px
                        const spacing = 16
                        const rightPosition = rect.right + spacing
                        const leftPosition = rect.left - zoomBoxSize - spacing
                        
                        // Vérifier si la boîte peut être placée à droite
                        if (rightPosition + zoomBoxSize <= window.innerWidth) {
                          setZoomBoxPosition({
                            left: rightPosition,
                            top: Math.max(16, rect.top)
                          })
                        } else if (leftPosition >= 0) {
                          // Sinon, la placer à gauche
                          setZoomBoxPosition({
                            left: leftPosition,
                            top: Math.max(16, rect.top)
                          })
                        } else {
                          // Sinon, la placer en dessous
                          setZoomBoxPosition({
                            left: Math.max(16, rect.left),
                            top: rect.bottom + spacing
                          })
                        }
                      }
                    }}
                  >
                    <Image
                      src={product.images[selectedImageIndex]}
                      alt={product.name[locale]}
                      fill
                      className="object-cover"
                      priority
                      loading="eager"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => {
                        setImageError(true)
                        setImageLoaded(false)
                      }}
                    />
                  </div>
                  
                  {/* Boîte de zoom */}
                  {isZoomActive && imageLoaded && !imageError && product.images[selectedImageIndex] && (
                    <div 
                      className="fixed w-96 h-96 border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xl z-50 pointer-events-none hidden lg:block"
                      style={{
                        left: `${zoomBoxPosition.left}px`,
                        top: `${zoomBoxPosition.top}px`,
                        maxWidth: 'calc(100vw - 32px)',
                        maxHeight: 'calc(100vh - 32px)'
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${JSON.stringify(product.images[selectedImageIndex])})`,
                          backgroundSize: '400%',
                          backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                          backgroundRepeat: 'no-repeat',
                          willChange: 'background-position'
                        }}
                      />
                    </div>
                  )}

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
                {orderedImages.map((image) => {
                  const originalIndex = product.images.indexOf(image)
                  const selectedForImage = quantityByImage[image] || 0
                  return (
                  <button
                    key={image}
                    onClick={() => {
                      selectImageIndex(originalIndex)
                    }}
                    className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === originalIndex
                        ? "border-blue-500"
                        : selectedForImage > 0
                        ? "border-emerald-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name[locale]} ${originalIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    {selectedForImage > 0 && (
                      <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                        {selectedForImage}
                      </span>
                    )}
                  </button>
                )})}
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
                {product.category && product.category.name && (
                  <p className="text-gray-500 text-sm">
                    {locale === "fr" ? "Catégorie: " : "الفئة: "}
                    {product.category.name[locale]}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {product && (
                  <ShareMenu
                    url={typeof window !== "undefined" ? window.location.href : ""}
                    title={product.name[locale]}
                    description={product.description?.[locale]}
                    image={getMainImage(product)}
                  />
                )}
              </div>
            </div>

            {/* Prix avec réduction bien visible */}
            <div className="space-y-3">
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-gray-400 line-through font-medium">
                    {product.originalPrice} MAD
                  </span>
                  <span className="bg-gradient-to-r from-red-500 to-firstColor text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                    -{discountPercentage}%
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-firstColor">
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
                <h3 className="text-lg font-semibold mb-2">
                  {locale === "fr" ? "Caractéristiques" : "المواصفات"}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {locale === "fr" 
                    ? "Sélectionnez une valeur pour chaque caractéristique (optionnel)" 
                    : "اختر قيمة لكل خاصية (اختياري)"}
                </p>

                <div className="space-y-4">
                  {product.Characteristic.filter((char) => char?.values?.length).map((char, index) => {
                    const charName =
                      char.name != null && typeof char.name === "object" && "name" in char.name
                        ? (char.name as { name?: { fr?: string; ar?: string } }).name?.[locale] ?? "Caractéristique"
                        : "Caractéristique"
                    const selectedValue = selectedCharacteristics[charName]
                    
                    return (
                      <div
                        key={char._id ?? index}
                        className="flex flex-col gap-2"
                      >
                        {/* Nom de la caractéristique */}
                        <span className="font-medium text-gray-700 text-sm">
                          {charName}
                        </span>

                        {/* Valeurs de la caractéristique - sélectionnables */}
                        <div className="flex flex-wrap gap-2">
                          {char.values.map((value) => {
                            const valueLabel = value?.[locale] ?? "---"
                            const isSelected = selectedValue === valueLabel
                            
                            // Vérifier si c'est une caractéristique de couleur
                            const charNameObj =
                              char.name != null && typeof char.name === "object" && "name" in char.name
                                ? (char.name as { name?: { fr?: string; ar?: string } }).name
                                : { fr: charName, ar: charName }
                            const isColor = isColorCharacteristic(charNameObj.fr) || isColorCharacteristic(charNameObj.ar)
                            const isHexColor = isColor && isValidHexColor(valueLabel)
                            const colorImageUrl = value && "imageUrl" in value ? (value as { imageUrl?: string }).imageUrl : undefined

                            return (
                              <button
                                key={value._id ?? valueLabel}
                                type="button"
                                onClick={() => {
                                  handleCharacteristicSelect(charName, valueLabel)
                                  // Changer l'image produit par l'image associée à cette couleur
                                  if (isColor && colorImageUrl && product.images?.includes(colorImageUrl)) {
                                    const idx = product.images.indexOf(colorImageUrl)
                                    selectImageIndex(idx)
                                  }
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                  isSelected
                                    ? "bg-firstColor text-white shadow-md scale-105"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                                }`}
                              >
                                {isHexColor ? (
                                  <>
                                    <div
                                      className={`w-6 h-6 rounded-full border-2 ${isSelected ? "border-white" : "border-gray-300"} shadow-sm`}
                                      style={{ backgroundColor: normalizeHexColor(valueLabel) }}
                                    />
                                    <span className="font-mono text-xs">
                                      {normalizeHexColor(valueLabel)}
                                    </span>
                                  </>
                                ) : (
                                  valueLabel
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantité et Ajout au panier */}
            <div className="border-t pt-6">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 sm:p-5 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold text-gray-800 text-lg">
                    {locale === "fr" ? "Quantité" : "الكمية"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.quantity} {locale === "fr" ? "disponibles" : "متاح"}{" "}
                    <span className="italic text-gray-400">
                      ({tDetails("quantityApproximate")})
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center rounded-xl border border-firstColor/30 bg-firstColor/5 overflow-hidden">
                    <button
                      onClick={() => {
                        if (selectedVariantCartItem) {
                          if (selectedVariantQuantity > 1) {
                            updateQuantity(
                              selectedVariantCartItem,
                              selectedVariantQuantity - 1
                            )
                          } else {
                            removeItem(selectedVariantCartItem)
                          }
                        } else {
                          setQuantity((prev) => Math.max(1, prev - 1))
                        }
                      }}
                      className="w-12 h-12 grid place-items-center hover:bg-firstColor/10 text-firstColor text-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      disabled={
                        selectedVariantCartItem
                          ? selectedVariantQuantity <= 1
                          : quantity <= 1
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={
                        selectedVariantCartItem
                          ? Math.max(1, maxQuantityForSelectedVariant)
                          : Math.max(1, remainingAvailableForProduct)
                      }
                      value={
                        selectedVariantCartItem
                          ? selectedVariantQuantity
                          : quantity
                      }
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value) || 1
                        let finalQuantity = Math.min(
                          newQuantity,
                          selectedVariantCartItem
                            ? maxQuantityForSelectedVariant
                            : Math.max(1, remainingAvailableForProduct)
                        )
                        finalQuantity = Math.max(1, finalQuantity)
                        if (selectedVariantCartItem) {
                          updateQuantity(selectedVariantCartItem, finalQuantity)
                        } else {
                          setQuantity(finalQuantity)
                        }
                      }}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value)
                        if (isNaN(value) || value < 1) {
                          if (selectedVariantCartItem) {
                            updateQuantity(selectedVariantCartItem, 1)
                          } else {
                            setQuantity(1)
                          }
                        }
                      }}
                      className="w-24 h-12 text-center text-lg font-bold text-gray-800 border-0 bg-transparent focus:outline-none focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                    />
                    <button
                      onClick={() => {
                        if (selectedVariantCartItem) {
                          if (
                            selectedVariantQuantity < maxQuantityForSelectedVariant
                          ) {
                            updateQuantity(
                              selectedVariantCartItem,
                              selectedVariantQuantity + 1
                            )
                          }
                        } else {
                          setQuantity((prev) =>
                            Math.min(
                              Math.max(1, remainingAvailableForProduct),
                              prev + 1
                            )
                          )
                        }
                      }}
                      className="w-12 h-12 grid place-items-center hover:bg-firstColor/10 text-firstColor text-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      disabled={
                        selectedVariantCartItem
                          ? selectedVariantQuantity >= maxQuantityForSelectedVariant
                          : remainingAvailableForProduct <= 0 ||
                            quantity >= remainingAvailableForProduct
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 font-medium">
                      {locale === "fr"
                        ? `Image active: ${selectedImageCartQuantity}`
                        : `الصورة الحالية: ${selectedImageCartQuantity}`}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 font-medium">
                      {locale === "fr"
                        ? `Total panier: ${totalInCartForProduct}`
                        : `إجمالي السلة: ${totalInCartForProduct}`}
                    </span>
                  </div>
                </div>

                {Object.keys(quantityByImage).length > 0 && (
                  <div className="pt-1">
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                      {locale === "fr"
                        ? "Quantité par image"
                        : "الكمية حسب الصورة"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {orderedImages
                        .filter((img) => (quantityByImage[img] || 0) > 0)
                        .map((img) => (
                          <button
                            key={`qty-${img}`}
                            type="button"
                            onClick={() => selectImageIndex(product.images.indexOf(img))}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                              selectedImage === img
                                ? "bg-firstColor text-white border-firstColor"
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                selectedImage === img ? "bg-white/90" : "bg-emerald-500"
                              }`}
                            />
                            {quantityByImage[img]}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={
                      !product.inStock ||
                      isAddingToCart ||
                      remainingAvailableForProduct <= 0
                    }
                    className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl font-semibold transition-all ${
                      product.inStock
                        ? remainingAvailableForProduct <= 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-firstColor text-white hover:bg-secondColor shadow-sm"
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
                            ? remainingAvailableForProduct <= 0
                              ? "Quantité max atteinte"
                              : "Ajouter au panier"
                            : remainingAvailableForProduct <= 0
                            ? "تم بلوغ الكمية القصوى"
                            : "أضف إلى السلة"
                          : locale === "fr"
                          ? "Rupture de stock"
                          : "نفذت الكمية"}
                      </>
                    )}
                  </button>
                  {selectedVariantCartItem && (
                    <button
                      onClick={() => removeItem(selectedVariantCartItem)}
                      className="sm:w-auto px-5 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-medium transition-colors border border-red-200"
                    >
                      {locale === "fr" ? "Retirer cette variante" : "إزالة هذا الخيار"}
                    </button>
                  )}
                </div>
              </div>
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
