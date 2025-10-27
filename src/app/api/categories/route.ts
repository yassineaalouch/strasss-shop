// app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Category from "@/models/Category"
import { CategoryRequestBody, CategoryResponse } from "@/types/category"

interface ValidationError extends Error {
  name: "ValidationError"
  errors: {
    [key: string]: {
      message: string
    }
  }
}

function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "ValidationError"
  )
}

// GET - Récupérer toutes les catégories
export async function GET(): Promise<NextResponse<CategoryResponse>> {
  try {
    await connectToDatabase()

    const categories = await Category.find().sort({ order: 1, createdAt: -1 })

    return NextResponse.json(
      {
        success: true,
        categories: categories.map((cat) => ({
          _id: cat._id.toString(),
          name: cat.name,
          description: cat.description,
          parentId: cat.parentId?.toString(),
          isActive: cat.isActive,
          slug: cat.slug,
          order: cat.order,
          createdAt: cat.createdAt.toISOString(),
          updatedAt: cat.updatedAt.toISOString()
        }))
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des catégories:", error)
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle catégorie
export async function POST(
  request: NextRequest
): Promise<NextResponse<CategoryResponse>> {
  try {
    await connectToDatabase()

    const body = (await request.json()) as CategoryRequestBody

    const { name, description, parentId, isActive } = body

    // Validation des données
    if (!name?.fr || !name?.ar) {
      return NextResponse.json(
        {
          success: false,
          message: "Les noms en français et en arabe sont requis"
        },
        { status: 400 }
      )
    }

    // Vérifier que la catégorie parent existe si spécifiée
    if (parentId) {
      const parentExists = await Category.findById(parentId)
      if (!parentExists) {
        return NextResponse.json(
          { success: false, message: "La catégorie parent n'existe pas" },
          { status: 400 }
        )
      }
    }

    // Créer la nouvelle catégorie
    const newCategory = await Category.create({
      name: {
        fr: name.fr.trim(),
        ar: name.ar.trim()
      },
      description: description
        ? {
            fr: description.fr.trim(),
            ar: description.ar.trim()
          }
        : undefined,
      parentId: parentId || null,
      isActive: isActive !== undefined ? isActive : true
    })

    return NextResponse.json(
      {
        success: true,
        message: "Catégorie créée avec succès",
        category: {
          _id: newCategory._id.toString(),
          name: newCategory.name,
          description: newCategory.description,
          parentId: newCategory.parentId?.toString(),
          isActive: newCategory.isActive,
          slug: newCategory.slug,
          order: newCategory.order,
          createdAt: newCategory.createdAt.toISOString(),
          updatedAt: newCategory.updatedAt.toISOString()
        }
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la création de la catégorie:", error)

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
        message: "Erreur lors de la création de la catégorie"
      },
      { status: 500 }
    )
  }
}
