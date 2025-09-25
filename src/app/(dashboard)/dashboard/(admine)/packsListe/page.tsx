"use client"

import React, { useState } from "react"
import {
  Package,
  Plus,
  Search,
  Trash2,
  Edit,
  Save,
  X,
  ImageIcon,
  Minus,
  Calculator
} from "lucide-react"
import { PackFormData, PackItem, Product, ProductPack } from "@/types/type"
import Image from "next/image"

// Types

const AdminPackCreator: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [editingPack, setEditingPack] = useState<ProductPack | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<PackItem[]>([])
  const [currentLanguage, setCurrentLanguage] = useState<"fr" | "ar">("fr")

  const [formData, setFormData] = useState<PackFormData>({
    name: { fr: "", ar: "" },
    description: { fr: "", ar: "" },
    discountPrice: "",
    images: []
  })

  // Données d'exemple de produits disponibles
  const availableProducts: Product[] = [
    {
      id: "1",
      name: {
        fr: "Bobines de fil multicolores",
        ar: "بكرات خيط متعددة الألوان"
      },
      price: 25.0,
      originalPrice: 30.0,
      images: [
        "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg"
      ],
      rating: 4.5,
      reviews: 15,
      isNew: false,
      isOnSale: true,
      category: "Fils et bobines",
      material: "Polyester",
      height: "5cm",
      color: "Multicolore",
      inStock: true,
      quantity: 50,
      description: {
        fr: "Bobines de fil de haute qualité en polyester multicolore",
        ar: "بكرات خيط عالية الجودة من البوليستر متعددة الألوان"
      }
    },
    {
      id: "2",
      name: { fr: "Ciseaux de couture professionnels", ar: "مقص خياطة مهني" },
      price: 45.5,
      originalPrice: 50.0,
      images: [
        "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg"
      ],
      rating: 4.8,
      reviews: 32,
      isNew: true,
      isOnSale: false,
      category: "Outils de couture",
      material: "Acier inoxydable",
      height: "23cm",
      color: "Argent",
      inStock: true,
      quantity: 25,
      description: {
        fr: "Ciseaux professionnels en acier inoxydable pour une coupe précise",
        ar: "مقص مهني من الفولاذ المقاوم للصدأ للقطع الدقيق"
      }
    },
    {
      id: "3",
      name: { fr: "Kit aiguilles assorties", ar: "طقم إبر متنوعة" },
      price: 18.33,
      images: [
        "https://static.mapetitemercerie.com/99298-large_default/kit-de-11-fils-a-coudre-guetermann-accessoires.jpg"
      ],
      rating: 4.2,
      reviews: 8,
      isNew: false,
      isOnSale: false,
      category: "Aiguilles",
      material: "Acier",
      height: "Variée",
      color: "Argent",
      inStock: true,
      quantity: 75,
      description: {
        fr: "Kit complet d'aiguilles de différentes tailles pour tous types de tissus",
        ar: "طقم كامل من الإبر بأحجام مختلفة لجميع أنواع الأقمشة"
      }
    },
    {
      id: "4",
      name: { fr: "Machine à coudre portable", ar: "ماكينة خياطة محمولة" },
      price: 89.99,
      originalPrice: 120.0,
      images: [
        "https://static.mapetitemercerie.com/48913-large_default/machine-a-coudre-smarter-260c-pfaff.jpg"
      ],
      rating: 4.6,
      reviews: 45,
      isNew: true,
      isOnSale: true,
      category: "Machines",
      material: "Plastique/Métal",
      height: "30cm",
      color: "Blanc",
      inStock: true,
      quantity: 10,
      description: {
        fr: "Machine à coudre portable idéale pour les débutants et projets légers",
        ar: "ماكينة خياطة محمولة مثالية للمبتدئين والمشاريع الخفيفة"
      }
    },
    {
      id: "5",
      name: { fr: "Pack tissus premium", ar: "حزمة أقمشة فاخرة" },
      price: 120.0,
      images: [
        "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg"
      ],
      rating: 4.7,
      reviews: 22,
      isNew: false,
      isOnSale: false,
      category: "Tissus",
      material: "Coton/Lin",
      height: "150cm largeur",
      color: "Assortis",
      inStock: true,
      quantity: 30,
      description: {
        fr: "Sélection de tissus premium en coton et lin de haute qualité",
        ar: "مجموعة مختارة من الأقمشة الفاخرة من القطن والكتان عالي الجودة"
      }
    },
    {
      id: "6",
      name: {
        fr: "Accessoires de couture complets",
        ar: "إكسسوارات خياطة كاملة"
      },
      price: 57.38,
      originalPrice: 65.0,
      images: [
        "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg"
      ],
      rating: 4.3,
      reviews: 18,
      isNew: false,
      isOnSale: true,
      category: "Accessoires",
      material: "Mixte",
      height: "Variée",
      color: "Assortis",
      inStock: true,
      quantity: 40,
      description: {
        fr: "Kit complet d'accessoires de couture pour tous vos projets créatifs",
        ar: "طقم كامل من إكسسوارات الخياطة لجميع مشاريعك الإبداعية"
      }
    }
  ]

  // Données d'exemple de packs existants
  const examplePacks: ProductPack[] = [
    {
      id: "pack-1",
      name: { fr: "Pack Débutant Couture", ar: "حزمة المبتدئين للخياطة" },
      description: {
        fr: "Tout ce qu'il faut pour commencer la couture",
        ar: "كل ما تحتاجه لبدء الخياطة"
      },
      items: [
        { product: availableProducts[0], quantity: 2 },
        { product: availableProducts[1], quantity: 1 },
        { product: availableProducts[2], quantity: 1 }
      ],
      totalPrice: 113.83,
      discountPrice: 99.99,
      images: [
        "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg"
      ]
    }
  ]

  const [packs, setPacks] = useState<ProductPack[]>(examplePacks)

  const filteredProducts = availableProducts.filter(
    (product) =>
      product.inStock &&
      (product.name[currentLanguage]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.material.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }

  const addProductToPack = (product: Product) => {
    const existingItem = selectedProducts.find(
      (item) => item.product.id === product.id
    )
    if (existingItem) {
      setSelectedProducts((prev) =>
        prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setSelectedProducts((prev) => [...prev, { product, quantity: 1 }])
    }
  }

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProductFromPack(productId)
      return
    }
    setSelectedProducts((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeProductFromPack = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((item) => item.product.id !== productId)
    )
  }

  const resetForm = () => {
    setFormData({
      name: { fr: "", ar: "" },
      description: { fr: "", ar: "" },
      discountPrice: "",
      images: []
    })
    setSelectedProducts([])
    setIsCreating(false)
    setEditingPack(null)
  }

  const handleSavePack = () => {
    if (
      !formData.name.fr ||
      !formData.name.ar ||
      selectedProducts.length === 0
    ) {
      alert(
        "Veuillez remplir tous les champs obligatoires et ajouter au moins un produit"
      )
      return
    }

    const totalPrice = calculateTotalPrice()
    const newPack: ProductPack = {
      id: editingPack?.id || `pack-${Date.now()}`,
      name: formData.name,
      description:
        formData.description.fr || formData.description.ar
          ? formData.description
          : undefined,
      items: selectedProducts,
      totalPrice,
      discountPrice: formData.discountPrice
        ? parseFloat(formData.discountPrice)
        : undefined,
      images: formData.images.length > 0 ? formData.images : undefined
    }

    if (editingPack) {
      setPacks((prev) =>
        prev.map((pack) => (pack.id === editingPack.id ? newPack : pack))
      )
    } else {
      setPacks((prev) => [...prev, newPack])
    }

    resetForm()
  }

  const handleEditPack = (pack: ProductPack) => {
    setEditingPack(pack)
    setFormData({
      name: pack.name,
      description: pack.description || { fr: "", ar: "" },
      discountPrice: pack.discountPrice?.toString() || "",
      images: pack.images || []
    })
    setSelectedProducts(pack.items)
    setIsCreating(true)
  }

  const handleDeletePack = (packId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce pack ?")) {
      setPacks((prev) => prev.filter((pack) => pack.id !== packId))
    }
  }

  const addImageUrl = () => {
    const url = prompt("Entrez l'URL de l'image :")
    if (url) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, url]
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <Package className="mr-3" size={32} />
                Gestion des Packs Produits
              </h1>
              <p className="text-gray-600 mt-2">{packs.length} packs créés</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-lg border">
                <button
                  onClick={() => setCurrentLanguage("fr")}
                  className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                    currentLanguage === "fr"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setCurrentLanguage("ar")}
                  className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                    currentLanguage === "ar"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  AR
                </button>
              </div>

              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus className="mr-2" size={20} />
                Créer un Pack
              </button>
            </div>
          </div>
        </div>

        {/* Liste des packs existants */}
        {!isCreating && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packs.map((pack) => (
              <div
                key={pack.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48 bg-gray-200">
                  {pack.images && pack.images[0] ? (
                    <Image
                      src={pack.images[0]}
                      width={100}
                      height={100}
                      alt={pack.name[currentLanguage]}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="text-gray-400" size={48} />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEditPack(pack)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                    >
                      <Edit size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeletePack(pack.id)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {pack.name[currentLanguage]}
                  </h3>

                  {pack.description && (
                    <p className="text-gray-600 text-sm mb-3">
                      {pack.description[currentLanguage]}
                    </p>
                  )}

                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">
                      {pack.items.length} produit
                      {pack.items.length > 1 ? "s" : ""}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {pack.items.slice(0, 3).map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                        >
                          {item.product.name[currentLanguage].substring(0, 20)}
                          ...
                          {item.quantity > 1 && (
                            <span className="ml-1 bg-gray-200 rounded-full px-1">
                              ×{item.quantity}
                            </span>
                          )}
                        </span>
                      ))}
                      {pack.items.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-600">
                          +{pack.items.length - 3} autres
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between">
                      <div>
                        {pack.discountPrice ? (
                          <div>
                            <span className="text-lg font-bold text-green-600">
                              {pack.discountPrice.toFixed(2)} DH
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {pack.totalPrice.toFixed(2)} DH
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-800">
                            {pack.totalPrice.toFixed(2)} DH
                          </span>
                        )}
                      </div>

                      {pack.discountPrice && (
                        <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          -
                          {Math.round(
                            ((pack.totalPrice - pack.discountPrice) /
                              pack.totalPrice) *
                              100
                          )}
                          %
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Formulaire de création/édition */}
        {isCreating && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingPack ? "Modifier le Pack" : "Créer un Nouveau Pack"}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations du pack */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Informations du Pack
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du pack (Français) *
                      </label>
                      <input
                        type="text"
                        value={formData.name.fr}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: { ...prev.name, fr: e.target.value }
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex: Pack Débutant Couture"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du pack (Arabe) *
                      </label>
                      <input
                        type="text"
                        value={formData.name.ar}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: { ...prev.name, ar: e.target.value }
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="حزمة المبتدئين للخياطة"
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description (Français)
                      </label>
                      <textarea
                        value={formData.description.fr}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: {
                              ...prev.description,
                              fr: e.target.value
                            }
                          }))
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description du pack..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description (Arabe)
                      </label>
                      <textarea
                        value={formData.description.ar}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: {
                              ...prev.description,
                              ar: e.target.value
                            }
                          }))
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="وصف الحزمة..."
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prix réduit (optionnel)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          value={formData.discountPrice}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              discountPrice: e.target.value
                            }))
                          }
                          className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          DH
                        </span>
                      </div>
                    </div>

                    {/* Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Images du pack
                      </label>
                      <div className="space-y-2">
                        {formData.images.map((image, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg"
                          >
                            <Image
                              src={image}
                              alt="Pack"
                              width={100}
                              height={100}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <span className="flex-1 text-sm text-gray-600 truncate">
                              {image}
                            </span>
                            <button
                              onClick={() => removeImage(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addImageUrl}
                          className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
                        >
                          <ImageIcon className="mr-2" size={16} />
                          Ajouter une image
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Résumé du pack */}
                {selectedProducts.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Calculator className="mr-2" size={16} />
                      Résumé du Pack
                    </h4>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Nombre de produits:</span>
                        <span>{selectedProducts.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantité totale:</span>
                        <span>
                          {selectedProducts.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Prix total:</span>
                        <span>{calculateTotalPrice().toFixed(2)} DH</span>
                      </div>
                      {formData.discountPrice && (
                        <div className="flex justify-between text-green-600 font-medium">
                          <span>Prix avec réduction:</span>
                          <span>
                            {parseFloat(formData.discountPrice).toFixed(2)} DH
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Sélection des produits */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Ajouter des Produits
                  </h3>

                  {/* Recherche de produits */}
                  <div className="relative mb-4">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Rechercher des produits..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Liste des produits disponibles */}
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden">
                            {product.images && product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name[currentLanguage]}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="text-gray-400" size={16} />
                              </div>
                            )}
                            {product.isNew && (
                              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 rounded-bl">
                                NEW
                              </div>
                            )}
                            {product.isOnSale && (
                              <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 rounded-br">
                                SALE
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              {product.name[currentLanguage]}
                            </p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{product.category}</span>
                              <span>•</span>
                              <span>{product.material}</span>
                              <span>•</span>
                              <span>{product.color}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              {product.originalPrice && product.isOnSale ? (
                                <div className="flex items-center space-x-1">
                                  <span className="text-sm font-medium text-green-600">
                                    {product.price.toFixed(2)} DH
                                  </span>
                                  <span className="text-xs text-gray-500 line-through">
                                    {product.originalPrice.toFixed(2)} DH
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm font-medium text-gray-600">
                                  {product.price.toFixed(2)} DH
                                </span>
                              )}
                              <div className="flex items-center">
                                <span className="text-xs text-yellow-500">
                                  ★
                                </span>
                                <span className="text-xs text-gray-500 ml-1">
                                  {product.rating} ({product.reviews})
                                </span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Stock: {product.quantity} disponible
                              {product.quantity > 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => addProductToPack(product)}
                          disabled={!product.inStock || product.quantity === 0}
                          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          <Plus size={14} className="mr-1" />
                          Ajouter
                        </button>
                      </div>
                    ))}
                    {filteredProducts.length === 0 && (
                      <div className="p-6 text-center text-gray-500">
                        <Package className="mx-auto mb-2" size={24} />
                        <p>Aucun produit disponible</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Produits sélectionnés */}
                {selectedProducts.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">
                      Produits dans le Pack
                    </h4>
                    <div className="space-y-3">
                      {selectedProducts.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden">
                              {item.product.images && item.product.images[0] ? (
                                <Image
                                  src={item.product.images[0]}
                                  alt={item.product.name[currentLanguage]}
                                  width={100}
                                  height={100}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package
                                    className="text-gray-400"
                                    size={16}
                                  />
                                </div>
                              )}
                              {item.product.isNew && (
                                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 rounded-bl">
                                  NEW
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">
                                {item.product.name[currentLanguage]}
                              </p>
                              <div className="text-xs text-gray-500">
                                {item.product.category} •{" "}
                                {item.product.material} • {item.product.color}
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                {item.product.originalPrice &&
                                item.product.isOnSale ? (
                                  <div className="flex items-center space-x-1">
                                    <span className="text-xs font-medium text-green-600">
                                      {item.product.price.toFixed(2)} DH
                                    </span>
                                    <span className="text-xs text-gray-400 line-through">
                                      {item.product.originalPrice.toFixed(2)} DH
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-600">
                                    {item.product.price.toFixed(2)} DH
                                  </span>
                                )}
                                <span className="text-xs text-gray-500">
                                  × {item.quantity} ={" "}
                                  {(item.product.price * item.quantity).toFixed(
                                    2
                                  )}{" "}
                                  DH
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updateItemQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium px-2 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateItemQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              disabled={item.quantity >= item.product.quantity}
                              className="p-1 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed"
                              title={
                                item.quantity >= item.product.quantity
                                  ? `Stock maximum: ${item.product.quantity}`
                                  : ""
                              }
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() =>
                                removeProductFromPack(item.product.id)
                              }
                              className="p-1 text-red-500 hover:text-red-700 ml-2"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSavePack}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Save className="mr-2" size={16} />
                {editingPack ? "Modifier" : "Créer"} le Pack
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPackCreator
