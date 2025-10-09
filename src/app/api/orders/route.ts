import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Order from "@/models/Order"

// Types pour les données de commande
interface OrderItem {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  image: string
}

interface OrderRequestBody {
  customerName: string
  city: string
  phoneNumber: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
}

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
      city,
      phoneNumber,
      items,
      subtotal,
      shipping,
      total
    } = body

    // Validation des données
    if (
      !customerName ||
      !city ||
      !phoneNumber ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Données manquantes" },
        { status: 400 }
      )
    }

    // Créer la nouvelle commande
    const newOrder = await Order.create({
      customerName: customerName.trim(),
      city: city.trim(),
      phoneNumber: phoneNumber.trim(),
      items,
      subtotal,
      shipping,
      total,
      status: "pending"
    })

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

// Optionnel : récupérer toutes les commandes
export async function GET() {
  try {
    await connectToDatabase()

    const orders = await Order.find().sort({ orderDate: -1 })

    return NextResponse.json({ success: true, orders }, { status: 200 })
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des commandes:", error)
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    )
  }
}
