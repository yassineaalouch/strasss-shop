// // "use client"

// // import React, { useState, useMemo } from "react"
// // import { Search, X } from "lucide-react"
// // import { useTranslations, useLocale } from "next-intl"
// // import ProductFilter from "./ProductFilter"
// // import ProductSorter from "./ProductSorter"
// // import ProductCard from "./ProductCard"
// // import { FilterState, ShopContentProps } from "@/types/type"

// // const ShopContent: React.FC<ShopContentProps> = ({ products }) => {
// //   const t = useTranslations("ShopPage.ShopContent")
// //   const locale = useLocale() as "ar" | "fr"

// //   const [filters, setFilters] = useState<FilterState>({
// //     category: [],
// //     priceRange: [0, 5000],
// //     inStock: false,
// //     onSale: false,
// //     rating: 0
// //   })

// //   const [sortBy, setSortBy] = useState<string>("name-asc")
// //   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
// //   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
// //   const [currentPage, setCurrentPage] = useState<number>(1)

// //   const productsPerPage = 12

// //   // Filtrage des produits avec useMemo
// //   const filteredProducts = useMemo(() => {
// //     return products.filter((product) => {
// //       // Filtre par catégorie
// //       if (
// //         filters.category.length > 0 &&
// //         !filters.category.includes(product.category?.name[locale] ?? "")
// //       ) {
// //         return false
// //       }

// //       // Filtre par prix
// //       if (
// //         product.price < filters.priceRange[0] ||
// //         product.price > filters.priceRange[1]
// //       ) {
// //         return false
// //       }

// //       // Filtre par stock
// //       if (filters.inStock && !product.inStock) {
// //         return false
// //       }

// //       // Filtre par promotion
// //       if (filters.onSale && !product.isOnSale) {
// //         return false
// //       }

// //       return true
// //     })
// //   }, [products, filters])

// //   // Tri des produits avec useMemo
// //   const sortedProducts = useMemo(() => {
// //     const sorted = [...filteredProducts]

// //     const nameKey: "fr" | "ar" = locale === "fr" ? "fr" : "ar"

// //     switch (sortBy) {
// //       case "name-asc":
// //         return sorted.sort((a, b) =>
// //           a.name[nameKey].localeCompare(b.name[nameKey])
// //         )
// //       case "name-desc":
// //         return sorted.sort((a, b) =>
// //           b.name[nameKey].localeCompare(a.name[nameKey])
// //         )
// //       case "price-asc":
// //         return sorted.sort((a, b) => a.price - b.price)
// //       case "price-desc":
// //         return sorted.sort((a, b) => b.price - a.price)
// //       case "newest":
// //         return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
// //       default:
// //         return sorted
// //     }
// //   }, [filteredProducts, sortBy, locale])

// //   // Pagination
// //   const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
// //   const startIndex = (currentPage - 1) * productsPerPage
// //   const paginatedProducts = sortedProducts.slice(
// //     startIndex,
// //     startIndex + productsPerPage
// //   )

// //   // Fonction pour réinitialiser tous les filtres
// //   const resetAllFilters = () => {
// //     setFilters({
// //       category: [],
// //       priceRange: [0, 5000],
// //       material: [],
// //       height: [],
// //       color: [],
// //       inStock: false,
// //       onSale: false,
// //       rating: 0
// //     })
// //     setCurrentPage(1)
// //   }

// //   // Handlers
// //   const handleFiltersChange = (newFilters: FilterState) => {
// //     setFilters(newFilters)
// //     setCurrentPage(1) // Reset pagination when filters change
// //   }

// //   const handleSortChange = (newSortBy: string) => {
// //     setSortBy(newSortBy)
// //     setCurrentPage(1) // Reset pagination when sorting changes
// //   }

// //   const handleViewModeChange = (mode: "grid" | "list") => {
// //     setViewMode(mode)
// //   }

// //   const handleOpenFilters = () => {
// //     setSidebarOpen(true)
// //   }

// //   const handleCloseFilters = () => {
// //     setSidebarOpen(false)
// //   }

// //   const handlePageChange = (page: number) => {
// //     setCurrentPage(page)
// //   }

// //   // Fonction pour supprimer un filtre spécifique
// //   const removeFilter = (type: keyof FilterState, value: string) => {
// //     const newFilters = { ...filters }

// //     if (Array.isArray(newFilters[type])) {
// //       ;(newFilters[type] as string[]) = (newFilters[type] as string[]).filter(
// //         (item) => item !== value
// //       )
// //     }

// //     handleFiltersChange(newFilters)
// //   }

// //   // Vérifier si des filtres sont actifs
// //   const hasActiveFilters =
// //     filters.category.length > 0 ||
// //     filters.inStock ||
// //     filters.onSale ||
// //     filters.rating > 0

// //   return (
// //     <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
// //       {/* Sidebar Filtres */}
// //       <ProductFilter
// //         products={products}
// //         filters={filters}
// //         onFiltersChange={handleFiltersChange}
// //         isOpen={sidebarOpen}
// //         onClose={handleCloseFilters}
// //       />

// //       {/* Contenu Principal */}
// //       <div className="flex-1 min-w-0">
// //         {/* Header avec tri et contrôles */}
// //         <ProductSorter
// //           totalProducts={sortedProducts.length}
// //           sortBy={sortBy}
// //           onSortChange={handleSortChange}
// //           viewMode={viewMode}
// //           onViewModeChange={handleViewModeChange}
// //           onOpenFilters={handleOpenFilters}
// //           currentPage={currentPage}
// //           totalPages={totalPages}
// //           onPageChange={handlePageChange}
// //         />

// //         {/* Filtres actifs */}
// //         {hasActiveFilters && (
// //           <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// //             <div className="flex flex-wrap items-center gap-2">
// //               <span className="text-sm text-gray-600 font-medium">
// //                 {t("activeFilters")}
// //               </span>

// //               {/* Filtres de catégorie */}
// //               {filters.category.map((category) => (
// //                 <span
// //                   key={`category-${category}`}
// //                   className="bg-firstColor/10 text-firstColor px-3 py-1 rounded-full text-xs flex items-center border border-firstColor/20 transition-all duration-200 hover:bg-firstColor/20"
// //                 >
// //                   {category}
// //                   <button
// //                     onClick={() => removeFilter("category", category)}
// //                     className="ml-2 hover:text-secondColor transition-colors duration-200"
// //                     aria-label={`Supprimer le filtre ${category}`}
// //                   >
// //                     <X size={12} />
// //                   </button>
// //                 </span>
// //               ))}

// //               {/* Filtres de matériau */}
// //               {filters.material.map((material) => (
// //                 <span
// //                   key={`material-${material}`}
// //                   className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center border border-blue-200 transition-all duration-200 hover:bg-blue-100"
// //                 >
// //                   {material}
// //                   <button
// //                     onClick={() => removeFilter("material", material)}
// //                     className="ml-2 hover:text-blue-900 transition-colors duration-200"
// //                     aria-label={`Supprimer le filtre ${material}`}
// //                   >
// //                     <X size={12} />
// //                   </button>
// //                 </span>
// //               ))}

// //               {/* Filtres de hauteur */}
// //               {filters.height.map((height) => (
// //                 <span
// //                   key={`height-${height}`}
// //                   className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs flex items-center border border-purple-200 transition-all duration-200 hover:bg-purple-100"
// //                 >
// //                   {height}
// //                   <button
// //                     onClick={() => removeFilter("height", height)}
// //                     className="ml-2 hover:text-purple-900 transition-colors duration-200"
// //                     aria-label={`Supprimer le filtre ${height}`}
// //                   >
// //                     <X size={12} />
// //                   </button>
// //                 </span>
// //               ))}

// //               {/* Filtres de couleur */}
// //               {filters.color.map((color) => (
// //                 <span
// //                   key={`color-${color}`}
// //                   className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs flex items-center border border-yellow-200 transition-all duration-200 hover:bg-yellow-100"
// //                 >
// //                   {color}
// //                   <button
// //                     onClick={() => removeFilter("color", color)}
// //                     className="ml-2 hover:text-yellow-900 transition-colors duration-200"
// //                     aria-label={`Supprimer le filtre ${color}`}
// //                   >
// //                     <X size={12} />
// //                   </button>
// //                 </span>
// //               ))}

// //               {/* Bouton tout effacer */}
// //               {hasActiveFilters && (
// //                 <button
// //                   onClick={resetAllFilters}
// //                   className="text-sm text-red-600 hover:text-red-800 underline underline-offset-2 transition-colors duration-200 ml-2"
// //                 >
// //                   {t("clearAll")}
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Grille/Liste de produits */}
// //         {paginatedProducts.length > 0 ? (
// //           <div
// //             className={
// //               viewMode === "grid"
// //                 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
// //                 : "space-y-4"
// //             }
// //           >
// //             {paginatedProducts.map((product, index) => (
// //               <ProductCard key={index} product={product} viewMode={viewMode} />
// //             ))}
// //           </div>
// //         ) : (
// //           /* État vide avec design amélioré */
// //           <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center">
// //             <div className="text-gray-300 mb-6">
// //               <Search size={48} className="mx-auto sm:w-16 sm:h-16" />
// //             </div>
// //             <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
// //               {t("noProductsFound.title")}
// //             </h3>
// //             <p className="text-gray-600 mb-6 max-w-md mx-auto">
// //               {t("noProductsFound.description")}
// //             </p>
// //             <button
// //               onClick={resetAllFilters}
// //               className="bg-firstColor text-white px-6 py-3 rounded-lg hover:bg-secondColor transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
// //             >
// //               {t("noProductsFound.resetButton")}
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// // export default ShopContent
// "use client"

// import React, { useState, useMemo } from "react"
// import { Search, X } from "lucide-react"
// import { useTranslations, useLocale } from "next-intl"
// import ProductFilter from "./ProductFilter"
// import ProductSorter from "./ProductSorter"
// import ProductCard from "./ProductCard"
// import { Product } from "@/types/product"

// export interface FilterState {
//   category: string[]
//   priceRange: [number, number]
//   characteristics: string[]
//   inStock: boolean
//   onSale: boolean
//   isNewCategory: boolean
// }

// interface ShopContentProps {
//   products: Product[]
// }

// const ShopContent: React.FC<ShopContentProps> = ({ products }) => {
//   const t = useTranslations("ShopPage.ShopContent")
//   const locale = useLocale() as "ar" | "fr"

//   // 🎯 États
//   const [filters, setFilters] = useState<FilterState>({
//     category: [],
//     priceRange: [0, 5000],
//     characteristics: [],
//     inStock: false,
//     onSale: false,
//     isNewCategory: false
//   })
//   const [sortBy, setSortBy] = useState<string>("name-asc")
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
//   const [currentPage, setCurrentPage] = useState<number>(1)
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

//   const productsPerPage = 12

//   // 🧠 Filtrage
//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       // Catégorie
//       if (
//         filters.category.length > 0 &&
//         !filters.category.includes(product.category?.name?.[locale] ?? "")
//       ) {
//         return false
//       }

//       // Caractéristiques
//       if (filters.characteristics.length > 0) {
//         const allValues = product.Characteristic?.flatMap((char) =>
//           char.values.map((val) => val[locale])
//         )

//         if (
//           !filters.characteristics.some((selected) =>
//             allValues?.includes(selected)
//           )
//         ) {
//           return false
//         }
//       }

//       // Prix
//       if (
//         product.price < filters.priceRange[0] ||
//         product.price > filters.priceRange[1]
//       ) {
//         return false
//       }

//       // Stock
//       if (filters.inStock && !product.inStock) return false

//       // Solde
//       if (filters.onSale && !product.isOnSale) return false

//       // Nouveauté
//       if (filters.isNewCategory && !product.isNewProduct) return false

//       return true
//     })
//   }, [products, filters, locale])

//   // 🔽 Tri
//   const sortedProducts = useMemo(() => {
//     const sorted = [...filteredProducts]
//     const key: "fr" | "ar" = locale === "fr" ? "fr" : "ar"

//     switch (sortBy) {
//       case "name-asc":
//         return sorted.sort((a, b) => a.name[key].localeCompare(b.name[key]))
//       case "name-desc":
//         return sorted.sort((a, b) => b.name[key].localeCompare(a.name[key]))
//       case "price-asc":
//         return sorted.sort((a, b) => a.price - b.price)
//       case "price-desc":
//         return sorted.sort((a, b) => b.price - a.price)
//       default:
//         return sorted
//     }
//   }, [filteredProducts, sortBy, locale])

//   // 📄 Pagination
//   const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
//   const startIndex = (currentPage - 1) * productsPerPage
//   const paginatedProducts = sortedProducts.slice(
//     startIndex,
//     startIndex + productsPerPage
//   )

//   // 🧹 Réinitialiser
//   const resetAllFilters = () => {
//     setFilters({
//       category: [],
//       priceRange: [0, 5000],
//       characteristics: [],
//       inStock: false,
//       onSale: false,
//       isNewCategory: false
//     })
//     setCurrentPage(1)
//   }

//   // Handlers
//   const handleFiltersChange = (newFilters: FilterState) => {
//     setFilters(newFilters)
//     setCurrentPage(1)
//   }

//   const handleSortChange = (newSortBy: string) => setSortBy(newSortBy)
//   const handleViewModeChange = (mode: "grid" | "list") => setViewMode(mode)
//   const handlePageChange = (page: number) => setCurrentPage(page)

//   const hasActiveFilters =
//     filters.category.length > 0 ||
//     filters.characteristics.length > 0 ||
//     filters.inStock ||
//     filters.onSale ||
//     filters.isNewCategory

//   // 🧩 Suppression filtre

//   const removeFilter = (
//     type: "category" | "characteristics",
//     value: string
//   ) => {
//     const updated = { ...filters }
//     updated[type] = updated[type].filter((v) => v !== value)
//     setFilters(updated)
//   }
//   return (
//     <div className="flex flex-col lg:flex-row gap-6">
//       {/* 🧱 Sidebar Filtres */}
//       <ProductFilter
//         filters={filters}
//         onFiltersChange={handleFiltersChange}
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />

//       {/* 🏬 Contenu Principal */}
//       <div className="flex-1 min-w-0">
//         <ProductSorter
//           totalProducts={sortedProducts.length}
//           sortBy={sortBy}
//           onSortChange={handleSortChange}
//           viewMode={viewMode}
//           onViewModeChange={handleViewModeChange}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//           onOpenFilters={() => setSidebarOpen(true)}
//         />

//         {/* Filtres actifs */}
//         {hasActiveFilters && (
//           <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-2">
//             {filters.category.map((cat) => (
//               <span
//                 key={cat}
//                 className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs flex items-center"
//               >
//                 {cat}
//                 <button onClick={() => removeFilter("category", cat)}>
//                   <X size={12} className="ml-2" />
//                 </button>
//               </span>
//             ))}

//             {filters.characteristics.map((char) => (
//               <span
//                 key={char}
//                 className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs flex items-center"
//               >
//                 {char}
//                 <button onClick={() => removeFilter("characteristics", char)}>
//                   <X size={12} className="ml-2" />
//                 </button>
//               </span>
//             ))}

//             {(filters.inStock || filters.onSale || filters.isNewCategory) && (
//               <button
//                 onClick={resetAllFilters}
//                 className="text-sm text-red-600 hover:text-red-800 underline"
//               >
//                 {t("clearAll")}
//               </button>
//             )}
//           </div>
//         )}

//         {/* Liste des produits */}
//         {paginatedProducts.length > 0 ? (
//           <div
//             className={
//               viewMode === "grid"
//                 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//                 : "space-y-4"
//             }
//           >
//             {paginatedProducts.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//                 viewMode={viewMode}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow p-8 text-center">
//             <Search size={48} className="mx-auto text-gray-400 mb-4" />
//             <p className="text-gray-600 mb-4">
//               {t("noProductsFound.description")}
//             </p>
//             <button
//               onClick={resetAllFilters}
//               className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//             >
//               {t("noProductsFound.resetButton")}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ShopContent

"use client"

import React, { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import ProductCard from "./ProductCard"
import ProductFilter from "./ProductFilter"
import ProductSorter from "./ProductSorter"
import { ShopFilters } from "@/types/shopFilter"
import { ShopContentProps } from "@/types/type"

const ShopContent: React.FC<ShopContentProps> = ({
  products,
  pagination,
  initialFilters,
  initialSortBy
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const [filters, setFilters] = useState<ShopFilters>(initialFilters)
  const [sortBy, setSortBy] = useState(initialSortBy)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Fonction pour construire l'URL avec les paramètres
  const buildUrl = (
    newFilters?: ShopFilters,
    newSortBy?: string,
    newPage?: number
  ) => {
    const params = new URLSearchParams()

    const currentFilters = newFilters || filters
    const currentSort = newSortBy || sortBy
    const currentPage = newPage || pagination.page

    // Ajouter les filtres
    currentFilters.category.forEach((cat) => params.append("category", cat))
    currentFilters.characteristics.forEach((char) =>
      params.append("characteristics", char)
    )

    if (currentFilters.priceRange[0] > 0) {
      params.append("minPrice", currentFilters.priceRange[0].toString())
    }
    if (currentFilters.priceRange[1] < 5000) {
      params.append("maxPrice", currentFilters.priceRange[1].toString())
    }

    if (currentFilters.inStock) params.append("inStock", "true")
    if (currentFilters.onSale) params.append("onSale", "true")
    if (currentFilters.isNewCategory) params.append("isNew", "true")

    // Ajouter le tri
    if (currentSort !== "newest") {
      params.append("sortBy", currentSort)
    }

    // Ajouter la pagination
    if (currentPage !== 1) {
      params.append("page", currentPage.toString())
    }

    return params.toString()
  }

  // Gérer les changements de filtres
  const handleFiltersChange = (newFilters: ShopFilters) => {
    setFilters(newFilters)
    const url = buildUrl(newFilters, sortBy, 1) // Reset to page 1 on filter change
    window.scrollTo({ top: 0, behavior: "smooth" }) // scroll smooth
    router.push(`${pathname}${url ? `?${url}` : ""}`)
  }

  // Gérer le changement de tri
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
    const url = buildUrl(filters, newSortBy, 1) // Reset to page 1 on sort change
    router.push(`${pathname}${url ? `?${url}` : ""}`)
  }

  // Gérer le changement de page
  const handlePageChange = (newPage: number) => {
    const url = buildUrl(filters, sortBy, newPage)
    router.push(`${pathname}${url ? `?${url}` : ""}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 relative">
      {/* Filtres - Sidebar */}
      <aside className="lg:w-80 flex-shrink-0">
        <ProductFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </aside>

      {/* Contenu principal */}
      <main className="flex-1">
        {/* Barre de tri et contrôles */}
        <ProductSorter
          totalProducts={pagination.totalProducts}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenFilters={() => setIsFilterOpen(true)}
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />

        {/* Grille de produits ou message vide */}
        {products.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4"
                : "flex flex-col space-y-4"
            }
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 sm:w-24 sm:h-24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-sm sm:text-base text-gray-500 text-center max-w-md px-4">
              Essayez de modifier vos filtres ou de rechercher autre chose
            </p>
            <button
              onClick={() =>
                handleFiltersChange({
                  category: [],
                  priceRange: [0, 5000],
                  characteristics: [],
                  inStock: false,
                  onSale: false,
                  isNewCategory: false
                })
              }
              className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-firstColor text-white rounded-lg hover:bg-secondColor transition-colors duration-200"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Pagination en bas si plusieurs pages */}
        {products.length > 0 && pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() =>
                  handlePageChange(Math.max(1, pagination.page - 1))
                }
                disabled={!pagination.hasPrevPage}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  !pagination.hasPrevPage
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Précédent
              </button>

              <div className="flex items-center space-x-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    const pageNum =
                      pagination.page <= 3 ? i + 1 : pagination.page - 2 + i
                    if (pageNum > pagination.totalPages) return null

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          pagination.page === pageNum
                            ? "bg-firstColor text-white shadow-md"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  }
                )}
              </div>

              <button
                onClick={() =>
                  handlePageChange(
                    Math.min(pagination.totalPages, pagination.page + 1)
                  )
                }
                disabled={!pagination.hasNextPage}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  !pagination.hasNextPage
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Suivant
              </button>
            </nav>
          </div>
        )}
      </main>
    </div>
  )
}

export default ShopContent
