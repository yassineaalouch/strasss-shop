"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Ruler,
  Palette,
  Package,
  Tag,
  ChevronLeft,
  ChevronRight,
  Layers
} from "lucide-react"
import { useLocale } from "next-intl"
import { Product } from "@/types/type"

// Props du composant

const ProductPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "reviews"
  >("description")
  const locale = useLocale() as "fr" | "ar"
  // Données exemple
  const exampleProduct: Product = {
    id: "1",
    name: {
      fr: "Bobines de fil multicolores premium",
      ar: "بكرات خيط متعددة الألوان فاخرة"
    },
    price: 25.99,
    originalPrice: 35.99,
    images: [
      "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg",
      "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg",
      "https://static.mapetitemercerie.com/99298-large_default/kit-de-11-fils-a-coudre-guetermann-accessoires.jpg",
      "https://static.mapetitemercerie.com/48913-large_default/machine-a-coudre-smarter-260c-pfaff.jpg"
    ],
    rating: 4.5,
    reviews: 128,
    isNew: true,
    isOnSale: true,
    category: "Fils et bobines",
    material: "Polyester haute qualité",
    height: "5cm",
    color: "Multicolore",
    inStock: true,
    quantity: 45,
    description: {
      fr: "Set de bobines de fil multicolores de haute qualité, parfait pour tous vos projets de couture. Chaque bobine contient 100m de fil résistant et durable. Idéal pour la couture, la broderie et les travaux de réparation.",
      ar: "مجموعة بكرات خيط متعددة الألوان عالية الجودة، مثالية لجميع مشاريع الخياطة الخاصة بك. تحتوي كل بكرة على 100 متر من الخيط المقاوم والمتين. مثالي للخياطة والتطريز وأعمال الإصلاح."
    }
  }

  const currentProduct = exampleProduct

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === currentProduct.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentProduct.images.length - 1 : prev - 1
    )
  }

  const incrementQuantity = () => {
    if (selectedQuantity < currentProduct.quantity) {
      setSelectedQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    console.log(
      `Ajout au panier: ${selectedQuantity}x ${currentProduct.name[locale]}`
    )
    alert(
      `Produit ajouté au panier: ${selectedQuantity}x ${currentProduct.name[locale]}`
    )
  }

  const calculateDiscount = () => {
    if (currentProduct.originalPrice) {
      return Math.round(
        ((currentProduct.originalPrice - currentProduct.price) /
          currentProduct.originalPrice) *
          100
      )
    }
    return 0
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Section Images */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden group">
              <Image
                src={currentProduct.images[currentImageIndex]}
                alt={currentProduct.name[locale]}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {currentProduct.isNew && (
                  <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    NOUVEAU
                  </span>
                )}
                {currentProduct.isOnSale && calculateDiscount() > 0 && (
                  <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    -{calculateDiscount()}%
                  </span>
                )}
              </div>

              {/* Boutons de navigation */}
              {currentProduct.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Actions rapides */}
              <div className="absolute top-4 right-4 space-y-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full shadow-lg transition-colors ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-white/80 hover:bg-white text-gray-600"
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
                <button className="p-2 bg-white/80 hover:bg-white text-gray-600 rounded-full shadow-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Miniatures */}
            {currentProduct.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {currentProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${currentProduct.name[locale]} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section Informations */}
          <div className="space-y-6">
            {/* Titre et prix */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {currentProduct.name[locale]}
              </h1>

              {/* Note et avis */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(currentProduct.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {currentProduct.rating} ({currentProduct.reviews} avis)
                </span>
              </div>

              {/* Prix */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {currentProduct.price.toFixed(2)} DH
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {currentProduct.originalPrice.toFixed(2)} DH
                  </span>
                )}
                {currentProduct.isOnSale && calculateDiscount() > 0 && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">
                    Économisez {calculateDiscount()}%
                  </span>
                )}
              </div>
            </div>

            {/* Caractéristiques rapides */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Catégorie:</span>
                <span className="text-sm font-medium">
                  {currentProduct.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Matériau:</span>
                <span className="text-sm font-medium">
                  {currentProduct.material}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Couleur:</span>
                <span className="text-sm font-medium">
                  {currentProduct.color}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Ruler className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Taille:</span>
                <span className="text-sm font-medium">
                  {currentProduct.height}
                </span>
              </div>
            </div>

            {/* Statut stock */}
            <div className="flex items-center space-x-2">
              {currentProduct.inStock ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">En stock</span>
                  <span className="text-gray-500">
                    ({currentProduct.quantity} disponibles)
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-red-600 font-medium">
                    Rupture de stock
                  </span>
                </>
              )}
            </div>

            {/* Sélection quantité et ajout panier */}
            {currentProduct.inStock && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    Quantité:
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      disabled={selectedQuantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">
                      {selectedQuantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      disabled={selectedQuantity >= currentProduct.quantity}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Ajouter au panier</span>
                </button>
              </div>
            )}

            {/* Avantages */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                <span>Livraison gratuite dès 200 DH</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <RotateCcw className="w-4 h-4" />
                <span>Retour sous 30 jours</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Garantie qualité</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section onglets */}
        <div className="mt-12">
          {/* Navigation onglets */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: "description", label: "Description" },
                { id: "specs", label: "Spécifications" },
                { id: "reviews", label: `Avis (${currentProduct.reviews})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenu onglets */}
          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {currentProduct.description[locale]}
                </p>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Caractéristiques
                  </h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Catégorie:</dt>
                      <dd className="font-medium">{currentProduct.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Matériau:</dt>
                      <dd className="font-medium">{currentProduct.material}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Couleur:</dt>
                      <dd className="font-medium">{currentProduct.color}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Dimensions:</dt>
                      <dd className="font-medium">{currentProduct.height}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Stock:</dt>
                      <dd className="font-medium">
                        {currentProduct.quantity} unités
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Avis clients ({currentProduct.reviews})
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {renderStars(currentProduct.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {currentProduct.rating}/5
                    </span>
                  </div>
                </div>

                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Les avis clients seront affichés ici.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
