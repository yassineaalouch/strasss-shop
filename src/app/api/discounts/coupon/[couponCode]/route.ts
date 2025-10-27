// app/api/discounts/coupon/[couponCode]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Discount from "@/models/Discount"
import { Discount as DiscountType } from "@/types/discount"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ couponCode: string }> }
) {
  const { couponCode } = await context.params

  try {
    await connectToDatabase()

    if (!couponCode) {
      return NextResponse.json(
        { success: false, message: "Code coupon requis" },
        { status: 400 }
      )
    }

    // Rechercher le coupon par code (case insensitive)
    const discount = await Discount.findOne({
      couponCode: couponCode.toUpperCase(),
      type: "COUPON",
      isActive: true
    })

    if (!discount) {
      return NextResponse.json(
        { success: false, message: "Coupon non trouvé" },
        { status: 404 }
      )
    }

    // Vérifier la date d'expiration
    const now = new Date()
    if (discount.startDate && new Date(discount.startDate) > now) {
      return NextResponse.json(
        { success: false, message: "Ce coupon n'est pas encore valide" },
        { status: 400 }
      )
    }

    if (discount.endDate && new Date(discount.endDate) < now) {
      return NextResponse.json(
        { success: false, message: "Ce coupon a expiré" },
        { status: 400 }
      )
    }

    // Vérifier la limite d'utilisation
    if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
      return NextResponse.json(
        {
          success: false,
          message: "Ce coupon a atteint sa limite d'utilisation"
        },
        { status: 400 }
      )
    }

    const discountData: DiscountType = {
      _id: discount._id as string,
      name: discount.name,
      type: discount.type,
      value: discount.value ?? undefined,
      buyQuantity: discount.buyQuantity ?? undefined,
      getQuantity: discount.getQuantity ?? undefined,
      couponCode: discount.couponCode ?? undefined,
      description: discount.description,
      startDate: discount.startDate?.toISOString(),
      endDate: discount.endDate?.toISOString(),
      isActive: discount.isActive,
      usageLimit: discount.usageLimit ?? undefined,
      usageCount: discount.usageCount,
      minimumPurchase: discount.minimumPurchase ?? undefined,
      createdAt: discount.createdAt.toISOString(),
      updatedAt: discount.updatedAt.toISOString()
    }

    return NextResponse.json(
      { success: true, discount: discountData },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la recherche du coupon:", error)
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    )
  }
}
