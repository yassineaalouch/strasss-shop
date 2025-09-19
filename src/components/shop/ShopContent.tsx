"use client"

import React, { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import ProductFilter from "./ProductFilter"
import ProductSorter from "./ProductSorter"
import ProductCard from "./ProductCard"
import { FilterState, ShopContentProps } from "@/types/type"
import { useLocale } from "next-intl"

const ShopContent: React.FC<ShopContentProps> = ({ products }) => {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [0, 5000],
    material: [],
    height: [],
    color: [],
    inStock: false,
    onSale: false,
    rating: 0
  })

  const [sortBy, setSortBy] = useState<string>("name-asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const productsPerPage = 12

  // Filtrage des produits avec useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filtre par catégorie
      if (
        filters.category.length > 0 &&
        !filters.category.includes(product.category)
      ) {
        return false
      }

      // Filtre par prix
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false
      }

      // Filtre par matériau
      if (
        filters.material.length > 0 &&
        !filters.material.includes(product.material)
      ) {
        return false
      }

      // Filtre par hauteur
      if (
        filters.height.length > 0 &&
        !filters.height.includes(product.height)
      ) {
        return false
      }

      // Filtre par couleur
      if (filters.color.length > 0 && !filters.color.includes(product.color)) {
        return false
      }

      // Filtre par stock
      if (filters.inStock && !product.inStock) {
        return false
      }

      // Filtre par promotion
      if (filters.onSale && !product.isOnSale) {
        return false
      }

      // Filtre par note
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false
      }

      return true
    })
  }, [products, filters])

  // Tri des produits avec useMemo
  const locale = useLocale()

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    const nameKey: "franshName" | "arabicName" =
      locale === "fr" ? "franshName" : "arabicName"

    switch (sortBy) {
      case "name-asc":
        return sorted.sort((a, b) =>
          a.name[nameKey].localeCompare(b.name[nameKey])
        )
      case "name-desc":
        return sorted.sort((a, b) =>
          b.name[nameKey].localeCompare(a.name[nameKey])
        )
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating-desc":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "newest":
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      default:
        return sorted
    }
  }, [filteredProducts, sortBy, locale])

  // const sortedProducts = useMemo(() => {
  //   const sorted = [...filteredProducts]

  //   switch (sortBy) {
  //     case "name-asc":
  //       return sorted.sort((a, b) => a.name.localeCompare(b.name.franshName))
  //     case "name-desc":
  //       return sorted.sort((a, b) => b.name.localeCompare(a.name.franshName))
  //     case "price-asc":
  //       return sorted.sort((a, b) => a.price - b.price)
  //     case "price-desc":
  //       return sorted.sort((a, b) => b.price - a.price)
  //     case "rating-desc":
  //       return sorted.sort((a, b) => b.rating - a.rating)
  //     case "newest":
  //       return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  //     default:
  //       return sorted
  //   }
  // }, [filteredProducts, sortBy])

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  )

  // Handlers
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset pagination when filters change
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
    setCurrentPage(1) // Reset pagination when sorting changes
  }

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode)
  }

  const handleOpenFilters = () => {
    setSidebarOpen(true)
  }

  const handleCloseFilters = () => {
    setSidebarOpen(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Vérifier si des filtres sont actifs
  const hasActiveFilters =
    filters.category.length > 0 ||
    filters.material.length > 0 ||
    filters.height.length > 0 ||
    filters.color.length > 0 ||
    filters.inStock ||
    filters.onSale ||
    filters.rating > 0

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filtres */}
      <ProductFilter
        products={products}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isOpen={sidebarOpen}
        onClose={handleCloseFilters}
      />

      {/* Contenu Principal */}
      <div className="flex-1">
        {/* Header avec tri et contrôles */}
        <ProductSorter
          totalProducts={sortedProducts.length}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onOpenFilters={handleOpenFilters}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Filtres actifs */}
        {hasActiveFilters && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Filtres actifs:</span>

              {filters.category.map((category) => (
                <span
                  key={category}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center"
                >
                  {category}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        category: filters.category.filter((c) => c !== category)
                      })
                    }
                    className="ml-1 hover:text-green-600"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {filters.material.map((material) => (
                <span
                  key={material}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center"
                >
                  {material}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        material: filters.material.filter((m) => m !== material)
                      })
                    }
                    className="ml-1 hover:text-blue-600"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {filters.height.map((height) => (
                <span
                  key={height}
                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs flex items-center"
                >
                  {height}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        height: filters.height.filter((h) => h !== height)
                      })
                    }
                    className="ml-1 hover:text-purple-600"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {filters.color.map((color) => (
                <span
                  key={color}
                  className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs flex items-center"
                >
                  {color}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        color: filters.color.filter((c) => c !== color)
                      })
                    }
                    className="ml-1 hover:text-yellow-600"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {(filters.inStock || filters.onSale || filters.rating > 0) && (
                <button
                  onClick={() =>
                    setFilters({
                      category: [],
                      priceRange: [0, 5000],
                      material: [],
                      height: [],
                      color: [],
                      inStock: false,
                      onSale: false,
                      rating: 0
                    })
                  }
                  className="text-sm text-red-600 hover:text-red-800 underline"
                >
                  Tout effacer
                </button>
              )}
            </div>
          </div>
        )}

        {/* Grille/Liste de produits */}
        {paginatedProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos filtres ou votre recherche
            </p>
            <button
              onClick={() =>
                setFilters({
                  category: [],
                  priceRange: [0, 5000],
                  material: [],
                  height: [],
                  color: [],
                  inStock: false,
                  onSale: false,
                  rating: 0
                })
              }
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopContent
