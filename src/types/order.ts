import { PackProduct } from "./pack"

export interface OrderItem {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  image: string
}

// Type pour les données envoyées lors de la création d'une commande
export interface OrderRequestBody {
  customerName: string
  city: string
  phoneNumber: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
}

// Type pour la réponse de l'API (utilisé dans les routes API)
export interface OrderResponse {
  success: boolean
  message?: string
  orderId?: string
  order?: OrderDocument
  orders?: OrderDocument[]
  errors?: string[]
}

// Type pour un document de commande dans MongoDB
export interface OrderDocument {
  _id: string
  customerName: string
  city: string
  phoneNumber: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: Date
  createdAt: Date
  updatedAt: Date
}

// Type pour les erreurs de validation
export interface ValidationError extends Error {
  name: "ValidationError"
  errors: {
    [key: string]: {
      message: string
    }
  }
}

// Types pour les produits individuels
export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
  discount?: string | null
  characteristic?: { name: string; value: string }[] | null
  type: "product"
}

// Types pour les packs

export interface OrderPack {
  id: string
  name: string
  quantity: number
  price: number
  discountPrice?: number
  image: string
  type: "pack"
  items: PackProduct[]
}

export type OrderLineItem = OrderItem | OrderPack

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  orderDate: Date
  status:
    | "pending"
    | "confirmed"
    | "rejected"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
  total: number
  paymentMethod: string
  shippingMethod: string
  items: OrderLineItem[]
  notes?: string
  coupon: string
}

export interface OrderFilterState {
  search: string
  status: string
  dateFrom: string
  dateTo: string
  minAmount: string
  maxAmount: string
  itemType: string
}

export interface SortState {
  field: "date" | "total" | "customerName" | "orderNumber"
  direction: "asc" | "desc"
}
