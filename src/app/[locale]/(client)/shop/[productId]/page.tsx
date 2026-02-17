
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
import { ShareMenu } from "@/components/ShareMenu"
import { isColorCharacteristic, normalizeHexColor, isValidHexColor } from "@/utils/colorCharacteristic"

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
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<Record<string, string>>({})
  
  // États pour l'effet de zoom
  const [isZoomActive, setIsZoomActive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [imageRef, setImageRef] = useState<HTMLDivElement | null>(null)
  const [zoomBoxPosition, setZoomBoxPosition] = useState({ top: 0, left: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

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
          setSelectedImageIndex(0)
          setImageLoaded(false)
          setImageError(false)
          setIsZoomActive(false)
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
      // Reset image loaded state when changing image
      setImageLoaded(false)
      setImageError(false)
    }
  }

  const prevImage = () => {
    if (product && product.images.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      )
      // Reset image loaded state when changing image
      setImageLoaded(false)
      setImageError(false)
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
      const itemImage =
        product.images[selectedImageIndex] ??
        product.images[0] ??
        "/No_Image_Available.jpg"

      // Add product to cart with discount info and characteristics
      addItem(
        {
          id: product._id,
          name: product.name[locale],
          price: product.price,
          image: itemImage,
          type: "product",
          discount: discount,
          characteristic: formattedCharacteristics,
          maxQuantity: product.quantity // Stocker la quantité maximale disponible
        },
        quantity
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
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index)
                      setImageLoaded(false)
                      setImageError(false)
                    }}
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
                    image={product.images?.[0]}
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
                                    setSelectedImageIndex(idx)
                                    setImageLoaded(false)
                                    setImageError(false)
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
                    <div className="flex items-center border-2 border-firstColor rounded-lg bg-firstColor/10">
                      <button
                        onClick={() => {
                          if (cartQuantity > 1) {
                            updateQuantity(cartItem!, cartQuantity - 1)
                          } else {
                            removeItem(cartItem!)
                          }
                        }}
                        className="px-4 py-3 hover:bg-firstColor/20 font-bold text-firstColor transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={cartQuantity}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1
                          let finalQuantity = Math.min(newQuantity, product.quantity)
                          finalQuantity = Math.max(1, finalQuantity)
                          updateQuantity(cartItem!, finalQuantity)
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value)
                          if (isNaN(value) || value < 1) {
                            updateQuantity(cartItem!, 1)
                          }
                        }}
                        className="px-6 py-3 min-w-16 text-center font-bold text-lg text-firstColor border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-firstColor rounded [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                      />
                      <button
                        onClick={() => {
                          if (cartQuantity < product.quantity) {
                            updateQuantity(cartItem!, cartQuantity + 1)
                          }
                        }}
                        disabled={cartQuantity >= product.quantity}
                        className="px-4 py-3 hover:bg-firstColor/20 font-bold text-firstColor transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      <input
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={quantity}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1
                          let finalQuantity = Math.min(newQuantity, product.quantity)
                          finalQuantity = Math.max(1, finalQuantity)
                          setQuantity(finalQuantity)
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value)
                          if (isNaN(value) || value < 1) {
                            setQuantity(1)
                          }
                        }}
                        className="px-4 py-2 min-w-12 text-center border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-firstColor rounded [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                      />
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
                          ? "bg-firstColor text-white hover:bg-secondColor"
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
