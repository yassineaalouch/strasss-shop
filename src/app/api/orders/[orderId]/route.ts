import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Order from "@/models/Order"
import { OrderResponse } from "@/types/order"

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
): Promise<NextResponse<OrderResponse>> {
  try {
    await connectToDatabase()

    const order = await Order.findById(params.orderId)

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Commande introuvable" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, order }, { status: 200 })
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération de la commande:", error)
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    )
  }
}
