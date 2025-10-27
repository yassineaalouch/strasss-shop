"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
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
  Package,
  ChevronLeft,
  ChevronRight,
  Gift,
  Calculator,
  Eye,
  Sparkles,
  Users
} from "lucide-react"
import { useLocale } from "next-intl"
import { Product } from "@/types/product"

export type PackItem = {
  product: Product
  quantity: number
}

export type ProductPack = {
  id: string
  name: {
    fr: string
    ar: string
  }
  description?: {
    fr: string
    ar: string
  }
  items: PackItem[]
  totalPrice: number
  discountPrice?: number
  images?: string[]
}

const PackDetailPage: React.FC = () => {
  const locale = useLocale() as "fr" | "ar"
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<
    "description" | "items" | "reviews"
  >("description")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // Données d'exemple
  const exampleProducts: Product[] = [
    {
      _id: "1",
      name: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Bobines de fil multicolores"
      },
      description: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Un assortiment de belles bobines de fil multicolores, parfaites pour tous vos projets de couture."
      },
      price: 25,
      originalPrice: 30,
      images: [
        "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg"
      ],
      category: {
        _id: "cat1",
        name: { fr: "Accessoires de Couture", ar: "إكسسوارات الخياطة" },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      discount: {
        _id: "disc1",
        name: { fr: "Promotion 10%", ar: "تخفيض 10%" },
        type: "PERCENTAGE",
        value: 10,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      Characteristic: [
        {
          _id: "c1",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [
            { fr: "Multicolore", ar: "متعدد الألوان" },
            { fr: "Blanc", ar: "أبيض" }
          ]
        },
        {
          _id: "c2",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [
            { fr: "Polyester", ar: "بوليستر" },
            { fr: "Coton", ar: "قطن" }
          ]
        }
      ],
      inStock: true,
      quantity: 20,
      isNew: false,
      isOnSale: true,
      slug: "bobines-de-fil-multicolores",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "2",
      name: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Fournitures de couture"
      },
      description: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Collection d’outils de couture (fils, boutons, etc.) idéale pour atelier et DIY."
      },
      price: 40,
      images: [
        "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg"
      ],
      category: {
        _id: "cat1",
        name: { fr: "Accessoires de Couture", ar: "إكسسوارات الخياطة" },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      Characteristic: [
        {
          _id: "c3",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Multicolore", ar: "متعدد الألوان" }]
        },
        {
          _id: "c4",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Mix", ar: "خليط" }]
        }
      ],
      inStock: true,
      quantity: 50,
      isNew: false,
      isOnSale: false,
      slug: "fournitures-de-couture",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "3",
      name: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Fils colorés dans un tiroir"
      },
      description: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Vue rapprochée de fils à coudre colorés bien rangés dans un tiroir."
      },
      price: 30,
      images: [
        "https://static.mapetitemercerie.com/99298-large_default/kit-de-11-fils-a-coudre-guetermann-accessoires.jpg"
      ],
      category: {
        _id: "cat1",
        name: { fr: "Accessoires de Couture", ar: "إكسسوارات الخياطة" },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      Characteristic: [
        {
          _id: "c5",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Multicolore", ar: "متعدد الألوان" }]
        },
        {
          _id: "c6",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Coton", ar: "قطن" }]
        }
      ],
      inStock: true,
      quantity: 70,
      isNew: true,
      isOnSale: false,
      slug: "fils-colores-dans-un-tiroir",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "4",
      name: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Tissus assortis colorés"
      },
      description: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Collection de tissus 100% coton, idéals pour patchwork, quilting et projets créatifs."
      },
      price: 35,
      images: [
        "https://static.mapetitemercerie.com/48913-large_default/machine-a-coudre-smarter-260c-pfaff.jpg"
      ],
      category: {
        _id: "cat2",
        name: { fr: "Tissus", ar: "أقمشة" },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      Characteristic: [
        {
          _id: "c7",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Multicolore", ar: "متعدد الألوان" }]
        },
        {
          _id: "c8",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Coton", ar: "قطن" }]
        }
      ],
      inStock: true,
      quantity: 80,
      isNew: false,
      isOnSale: false,
      slug: "tissus-assortis-colores",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
  const examplePack: ProductPack = {
    id: "pack-1",
    name: {
      fr: "Pack Débutant Couture Complet",
      ar: "حزمة المبتدئين الكاملة للخياطة"
    },
    description: {
      fr: "Tout ce qu'il faut pour commencer la couture ! Ce pack complet contient tous les outils essentiels pour débuter dans l'art de la couture. Parfait pour les débutants ou comme cadeau.",
      ar: "كل ما تحتاجه لبدء الخياطة! تحتوي هذه الحزمة الكاملة على جميع الأدوات الأساسية للبدء في فن الخياطة. مثالية للمبتدئين أو كهدية."
    },
    items: [
      { product: exampleProducts[0], quantity: 2 },
      { product: exampleProducts[1], quantity: 1 },
      { product: exampleProducts[2], quantity: 1 }
    ],
    totalPrice: 113.83,
    discountPrice: 89.99,
    images: [
      "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg",
      "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg",
      "https://static.mapetitemercerie.com/99298-large_default/kit-de-11-fils-a-coudre-guetermann-accessoires.jpg"
    ]
  }

  const currentPack = examplePack

  const nextImage = () => {
    if (currentPack.images && currentPack.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === currentPack.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (currentPack.images && currentPack.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? currentPack.images!.length - 1 : prev - 1
      )
    }
  }

  const incrementQuantity = () => {
    const minStock = Math.min(
      ...currentPack.items.map((item) =>
        Math.floor(item.product.quantity / item.quantity)
      )
    )
    if (selectedQuantity < minStock) {
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
      `Ajout au panier: ${selectedQuantity}x ${currentPack.name[locale]}`
    )
    alert(
      `Pack ajouté au panier: ${selectedQuantity}x ${currentPack.name[locale]}`
    )
  }

  const calculateDiscount = () => {
    if (currentPack.discountPrice) {
      return Math.round(
        ((currentPack.totalPrice - currentPack.discountPrice) /
          currentPack.totalPrice) *
          100
      )
    }
    return 0
  }

  const calculateSavings = () => {
    if (currentPack.discountPrice) {
      return currentPack.totalPrice - currentPack.discountPrice
    }
    return 0
  }

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const isPackInStock = currentPack.items.every((item) => item.product.inStock)

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Section Images */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden group">
              {currentPack.images && currentPack.images.length > 0 ? (
                <Image
                  src={currentPack.images[currentImageIndex]}
                  alt={currentPack.name[locale]}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Package className="w-24 h-24 text-gray-400" />
                </div>
              )}

              {/* Badge Pack */}
              <div className="absolute top-4 left-4 space-y-2">
                <span className=" px-3 py-1 bg-purple-500 text-white text-sm font-medium rounded-full flex items-center">
                  <Gift className="w-4 h-4 mr-1" />
                  PACK
                </span>
                {calculateDiscount() > 0 && (
                  <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    -{calculateDiscount()}%
                  </span>
                )}
              </div>

              {/* Boutons de navigation */}
              {currentPack.images && currentPack.images.length > 1 && (
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

              {/* Indicateur d'économies */}
              {calculateSavings() > 0 && (
                <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Économisez {calculateSavings().toFixed(2)} DH
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Miniatures */}
            {currentPack.images && currentPack.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {currentPack.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-purple-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${currentPack.name[locale]} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Aperçu des produits inclus */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Package className="w-5 h-5 mr-2 text-purple-500" />
                Produits inclus ({currentPack.items.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentPack.items.map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name[locale]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      ×{item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Informations */}
          <div className="space-y-6">
            {/* Titre et prix */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {currentPack.name[locale]}
              </h1>

              {/* Prix */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-3">
                  {currentPack.discountPrice ? (
                    <>
                      <span className="text-3xl font-bold text-green-600">
                        {currentPack.discountPrice.toFixed(2)} DH
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {currentPack.totalPrice.toFixed(2)} DH
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      {currentPack.totalPrice.toFixed(2)} DH
                    </span>
                  )}
                </div>

                {calculateDiscount() > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                      -{calculateDiscount()}% de réduction
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      Vous économisez {calculateSavings().toFixed(2)} DH
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Résumé du pack */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center space-x-2 mb-3">
                <Calculator className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Résumé du Pack</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Produits:</span>
                  <span className="font-medium">
                    {currentPack.items.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Quantité totale:</span>
                  <span className="font-medium">
                    {currentPack.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Statut stock */}
            <div className="flex items-center space-x-2">
              {isPackInStock ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">
                    Pack disponible
                  </span>
                  <span className="text-gray-500">
                    (Stock limité selon les produits)
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-red-600 font-medium">
                    Certains produits ne sont plus disponibles
                  </span>
                </>
              )}
            </div>

            {/* Sélection quantité et ajout panier */}
            {isPackInStock && (
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
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Ajouter le pack au panier</span>
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
                {
                  id: "items",
                  label: `Produits inclus (${currentPack.items.length})`
                }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
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
                <p className="text-gray-700 leading-relaxed text-lg">
                  {currentPack.description?.[locale] ||
                    "Description du pack non disponible."}
                </p>
              </div>
            )}

            {activeTab === "items" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Détail des produits inclus
                </h3>
                {currentPack.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name[locale]}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-1 right-1 bg-purple-500 text-white text-xs px-1 rounded">
                            ×{item.quantity}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {item.product.name[locale]}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {item.product.category?.name[locale]}
                              </p>
                            </div>

                            <div className="text-right flex-shrink-0">
                              <div className="text-sm font-medium text-gray-900">
                                {(item.product.price * item.quantity).toFixed(
                                  2
                                )}{" "}
                                DH
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.product.price.toFixed(2)} DH ×{" "}
                                {item.quantity}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              toggleItemExpansion(item.product._id)
                            }
                            className="mt-3 text-sm text-purple-600 hover:text-purple-800 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            {expandedItems.has(item.product._id)
                              ? "Masquer"
                              : "Voir"}{" "}
                            les détails
                          </button>

                          {expandedItems.has(item.product._id) && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">
                                {item.product.description[locale]}
                              </p>
                              <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                                <div>
                                  <span className="text-gray-500">Stock:</span>
                                  <span className="ml-1 font-medium">
                                    {item.product.quantity}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Statut:</span>
                                  <span
                                    className={`ml-1 font-medium ${
                                      item.product.inStock
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {item.product.inStock
                                      ? "Disponible"
                                      : "Rupture"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Résumé des prix */}
                <div className="bg-gray-100 rounded-lg p-6 mt-8">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Récapitulatif des prix
                  </h4>
                  <div className="space-y-2">
                    {currentPack.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.product.name[locale]} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {(item.product.price * item.quantity).toFixed(2)} DH
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Prix total individuel:</span>
                        <span>{currentPack.totalPrice.toFixed(2)} DH</span>
                      </div>
                      {currentPack.discountPrice && (
                        <>
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Prix du pack:</span>
                            <span className="font-semibold">
                              {currentPack.discountPrice.toFixed(2)} DH
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-green-600 font-semibold">
                            <span>Votre économie:</span>
                            <span>{calculateSavings().toFixed(2)} DH</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section produits recommandés */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Packs similaires
            </h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Voir tout
            </button>
          </div>

          <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200">
            <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>D&apos;autres packs recommandés seront affichés ici.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackDetailPage
