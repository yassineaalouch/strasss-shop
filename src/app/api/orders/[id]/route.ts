// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Order from "@/models/Order"

// Types pour la mise à jour
type OrderStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
type PaymentMethod =
  | "Carte bancaire"
  | "PayPal"
  | "Virement bancaire"
  | "À la livraison"
  | "Chèque"

interface UpdateOrderData {
  status?: OrderStatus
  paymentMethod?: PaymentMethod
}

// Fonction de validation
function isValidStatus(status: string): status is OrderStatus {
  const validStatuses: OrderStatus[] = [
    "pending",
    "confirmed",
    "rejected",
    "processing",
    "shipped",
    "delivered",
    "cancelled"
  ]
  return validStatuses.includes(status as OrderStatus)
}

function isValidPaymentMethod(method: string): method is PaymentMethod {
  const validMethods: PaymentMethod[] = [
    "Carte bancaire",
    "PayPal",
    "Virement bancaire",
    "À la livraison",
    "Chèque"
  ]
  return validMethods.includes(method as PaymentMethod)
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    await connectToDatabase()

    const body = await request.json()
    const { status, paymentMethod } = body

    const updateData: UpdateOrderData = {}
    const errors: string[] = []

    // Validation et préparation des données
    if (status) {
      if (isValidStatus(status)) {
        updateData.status = status
      } else {
        errors.push(`Statut invalide: ${status}`)
      }
    }

    if (paymentMethod) {
      if (isValidPaymentMethod(paymentMethod)) {
        updateData.paymentMethod = paymentMethod
      } else {
        errors.push(`Méthode de paiement invalide: ${paymentMethod}`)
      }
    }

    // Retourner les erreurs de validation
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: "Données invalides", errors },
        { status: 400 }
      )
    }

    // Vérifier si au moins un champ est fourni
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "Aucune donnée valide à mettre à jour" },
        { status: 400 }
      )
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Commande non trouvée" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Commande mise à jour avec succès",
      order: updatedOrder
    })
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la commande:", error)

    // Gestion des erreurs de validation Mongoose
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Erreur de validation",
          error: error.message
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    )
  }
}
