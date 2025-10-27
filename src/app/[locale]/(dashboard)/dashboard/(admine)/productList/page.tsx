"use client"

import React, { useState, useMemo, useEffect } from "react"
import {
  Package,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Tag,
  Trash2,
  Loader2,
  RotateCcw
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Product, ProductFilterState, ProductSortState } from "@/types/product"

const AdminProductsTable: React.FC = () => {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState<"fr" | "ar">("fr")
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<ProductFilterState>({
    search: "",
    category: "",
    discount: "",
    status: "all",
    minQuantity: "",
    maxQuantity: ""
  })

  const [sort, setSort] = useState<ProductSortState>({
    field: "name",
    direction: "asc"
  })

  // Charger les produits
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/products")
      if (response.data.success) {
        setProducts(response.data.products)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des produits:", error)
      alert("Erreur lors du chargement des produits")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return
    }

    try {
      const response = await axios.delete(`/api/products/${productId}`)

      if (response.data.success) {
        alert("Produit supprimé avec succès")
        await fetchProducts()
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        alert(error.response.data.message)
      } else {
        alert("Erreur lors de la suppression du produit")
      }
    }
  }

  // Obtenir les catégories uniques
  // const categories = [...new Set(products.map((product) => product.category))]
  const uniqueCategoriesMap = new Map()

  products.forEach((product) => {
    if (product.category && product.category._id) {
      uniqueCategoriesMap.set(product.category._id.toString(), product.category)
    }
  })

  const categories = [...uniqueCategoriesMap.values()]

  const uniqueDiscountMap = new Map()

  products.forEach((product) => {
    if (product.discount && product.discount._id) {
      uniqueDiscountMap.set(product.discount._id.toString(), product.discount)
    }
  })

  const discounts = [...uniqueDiscountMap.values()]
  // const discounts = [...new Set(products.map((product) => product.discount))]

  const filteredAndSortedProducts = useMemo(() => {
    const result = products.filter((product) => {
      // Filtre de recherche
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          product.name["fr"].toLowerCase().includes(searchLower) ||
          product.name["ar"].toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Filtre par catégorie
      if (
        filters.category &&
        product.category?.name[currentLanguage] !== filters.category
      )
        return false
      // Filtre par descount
      if (
        filters.discount &&
        product.discount?.name[currentLanguage] !== filters.discount
      )
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
          if (!product.isNewProduct) return false
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

        case "category":
          // Vérifier si les catégories existent avant de comparer
          const categoryA = a.category?.name?.[currentLanguage] || ""
          const categoryB = b.category?.name?.[currentLanguage] || ""

          // Si les deux sont vides, égalité (0)
          if (!categoryA && !categoryB) comparison = 0
          // Si A n’a pas de catégorie, on le met après B
          else if (!categoryA) comparison = 1
          // Si B n’a pas de catégorie, on le met après A
          else if (!categoryB) comparison = -1
          else comparison = categoryA.localeCompare(categoryB)
          break

        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }

      // Si tu veux trier en ordre décroissant selon ton "sort.order"
      return sort.direction === "desc" ? -comparison : comparison
    })

    return result
  }, [products, filters, sort, currentLanguage])

  const handleSort = (field: ProductSortState["field"]) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }))
  }

  const handleProductClick = (productId: string) => {
    router.push(`/dashboard/productList/${productId}`)
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

  const getSortIcon = (field: ProductSortState["field"]) => {
    if (sort.field !== field) return <ArrowUpDown className="ml-1" size={14} />
    return sort.direction === "asc" ? (
      <ArrowUp className="ml-1" size={14} />
    ) : (
      <ArrowDown className="ml-1" size={14} />
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className="animate-spin mx-auto mb-4 text-blue-500"
            size={48}
          />
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
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
                  className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  <Filter className="mr-2" size={16} />
                  Filtres
                </button>

                <button
                  onClick={() => router.push("/dashboard/productList/add")}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Package className="mr-2" size={16} />
                  Ajouter un produit
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
                      placeholder="Nom"
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
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <option
                          key={category?._id}
                          value={category?.name[currentLanguage]}
                        >
                          {category?.name[currentLanguage]}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solde
                  </label>
                  <select
                    value={filters.discount}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        discount: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Toutes les catégories</option>
                    {discounts.length > 0 &&
                      discounts.map((discount) => (
                        <option
                          key={discount?._id}
                          value={discount?.name[currentLanguage]}
                        >
                          {discount?.name[currentLanguage]}
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
                        status: e.target.value as ProductFilterState["status"]
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
                      discount: "",
                      status: "all",
                      minQuantity: "",
                      maxQuantity: ""
                    })
                  }}
                  className="
                            flex items-center gap-1.5 
                            px-4 py-2 cursor-pointer
                            text-sm font-semibold text-gray-500 
                            border bg-gray-100 border-transparent rounded-lg 
                            hover:bg-gray-200 hover:text-gray-700 
                            focus:outline-none focus:ring-2 focus:ring-gray-100 transition-colors duration-200"
                >
                  <RotateCcw className="h-4 w-4" />
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
                      onClick={() => handleSort("discount")}
                      className="flex items-center hover:text-gray-700"
                    >
                      Solde
                      {getSortIcon("discount")}
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
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
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
                        {product.isNewProduct && (
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
                      <div className="text-sm font-medium text-gray-900">
                        {product.name[currentLanguage]}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {product?.category?.name ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <Tag className="mr-1" size={12} />
                          {product.category.name?.[currentLanguage] ?? "---"}
                        </span>
                      ) : (
                        "---"
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {product?.discount?.name ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <Tag className="mr-1" size={12} />
                          {product.discount.name?.[currentLanguage] ?? "---"}
                        </span>
                      ) : (
                        "---"
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        {product.originalPrice ? (
                          <div>
                            <span className="text-sm font-bold text-green-600">
                              {product.price.toFixed(2)} MAD
                            </span>
                            <div className="text-xs text-gray-500 line-through">
                              {product.originalPrice.toFixed(2)} MAD
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-gray-900">
                            {product.price.toFixed(2)} MAD
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
                      {getStatusBadge(product)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleProductClick(product._id)
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Voir les détails"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/dashboard/productList/${product._id}`)
                          }}
                          className="text-gray-600 hover:text-gray-900"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteProduct(product._id)
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
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
                Essayez de modifier vos filtres de recherche ou ajoutez votre
                premier produit.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminProductsTable
