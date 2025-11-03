// import ShopContent from "@/components/shop/ShopContent"
// import { Product } from "@/types/product"

// const ShopPage: React.FC = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
//     cache: "no-store" // Pour toujours avoir les données à jour
//   })

//   const data = await res.json()

//   const products: Product[] = data?.products || []

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <ShopContent products={products} />
//       </div>
//     </div>
//   )
// }

// export default ShopPage

// // app/shop/page.tsx
// import ShopContent from "@/components/shop/ShopContent"
// import { Product } from "@/types/product"

// interface ShopPageProps {
//   searchParams: {
//     category?: string | string[]
//     characteristics?: string | string[]
//     minPrice?: string
//     maxPrice?: string
//     inStock?: string
//     onSale?: string
//     isNew?: string
//     sortBy?: string
//     page?: string
//     limit?: string
//   }
// }

// const ShopPage: React.FC<ShopPageProps> = async ({ searchParams }) => {
//   // Construire l'URL avec les paramètres de recherche
//   const params = new URLSearchParams()

//   // Ajouter les catégories
//   if (searchParams.category) {
//     const categories = Array.isArray(searchParams.category)
//       ? searchParams.category
//       : [searchParams.category]
//     categories.forEach((cat) => params.append("category", cat))
//   }

//   // Ajouter les caractéristiques
//   if (searchParams.characteristics) {
//     const chars = Array.isArray(searchParams.characteristics)
//       ? searchParams.characteristics
//       : [searchParams.characteristics]
//     chars.forEach((char) => params.append("characteristics", char))
//   }

//   // Ajouter les autres paramètres
//   if (searchParams.minPrice) params.append("minPrice", searchParams.minPrice)
//   if (searchParams.maxPrice) params.append("maxPrice", searchParams.maxPrice)
//   if (searchParams.inStock) params.append("inStock", searchParams.inStock)
//   if (searchParams.onSale) params.append("onSale", searchParams.onSale)
//   if (searchParams.isNew) params.append("isNew", searchParams.isNew)
//   if (searchParams.sortBy) params.append("sortBy", searchParams.sortBy)

//   // Pagination
//   params.append("page", searchParams.page || "1")
//   params.append("limit", searchParams.limit || "8")

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?${params.toString()}`,
//     {
//       cache: "no-store" // Pour toujours avoir les données à jour
//     }
//   )

//   const data = await res.json()

//   const products: Product[] = data?.products || []
//   const pagination = data?.pagination || {
//     page: 1,
//     limit: 12,
//     totalProducts: 0,
//     totalPages: 1,
//     hasNextPage: false,
//     hasPrevPage: false
//   }
//   console.log("produit shop page ", products)
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <ShopContent
//           products={products}
//           pagination={pagination}
//           initialFilters={{
//             category: Array.isArray(searchParams.category)
//               ? searchParams.category
//               : searchParams.category
//               ? [searchParams.category]
//               : [],
//             characteristics: Array.isArray(searchParams.characteristics)
//               ? searchParams.characteristics
//               : searchParams.characteristics
//               ? [searchParams.characteristics]
//               : [],
//             priceRange: [
//               searchParams.minPrice ? parseInt(searchParams.minPrice) : 0,
//               searchParams.maxPrice ? parseInt(searchParams.maxPrice) : 5000
//             ],
//             inStock: searchParams.inStock === "true",
//             onSale: searchParams.onSale === "true",
//             isNewCategory: searchParams.isNew === "true"
//           }}
//           initialSortBy={searchParams.sortBy || "newest"}
//         />
//       </div>
//     </div>
//   )
// }

// export default ShopPage

// app/[locale]/(client)/shop/page.tsx
import ShopContent from "@/components/shop/ShopContent"
import { Product } from "@/types/product"
import { ShopPageProps } from "@/types/shop"

const ShopPage = async ({ searchParams }: ShopPageProps) => {
  // ✅ Await the searchParams before using them
  const resolvedSearchParams = await searchParams

  const params = new URLSearchParams()

  if (resolvedSearchParams.category) {
    const categories = Array.isArray(resolvedSearchParams.category)
      ? resolvedSearchParams.category
      : [resolvedSearchParams.category]
    categories.forEach((cat) => params.append("category", cat))
  }

  if (resolvedSearchParams.characteristics) {
    const chars = Array.isArray(resolvedSearchParams.characteristics)
      ? resolvedSearchParams.characteristics
      : [resolvedSearchParams.characteristics]
    chars.forEach((char) => params.append("characteristics", char))
  }

  if (resolvedSearchParams.minPrice)
    params.append("minPrice", resolvedSearchParams.minPrice)
  if (resolvedSearchParams.maxPrice)
    params.append("maxPrice", resolvedSearchParams.maxPrice)
  if (resolvedSearchParams.inStock)
    params.append("inStock", resolvedSearchParams.inStock)
  if (resolvedSearchParams.onSale)
    params.append("onSale", resolvedSearchParams.onSale)
  if (resolvedSearchParams.isNew)
    params.append("isNew", resolvedSearchParams.isNew)
  if (resolvedSearchParams.sortBy)
    params.append("sortBy", resolvedSearchParams.sortBy)

  params.append("page", resolvedSearchParams.page || "1")
  params.append("limit", resolvedSearchParams.limit || "8")

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?${params.toString()}`,
    { cache: "no-store" }
  )

  const data = await res.json()
  const products: Product[] = data?.products || []
  const pagination = data?.pagination || {
    page: 1,
    limit: 12,
    totalProducts: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ShopContent
          products={products}
          pagination={pagination}
          initialFilters={{
            category: Array.isArray(resolvedSearchParams.category)
              ? resolvedSearchParams.category
              : resolvedSearchParams.category
              ? [resolvedSearchParams.category]
              : [],
            characteristics: Array.isArray(resolvedSearchParams.characteristics)
              ? resolvedSearchParams.characteristics
              : resolvedSearchParams.characteristics
              ? [resolvedSearchParams.characteristics]
              : [],
            priceRange: [
              resolvedSearchParams.minPrice
                ? parseInt(resolvedSearchParams.minPrice)
                : 0,
              resolvedSearchParams.maxPrice
                ? parseInt(resolvedSearchParams.maxPrice)
                : 5000
            ],
            inStock: resolvedSearchParams.inStock === "true",
            onSale: resolvedSearchParams.onSale === "true",
            isNewCategory: resolvedSearchParams.isNew === "true"
          }}
          initialSortBy={resolvedSearchParams.sortBy || "newest"}
        />
      </div>
    </div>
  )
}

export default ShopPage
