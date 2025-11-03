// app/api/promo-banner/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import PromoBanner from "@/models/PromoBanner"

interface PromoBannerRequestBody {
  image: string
  link: string
  linkType?: "product" | "pack" | "custom"
  linkId?: string
  isActive?: boolean
}

// GET - Récupérer la bannière publicitaire
export async function GET() {
  try {
    await connectToDatabase()

    const banner = await PromoBanner.findOne({
      singleton: "promo_banner"
    }).lean()

    if (!banner) {
      return NextResponse.json(
        {
          success: true,
          banner: null
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        banner: {
          image: banner.image,
          link: banner.link,
          linkType: banner.linkType || "custom",
          linkId: banner.linkId || null,
          isActive: banner.isActive,
          createdAt: banner.createdAt.toISOString(),
          updatedAt: banner.updatedAt.toISOString()
        }
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération de la bannière:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur",
        error: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour ou créer la bannière publicitaire
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = (await request.json()) as PromoBannerRequestBody

    // Validation
    if (!body.image) {
      return NextResponse.json(
        {
          success: false,
          message: "L'image est requise"
        },
        { status: 400 }
      )
    }

    if (!body.link) {
      return NextResponse.json(
        {
          success: false,
          message: "Le lien est requis"
        },
        { status: 400 }
      )
    }

    // Mettre à jour ou créer
    const banner = await PromoBanner.findOneAndUpdate(
      { singleton: "promo_banner" },
      {
        image: body.image.trim(),
        link: body.link.trim(),
        linkType: body.linkType || "custom",
        linkId: body.linkId || null,
        isActive: body.isActive !== undefined ? body.isActive : true
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    )

    return NextResponse.json(
      {
        success: true,
        message: "Bannière mise à jour avec succès",
        banner: {
          image: banner.image,
          link: banner.link,
          linkType: banner.linkType,
          linkId: banner.linkId,
          isActive: banner.isActive,
          createdAt: banner.createdAt.toISOString(),
          updatedAt: banner.updatedAt.toISOString()
        }
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la mise à jour de la bannière:", error)

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
      {
        success: false,
        message: "Erreur serveur",
        error: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer la bannière
export async function DELETE() {
  try {
    await connectToDatabase()

    const banner = await PromoBanner.findOneAndDelete({
      singleton: "promo_banner"
    })

    if (!banner) {
      return NextResponse.json(
        {
          success: false,
          message: "Bannière non trouvée"
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Bannière supprimée avec succès"
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la suppression de la bannière:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur",
        error: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    )
  }
}

