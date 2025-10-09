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
