// lib/packUtils.ts
import axios, { AxiosError } from "axios"

interface Product {
  _id: string
  name: {
    fr: string
    ar: string
  }
  description: {
    fr: string
    ar: string
  }
  price: number
  originalPrice?: number
  images: string[]
  category?: any
  inStock: boolean
  quantity: number
}

interface PackItem {
  productId: string
  quantity: number
  product?: Product
}

interface Pack {
  _id: string
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

/**
 * Récupère les détails d'un produit par son ID avec Axios
 */
async function fetchProductDetails(productId: string): Promise<Product | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

    const { data } = await axios.get<{ success: boolean; product: Product }>(
      `${apiUrl}/api/products/${productId}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    return data.success ? data.product : null
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>
      console.error(
        `Erreur lors de la récupération du produit ${productId}:`,
        axiosError.response?.data?.message || axiosError.message
      )
    } else {
      console.error(
        `Erreur inattendue lors de la récupération du produit ${productId}:`,
        (error as Error).message
      )
    }
    return null
  }
}

/**
 * Enrichit un pack avec les détails complets des produits inclus
 */
export async function enrichPackWithProducts(pack: Pack): Promise<Pack> {
  const enrichedItems = await Promise.all(
    pack.items.map(async (item) => {
      const product = await fetchProductDetails(item.productId)
      return {
        ...item,
        product: product || undefined
      }
    })
  )

  return {
    ...pack,
    items: enrichedItems
  }
}

/**
 * Enrichit plusieurs packs avec les détails des produits
 */
export async function enrichPacksWithProducts(packs: Pack[]): Promise<Pack[]> {
  return Promise.all(packs.map((pack) => enrichPackWithProducts(pack)))
}

/**
 * Calcule le prix total réel basé sur les produits actuels
 */
export function calculatePackRealPrice(pack: Pack): number {
  return pack.items.reduce((total, item) => {
    if (item.product) {
      return total + item.product.price * item.quantity
    }
    return total
  }, 0)
}

/**
 * Vérifie si tous les produits du pack sont en stock
 */
export function isPackAvailable(pack: Pack): boolean {
  return pack.items.every((item) => {
    if (!item.product) return false
    return item.product.inStock && item.product.quantity >= item.quantity
  })
}

/**
 * Obtient la liste des produits en rupture de stock dans le pack
 */
export function getOutOfStockProducts(pack: Pack): Product[] {
  return pack.items
    .filter((item) => {
      if (!item.product) return false
      return !item.product.inStock || item.product.quantity < item.quantity
    })
    .map((item) => item.product!)
    .filter(Boolean)
}
