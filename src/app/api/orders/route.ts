import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Order from "@/models/Order"
import { sendOrderEmail } from "@/lib/nodemailer"
import { OrderRequestBody } from "@/types/order"

// Types pour les données de commande

interface ValidationError extends Error {
  name: "ValidationError"
  errors: {
    [key: string]: {
      message: string
    }
  }
}

// Type guard pour vérifier si c'est une ValidationError
function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "ValidationError"
  )
}

export async function POST(request: NextRequest) {
  try {
    // Connexion à la base de données
    await connectToDatabase()

    // Récupérer les données de la requête
    const body = (await request.json()) as OrderRequestBody

    const {
      customerName,
      customerAddress,
      customerPhone,
      items,
      subtotal,
      shipping,
      total,
      coupon
    } = body

    // Validation des données
    if (
      !customerName ||
      !customerAddress ||
      !customerPhone ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Données manquantes" },
        { status: 400 }
      )
    }
    // Build order data - handle optional fields from admin form
    const orderData: {
      customerName: string
      customerAddress: string
      customerPhone: string
      items: typeof items
      subtotal: number
      shipping: number
      total: number
      status: string
      coupon: string | null
      paymentMethod?: string
      shippingMethod?: string
      notes?: string
    } = {
      customerName: customerName.trim(),
      customerAddress: customerAddress.trim(),
      customerPhone: customerPhone.trim(),
      items,
      subtotal,
      shipping,
      total,
      status: "pending",
      coupon: coupon || null
    }

    // Add optional fields if present in request body
    const bodyData = body as OrderRequestBody & {
      paymentMethod?: string
      shippingMethod?: string
      notes?: string
    }
    if (bodyData.paymentMethod) {
      orderData.paymentMethod = bodyData.paymentMethod
    }
    if (bodyData.shippingMethod) {
      orderData.shippingMethod = bodyData.shippingMethod
    }
    if (bodyData.notes !== undefined) {
      orderData.notes = bodyData.notes
    }

    // Créer la nouvelle commande
    const newOrder = await Order.create(orderData)

    // await sendOrderEmail(newOrder)
    await sendOrderEmail({ ...newOrder.toObject(), coupon })
    return NextResponse.json(
      {
        success: true,
        message: "Commande enregistrée avec succès",
        orderId: newOrder._id.toString(),
        order: newOrder
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la création de la commande:", error)

    // Gestion des erreurs de validation Mongoose
    if (isValidationError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: "Erreur de validation",
          errors: Object.values(error.errors).map((e) => e.message)
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'enregistrement de la commande"
      },
      { status: 500 }
    )
  }
}

// Récupérer les commandes avec pagination et filtres côté serveur
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "30")
    const skip = (page - 1) * limit

    // Filtres
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""
    const dateFrom = searchParams.get("dateFrom")
    const dateTo = searchParams.get("dateTo")
    const minAmount = searchParams.get("minAmount")
    const maxAmount = searchParams.get("maxAmount")
    const itemType = searchParams.get("itemType")

    // Construire la requête de filtrage
    const query: {
      status?: string
      createdAt?: { $gte?: Date; $lte?: Date }
      total?: { $gte?: number; $lte?: number }
      $or?: Array<{ orderNumber?: { $regex: string; $options: string } } | { customerName?: { $regex: string; $options: string } }>
    } = {}

    // Filtre par statut
    if (status) {
      query.status = status
    }

    // Filtre par date
    if (dateFrom || dateTo) {
      query.createdAt = {}
      if (dateFrom) {
        query.createdAt.$gte = new Date(dateFrom)
      }
      if (dateTo) {
        const toDate = new Date(dateTo)
        toDate.setHours(23, 59, 59, 999)
        query.createdAt.$lte = toDate
      }
    }

    // Filtre par montant
    if (minAmount || maxAmount) {
      query.total = {}
      if (minAmount) {
        query.total.$gte = parseFloat(minAmount)
      }
      if (maxAmount) {
        query.total.$lte = parseFloat(maxAmount)
      }
    }

    // Recherche dans orderNumber et customerName
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } }
      ]
    }

    // Compter le total pour la pagination
    const total = await Order.countDocuments(query)

    // Récupérer les commandes avec pagination
    const orders = await Order.find(query)
      .sort({ createdAt: -1 }) // Tri par date décroissante (newest first)
      .skip(skip)
      .limit(limit)
      .lean()

    // Si filtre par type d'item, filtrer en JavaScript (car MongoDB ne peut pas facilement filtrer sur les arrays imbriqués)
    let filteredOrders = orders
    if (itemType && itemType !== "") {
      filteredOrders = orders.filter((order: {
        items: Array<{ type?: string }>
      }) => {
        if (itemType === "products") {
          return order.items.some((item) => item.type === "product")
        } else if (itemType === "packs") {
          return order.items.some((item) => item.type === "pack")
        } else if (itemType === "mixed") {
          const hasProducts = order.items.some(
            (item) => item.type === "product"
          )
          const hasPacks = order.items.some((item) => item.type === "pack")
          return hasProducts && hasPacks
        }
        return true
      })
    }

    return NextResponse.json(
      {
        success: true,
        orders: filteredOrders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(filteredOrders.length / limit)
        }
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des commandes:", error)
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    )
  }
}
