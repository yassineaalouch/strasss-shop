// "use client"

// import React, { useState, useMemo } from "react"
// import { Search, X } from "lucide-react"
// import ProductFilter from "./ProductFilter"
// import ProductSorter from "./ProductSorter"
// import ProductCard from "./ProductCard"
// import { FilterState, ShopContentProps } from "@/types/type"
// import { useLocale } from "next-intl"

// const ShopContent: React.FC<ShopContentProps> = ({ products }) => {
//   const [filters, setFilters] = useState<FilterState>({
//     category: [],
//     priceRange: [0, 5000],
//     material: [],
//     height: [],
//     color: [],
//     inStock: false,
//     onSale: false,
//     rating: 0
//   })

//   const [sortBy, setSortBy] = useState<string>("name-asc")
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
//   const [currentPage, setCurrentPage] = useState<number>(1)

//   const productsPerPage = 12

//   // Filtrage des produits avec useMemo
//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       // Filtre par catégorie
//       if (
//         filters.category.length > 0 &&
//         !filters.category.includes(product.category)
//       ) {
//         return false
//       }

//       // Filtre par prix
//       if (
//         product.price < filters.priceRange[0] ||
//         product.price > filters.priceRange[1]
//       ) {
//         return false
//       }

//       // Filtre par matériau
//       if (
//         filters.material.length > 0 &&
//         !filters.material.includes(product.material)
//       ) {
//         return false
//       }

//       // Filtre par hauteur
//       if (
//         filters.height.length > 0 &&
//         !filters.height.includes(product.height)
//       ) {
//         return false
//       }

//       // Filtre par couleur
//       if (filters.color.length > 0 && !filters.color.includes(product.color)) {
//         return false
//       }

//       // Filtre par stock
//       if (filters.inStock && !product.inStock) {
//         return false
//       }

//       // Filtre par promotion
//       if (filters.onSale && !product.isOnSale) {
//         return false
//       }

//       // Filtre par note
//       if (filters.rating > 0 && product.rating < filters.rating) {
//         return false
//       }

//       return true
//     })
//   }, [products, filters])

//   // Tri des produits avec useMemo
//   const locale = useLocale()

//   const sortedProducts = useMemo(() => {
//     const sorted = [...filteredProducts]

//     const nameKey: "fr" | "ar" = locale === "fr" ? "fr" : "ar"

//     switch (sortBy) {
//       case "name-asc":
//         return sorted.sort((a, b) =>
//           a.name[nameKey].localeCompare(b.name[nameKey])
//         )
//       case "name-desc":
//         return sorted.sort((a, b) =>
//           b.name[nameKey].localeCompare(a.name[nameKey])
//         )
//       case "price-asc":
//         return sorted.sort((a, b) => a.price - b.price)
//       case "price-desc":
//         return sorted.sort((a, b) => b.price - a.price)
//       case "rating-desc":
//         return sorted.sort((a, b) => b.rating - a.rating)
//       case "newest":
//         return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
//       default:
//         return sorted
//     }
//   }, [filteredProducts, sortBy, locale])

//   // Pagination
//   const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
//   const startIndex = (currentPage - 1) * productsPerPage
//   const paginatedProducts = sortedProducts.slice(
//     startIndex,
//     startIndex + productsPerPage
//   )

//   // Handlers
//   const handleFiltersChange = (newFilters: FilterState) => {
//     setFilters(newFilters)
//     setCurrentPage(1) // Reset pagination when filters change
//   }

//   const handleSortChange = (newSortBy: string) => {
//     setSortBy(newSortBy)
//     setCurrentPage(1) // Reset pagination when sorting changes
//   }

//   const handleViewModeChange = (mode: "grid" | "list") => {
//     setViewMode(mode)
//   }

//   const handleOpenFilters = () => {
//     setSidebarOpen(true)
//   }

//   const handleCloseFilters = () => {
//     setSidebarOpen(false)
//   }

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//   }

//   // Vérifier si des filtres sont actifs
//   const hasActiveFilters =
//     filters.category.length > 0 ||
//     filters.material.length > 0 ||
//     filters.height.length > 0 ||
//     filters.color.length > 0 ||
//     filters.inStock ||
//     filters.onSale ||
//     filters.rating > 0

//   return (
//     <div className="flex flex-col lg:flex-row gap-8">
//       {/* Sidebar Filtres */}
//       <ProductFilter
//         products={products}
//         filters={filters}
//         onFiltersChange={handleFiltersChange}
//         isOpen={sidebarOpen}
//         onClose={handleCloseFilters}
//       />

//       {/* Contenu Principal */}
//       <div className="flex-1">
//         {/* Header avec tri et contrôles */}
//         <ProductSorter
//           totalProducts={sortedProducts.length}
//           sortBy={sortBy}
//           onSortChange={handleSortChange}
//           viewMode={viewMode}
//           onViewModeChange={handleViewModeChange}
//           onOpenFilters={handleOpenFilters}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />

//         {/* Filtres actifs */}
//         {hasActiveFilters && (
//           <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//             <div className="flex flex-wrap items-center gap-2">
//               <span className="text-sm text-gray-600">Filtres actifs:</span>

//               {filters.category.map((category) => (
//                 <span
//                   key={category}
//                   className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center"
//                 >
//                   {category}
//                   <button
//                     onClick={() =>
//                       setFilters({
//                         ...filters,
//                         category: filters.category.filter((c) => c !== category)
//                       })
//                     }
//                     className="ml-1 hover:text-green-600"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               ))}

//               {filters.material.map((material) => (
//                 <span
//                   key={material}
//                   className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center"
//                 >
//                   {material}
//                   <button
//                     onClick={() =>
//                       setFilters({
//                         ...filters,
//                         material: filters.material.filter((m) => m !== material)
//                       })
//                     }
//                     className="ml-1 hover:text-blue-600"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               ))}

//               {filters.height.map((height) => (
//                 <span
//                   key={height}
//                   className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs flex items-center"
//                 >
//                   {height}
//                   <button
//                     onClick={() =>
//                       setFilters({
//                         ...filters,
//                         height: filters.height.filter((h) => h !== height)
//                       })
//                     }
//                     className="ml-1 hover:text-purple-600"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               ))}

//               {filters.color.map((color) => (
//                 <span
//                   key={color}
//                   className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs flex items-center"
//                 >
//                   {color}
//                   <button
//                     onClick={() =>
//                       setFilters({
//                         ...filters,
//                         color: filters.color.filter((c) => c !== color)
//                       })
//                     }
//                     className="ml-1 hover:text-yellow-600"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               ))}

//               {(filters.inStock || filters.onSale || filters.rating > 0) && (
//                 <button
//                   onClick={() =>
//                     setFilters({
//                       category: [],
//                       priceRange: [0, 5000],
//                       material: [],
//                       height: [],
//                       color: [],
//                       inStock: false,
//                       onSale: false,
//                       rating: 0
//                     })
//                   }
//                   className="text-sm text-red-600 hover:text-red-800 underline"
//                 >
//                   Tout effacer
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Grille/Liste de produits */}
//         {paginatedProducts.length > 0 ? (
//           <div
//             className={
//               viewMode === "grid"
//                 ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
//                 : "space-y-4"
//             }
//           >
//             {paginatedProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 viewMode={viewMode}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//             <div className="text-gray-400 mb-4">
//               <Search size={64} className="mx-auto" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               Aucun produit trouvé
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Essayez de modifier vos filtres ou votre recherche
//             </p>
//             <button
//               onClick={() =>
//                 setFilters({
//                   category: [],
//                   priceRange: [0, 5000],
//                   material: [],
//                   height: [],
//                   color: [],
//                   inStock: false,
//                   onSale: false,
//                   rating: 0
//                 })
//               }
//               className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//             >
//               Réinitialiser les filtres
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ShopContent
"use client"

import React, { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import ProductFilter from "./ProductFilter"
import ProductSorter from "./ProductSorter"
import ProductCard from "./ProductCard"
import { FilterState, ShopContentProps } from "@/types/type"

const ShopContent: React.FC<ShopContentProps> = ({ products }) => {
  const t = useTranslations("ShopPage.ShopContent")
  const locale = useLocale()

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
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    const nameKey: "fr" | "ar" = locale === "fr" ? "fr" : "ar"

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

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  )

  // Fonction pour réinitialiser tous les filtres
  const resetAllFilters = () => {
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
    setCurrentPage(1)
  }

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

  // Fonction pour supprimer un filtre spécifique
  const removeFilter = (type: keyof FilterState, value: string) => {
    const newFilters = { ...filters }

    if (Array.isArray(newFilters[type])) {
      ;(newFilters[type] as string[]) = (newFilters[type] as string[]).filter(
        (item) => item !== value
      )
    }

    handleFiltersChange(newFilters)
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
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Sidebar Filtres */}
      <ProductFilter
        products={products}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isOpen={sidebarOpen}
        onClose={handleCloseFilters}
      />

      {/* Contenu Principal */}
      <div className="flex-1 min-w-0">
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
              <span className="text-sm text-gray-600 font-medium">
                {t("activeFilters")}
              </span>

              {/* Filtres de catégorie */}
              {filters.category.map((category) => (
                <span
                  key={`category-${category}`}
                  className="bg-firstColor/10 text-firstColor px-3 py-1 rounded-full text-xs flex items-center border border-firstColor/20 transition-all duration-200 hover:bg-firstColor/20"
                >
                  {category}
                  <button
                    onClick={() => removeFilter("category", category)}
                    className="ml-2 hover:text-secondColor transition-colors duration-200"
                    aria-label={`Supprimer le filtre ${category}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {/* Filtres de matériau */}
              {filters.material.map((material) => (
                <span
                  key={`material-${material}`}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center border border-blue-200 transition-all duration-200 hover:bg-blue-100"
                >
                  {material}
                  <button
                    onClick={() => removeFilter("material", material)}
                    className="ml-2 hover:text-blue-900 transition-colors duration-200"
                    aria-label={`Supprimer le filtre ${material}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {/* Filtres de hauteur */}
              {filters.height.map((height) => (
                <span
                  key={`height-${height}`}
                  className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs flex items-center border border-purple-200 transition-all duration-200 hover:bg-purple-100"
                >
                  {height}
                  <button
                    onClick={() => removeFilter("height", height)}
                    className="ml-2 hover:text-purple-900 transition-colors duration-200"
                    aria-label={`Supprimer le filtre ${height}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {/* Filtres de couleur */}
              {filters.color.map((color) => (
                <span
                  key={`color-${color}`}
                  className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs flex items-center border border-yellow-200 transition-all duration-200 hover:bg-yellow-100"
                >
                  {color}
                  <button
                    onClick={() => removeFilter("color", color)}
                    className="ml-2 hover:text-yellow-900 transition-colors duration-200"
                    aria-label={`Supprimer le filtre ${color}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {/* Bouton tout effacer */}
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-sm text-red-600 hover:text-red-800 underline underline-offset-2 transition-colors duration-200 ml-2"
                >
                  {t("clearAll")}
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
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
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
          /* État vide avec design amélioré */
          <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center">
            <div className="text-gray-300 mb-6">
              <Search size={48} className="mx-auto sm:w-16 sm:h-16" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              {t("noProductsFound.title")}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {t("noProductsFound.description")}
            </p>
            <button
              onClick={resetAllFilters}
              className="bg-firstColor text-white px-6 py-3 rounded-lg hover:bg-secondColor transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t("noProductsFound.resetButton")}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopContent
