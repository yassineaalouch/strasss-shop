import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import TestimonialsConfig from "@/models/TestimonialsConfig"
import type { LocalizedPair } from "@/models/TestimonialsConfig"

export type ApiTestimonialItem = {
  id: string
  quote: LocalizedPair
  name: LocalizedPair
  role: LocalizedPair
  order: number
}

function serializeItems(
  docItems: Array<{
    _id: unknown
    quote: LocalizedPair
    name: LocalizedPair
    role: LocalizedPair
    order?: number
  }>
): ApiTestimonialItem[] {
  return docItems
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item, index) => ({
      id: String(item._id),
      quote: {
        fr: item.quote?.fr?.trim() ?? "",
        ar: item.quote?.ar?.trim() ?? ""
      },
      name: {
        fr: item.name?.fr?.trim() ?? "",
        ar: item.name?.ar?.trim() ?? ""
      },
      role: {
        fr: item.role?.fr?.trim() ?? "",
        ar: item.role?.ar?.trim() ?? ""
      },
      order: item.order ?? index
    }))
}

// GET — avis (site public + dashboard)
export async function GET() {
  try {
    await connectToDatabase()

    const doc = await TestimonialsConfig.findOne({
      singleton: "home_testimonials"
    }).lean()

    if (!doc || !doc.items?.length) {
      return NextResponse.json(
        {
          success: true,
          items: [] as ApiTestimonialItem[],
          fromDatabase: false
        },
        { status: 200 }
      )
    }

    const items = serializeItems(doc.items as Parameters<typeof serializeItems>[0])

    return NextResponse.json(
      {
        success: true,
        items,
        fromDatabase: items.length > 0
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("GET /api/testimonials:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur",
        items: [],
        fromDatabase: false
      },
      { status: 500 }
    )
  }
}

type PutBody = {
  items: Array<{
    quote?: LocalizedPair
    name?: LocalizedPair
    role?: LocalizedPair
  }>
}

// PUT — remplacer tous les avis (dashboard)
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = (await request.json()) as PutBody

    if (!body.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { success: false, message: "items doit être un tableau" },
        { status: 400 }
      )
    }

    if (body.items.length > 40) {
      return NextResponse.json(
        { success: false, message: "Maximum 40 avis" },
        { status: 400 }
      )
    }

    const normalized = body.items.map((item, index) => ({
      quote: {
        fr: item.quote?.fr?.trim() ?? "",
        ar: item.quote?.ar?.trim() ?? ""
      },
      name: {
        fr: item.name?.fr?.trim() ?? "",
        ar: item.name?.ar?.trim() ?? ""
      },
      role: {
        fr: item.role?.fr?.trim() ?? "",
        ar: item.role?.ar?.trim() ?? ""
      },
      order: index
    }))

    const updated = await TestimonialsConfig.findOneAndUpdate(
      { singleton: "home_testimonials" },
      { items: normalized },
      { new: true, upsert: true, runValidators: true }
    ).lean()

    const items = updated?.items?.length
      ? serializeItems(updated.items as Parameters<typeof serializeItems>[0])
      : []

    return NextResponse.json(
      {
        success: true,
        items,
        fromDatabase: items.length > 0
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("PUT /api/testimonials:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erreur serveur"
      },
      { status: 500 }
    )
  }
}
