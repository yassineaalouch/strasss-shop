//api/products/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import "@/models/Characteristic" // permet d’enregistrer le schéma Category
import "@/models/Category" // permet d’enregistrer le schéma Category
import "@/models/Discount" // permet d’enregistrer le schéma Category
import Product from "@/models/Product"
import { ProductResponse, ProductRequestBody } from "@/types/product"
import mongoose from "mongoose"

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

// GET - Récupérer tous les produits
export async function GET(
  request: NextRequest
): Promise<NextResponse<ProductResponse>> {
  try {
    await connectToDatabase()

    // Récupérer les paramètres de recherche
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const inStock = searchParams.get("inStock")
    const isNew = searchParams.get("isNew")
    const isOnSale = searchParams.get("isOnSale")
    type ProductQuery = {
      category?: string
      inStock?: boolean
      isNewProduct?: boolean
      isOnSale?: boolean
    }
    // Construire la requête
    const query: ProductQuery = {}
    if (category) query.category = category
    if (inStock !== null) query.inStock = inStock === "true"
    if (isNew !== null) query.isNewProduct = isNew === "true"
    if (isOnSale !== null) query.isOnSale = isOnSale === "true"

    const products = await Product.find(query)
      .populate("category")
      .populate("discount")
      .populate("Characteristic.name")
      .sort({ createdAt: -1 })

    return NextResponse.json(
      {
        success: true,
        products: products.map((product) => ({
          _id: product._id.toString(),
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          images: product.images,
          category: product.category,
          discount: product.discount,
          Characteristic: product.Characteristic,
          inStock: product.inStock,
          quantity: product.quantity,
          isNewProduct: product.isNewProduct,
          isOnSale: product.isOnSale,
          slug: product.slug,
          createdAt: product.createdAt
            ? product.createdAt.toISOString()
            : new Date().toISOString(),
          updatedAt: product.updatedAt
            ? product.updatedAt.toISOString()
            : new Date().toISOString()
        }))
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des produits:", error)
    if (error instanceof Error)
      console.error("Message d'erreur:", error.message)
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// POST - Créer un nouveau produit
export async function POST(
  request: NextRequest
): Promise<NextResponse<ProductResponse>> {
  try {
    await connectToDatabase()

    const body = (await request.json()) as ProductRequestBody

    const {
      name,
      description,
      price,
      originalPrice,
      images,
      category,
      discount,
      Characteristic,
      inStock,
      quantity,
      isNewProduct,
      isOnSale
    } = body

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

    if (!description?.fr || !description?.ar) {
      return NextResponse.json(
        {
          success: false,
          message: "Les descriptions en français et en arabe sont requises"
        },
        { status: 400 }
      )
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        { success: false, message: "Au moins une image est requise" },
        { status: 400 }
      )
    }

    if (price <= 0) {
      return NextResponse.json(
        { success: false, message: "Le prix doit être supérieur à 0" },
        { status: 400 }
      )
    }

    // Créer le nouveau produit
    const newProduct = await Product.create({
      name: {
        fr: name.fr.trim(),
        ar: name.ar.trim()
      },
      description: {
        fr: description.fr.trim(),
        ar: description.ar.trim()
      },
      price,
      originalPrice,
      images,
      category: mongoose.Types.ObjectId.isValid(category) ? category : null,
      discount: mongoose.Types.ObjectId.isValid(discount) ? discount : null,
      Characteristic: Characteristic,
      inStock: inStock !== undefined ? inStock : quantity > 0,
      quantity: quantity || 0,
      isNewProduct: isNewProduct || false,
      isOnSale: isOnSale || false
    })

    return NextResponse.json(
      {
        success: true,
        message: "Produit créé avec succès",
        product: {
          _id: newProduct._id.toString(),
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          originalPrice: newProduct.originalPrice,
          images: newProduct.images,
          category: newProduct.category ? newProduct.category.toString() : "",
          discount: newProduct.discount ? newProduct.discount.toString() : "",
          Characteristic: newProduct.Characteristic,
          inStock: newProduct.inStock,
          quantity: newProduct.quantity,
          isNewProduct: newProduct.isNewProduct,
          isOnSale: newProduct.isOnSale,
          slug: newProduct.slug,
          createdAt: newProduct.createdAt
            ? newProduct.createdAt.toISOString()
            : new Date().toISOString(),
          updatedAt: newProduct.updatedAt
            ? newProduct.updatedAt.toISOString()
            : new Date().toISOString()
        }
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la création du produit:", error)

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
        message: "Erreur lors de la création du produit"
      },
      { status: 500 }
    )
  }
}
