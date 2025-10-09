"use client"

import React, { useState, useMemo } from "react"
import {
  Package,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Star,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Tag,
  Palette,
  Ruler,
  Layers
} from "lucide-react"
import Image from "next/image"

// Interface Product
export interface Product {
  id: string
  name: { ar: string; fr: string }
  price: number
  originalPrice?: number
  images: string[]
  rating: number
  reviews: number
  isNew?: boolean
  isOnSale?: boolean
  category: string
  material: string
  height: string
  color: string
  inStock: boolean
  quantity: number
  description: { ar: string; fr: string }
}

interface FilterState {
  search: string
  category: string
  status: "all" | "inStock" | "outOfStock" | "lowStock" | "new" | "onSale"
  minQuantity: string
  maxQuantity: string
}

interface SortState {
  field: "name" | "price" | "quantity" | "rating" | "category"
  direction: "asc" | "desc"
}

const AdminProductsTable: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<"fr" | "ar">("fr")
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    status: "all",
    minQuantity: "",
    maxQuantity: ""
  })

  const [sort, setSort] = useState<SortState>({
    field: "name",
    direction: "asc"
  })

  // Données d'exemple de produits
  const products: Product[] = useMemo(
    () => [
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
        quantity: 5,
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
        inStock: false,
        quantity: 0,
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
      },
      {
        id: "7",
        name: { fr: "Fils dorés de luxe", ar: "خيوط ذهبية فاخرة" },
        price: 75.0,
        images: [
          "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg"
        ],
        rating: 4.9,
        reviews: 12,
        isNew: true,
        isOnSale: false,
        category: "Fils et bobines",
        material: "Soie/Or",
        height: "3cm",
        color: "Doré",
        inStock: true,
        quantity: 15,
        description: {
          fr: "Fils dorés de luxe pour broderie et couture haute couture",
          ar: "خيوط ذهبية فاخرة للتطريز والخياطة الراقية"
        }
      },
      {
        id: "8",
        name: { fr: "Règle de couture graduée", ar: "مسطرة خياطة مدرجة" },
        price: 12.5,
        images: [
          "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg"
        ],
        rating: 4.1,
        reviews: 25,
        isNew: false,
        isOnSale: false,
        category: "Outils de couture",
        material: "Plastique",
        height: "50cm",
        color: "Transparent",
        inStock: true,
        quantity: 2,
        description: {
          fr: "Règle transparente graduée pour mesures précises en couture",
          ar: "مسطرة شفافة مدرجة للقياسات الدقيقة في الخياطة"
        }
      }
    ],
    []
  )

  // Obtenir les catégories uniques
  const categories = [...new Set(products.map((product) => product.category))]

  const filteredAndSortedProducts = useMemo(() => {
    const result = products.filter((product) => {
      // Filtre de recherche
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          product.name[currentLanguage].toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.material.toLowerCase().includes(searchLower) ||
          product.color.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Filtre par catégorie
      if (filters.category && product.category !== filters.category)
        return false

      // Filtre par statut
      switch (filters.status) {
        case "inStock":
          if (!product.inStock || product.quantity === 0) return false
          break
        case "outOfStock":
          if (product.inStock && product.quantity > 0) return false
          break
        case "lowStock":
          if (!product.inStock || product.quantity > 10) return false
          break
        case "new":
          if (!product.isNew) return false
          break
        case "onSale":
          if (!product.isOnSale) return false
          break
      }

      // Filtre par quantité
      if (
        filters.minQuantity &&
        product.quantity < parseInt(filters.minQuantity)
      )
        return false
      if (
        filters.maxQuantity &&
        product.quantity > parseInt(filters.maxQuantity)
      )
        return false

      return true
    })

    // Tri
    result.sort((a, b) => {
      let comparison = 0

      switch (sort.field) {
        case "name":
          comparison = a.name[currentLanguage].localeCompare(
            b.name[currentLanguage]
          )
          break
        case "price":
          comparison = a.price - b.price
          break
        case "quantity":
          comparison = a.quantity - b.quantity
          break
        case "rating":
          comparison = a.rating - b.rating
          break
        case "category":
          comparison = a.category.localeCompare(b.category)
          break
      }

      return sort.direction === "asc" ? comparison : -comparison
    })

    return result
  }, [products, filters, sort, currentLanguage])

  const handleSort = (field: SortState["field"]) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }))
  }

  const handleProductClick = (productId: string) => {
    // Simulation de navigation - en réalité vous utiliseriez React Router ou Next.js
    const currentUrl = window.location.href
    const newUrl = `${currentUrl}/${productId}`
    console.log(`Navigation vers: ${newUrl}`)

    // Pour la démo, on affiche juste une alerte
    alert(`Navigation vers le produit: /${productId}`)

    // En réalité, vous feriez quelque chose comme :
    // navigate(`/admin/products/${productId}`)
    // ou
    // router.push(`/admin/products/${productId}`)
  }

  const getStatusBadge = (product: Product) => {
    if (!product.inStock || product.quantity === 0) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="mr-1" size={12} />
          Rupture
        </span>
      )
    }

    if (product.quantity <= 10) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertTriangle className="mr-1" size={12} />
          Stock faible
        </span>
      )
    }

    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="mr-1" size={12} />
        En stock
      </span>
    )
  }

  const getSortIcon = (field: SortState["field"]) => {
    if (sort.field !== field) return <ArrowUpDown className="ml-1" size={14} />
    return sort.direction === "asc" ? (
      <ArrowUp className="ml-1" size={14} />
    ) : (
      <ArrowDown className="ml-1" size={14} />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* En-tête */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Package className="mr-3" size={28} />
                  Gestion des Produits
                </h1>
                <div className="text-sm text-gray-600 mt-1">
                  {filteredAndSortedProducts.length} produit
                  {filteredAndSortedProducts.length > 1 ? "s" : ""} •
                  {products.filter((p) => p.inStock && p.quantity > 0).length}{" "}
                  en stock •
                  {
                    products.filter((p) => !p.inStock || p.quantity === 0)
                      .length
                  }{" "}
                  en rupture
                </div>
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
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Filter className="mr-2" size={16} />
                  Filtres
                </button>
              </div>
            </div>
          </div>

          {/* Filtres */}
          {showFilters && (
            <div className="bg-gray-50 border-b p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recherche
                  </label>
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Nom, catégorie, matériau..."
                      value={filters.search}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          search: e.target.value
                        }))
                      }
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        category: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: e.target.value as FilterState["status"]
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="inStock">En stock</option>
                    <option value="outOfStock">En rupture</option>
                    <option value="lowStock">Stock faible (≤10)</option>
                    <option value="new">Nouveaux produits</option>
                    <option value="onSale">En promotion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité min
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minQuantity}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minQuantity: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité max
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    value={filters.maxQuantity}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxQuantity: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setFilters({
                      search: "",
                      category: "",
                      status: "all",
                      minQuantity: "",
                      maxQuantity: ""
                    })
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          )}

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center hover:text-gray-700"
                    >
                      Produit
                      {getSortIcon("name")}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("category")}
                      className="flex items-center hover:text-gray-700"
                    >
                      Catégorie
                      {getSortIcon("category")}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("price")}
                      className="flex items-center hover:text-gray-700"
                    >
                      Prix
                      {getSortIcon("price")}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("quantity")}
                      className="flex items-center hover:text-gray-700"
                    >
                      Stock
                      {getSortIcon("quantity")}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("rating")}
                      className="flex items-center hover:text-gray-700"
                    >
                      Note
                      {getSortIcon("rating")}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedProducts.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
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
                            <Package className="text-gray-400" size={20} />
                          </div>
                        )}
                        {product.isNew && (
                          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 rounded-bl">
                            NEW
                          </div>
                        )}
                        {product.isOnSale && (
                          <div className="absolute bottom-0 left-0 bg-red-500 text-white text-xs px-1 rounded-tr">
                            SALE
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name[currentLanguage]}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2 mt-1">
                          <span className="flex items-center">
                            <Layers className="mr-1" size={12} />
                            {product.material}
                          </span>
                          <span className="flex items-center">
                            <Palette className="mr-1" size={12} />
                            {product.color}
                          </span>
                          <span className="flex items-center">
                            <Ruler className="mr-1" size={12} />
                            {product.height}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <Tag className="mr-1" size={12} />
                        {product.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        {product.originalPrice && product.isOnSale ? (
                          <div>
                            <span className="text-sm font-bold text-green-600">
                              {product.price.toFixed(2)} DH
                            </span>
                            <div className="text-xs text-gray-500 line-through">
                              {product.originalPrice.toFixed(2)} DH
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-gray-900">
                            {product.price.toFixed(2)} DH
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {product.quantity}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star
                          className="text-yellow-400 mr-1"
                          size={14}
                          fill="currentColor"
                        />
                        <span className="text-sm text-gray-900">
                          {product.rating}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.reviews})
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(product)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleProductClick(product.id)
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Voir les détails"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            alert(`Modifier le produit ${product.id}`)
                          }}
                          className="text-gray-600 hover:text-gray-900"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Message si aucun produit */}
          {filteredAndSortedProducts.length === 0 && (
            <div className="p-8 text-center">
              <Package className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-500">
                Essayez de modifier vos filtres de recherche.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminProductsTable
