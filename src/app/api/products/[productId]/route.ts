//api/products/[productId]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Product from "@/models/Product"
import "@/models/Category"
import "@/models/Characteristic"
import "@/models/Discount";
import { ProductRequestBody } from "@/types/product"
import mongoose from "mongoose"
import { sendLowStockEmail } from "@/lib/nodemailer"

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

// GET - Récupérer un produit par ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  const { productId } = await context.params
  try {
    await connectToDatabase()

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, message: "ID de produit invalide" },
        { status: 400 }
      )
    }

    const product = await Product.findById(productId)
      .populate("category")
      .populate("discount")
      .populate("Characteristic.name")

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Produit introuvable" },
        { status: 404 }
      )
    }
    console.log("product product", product)
    return NextResponse.json(
      {
        success: true,
        product: {
          _id: product._id.toString(),
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          images: product.images,
          category: product.category ?? null,
          discount: product.discount ?? null,
          // category: product.category ? product.category.toString() : null,
          // discount: product.discount ? product.discount.toString() : null,
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
        }
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération du produit:", error)
    return NextResponse.json(
      { success: false, message: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un produit
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  const { productId } = await context.params
  try {
    await connectToDatabase()

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, message: "ID de produit invalide" },
        { status: 400 }
      )
    }

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
    console.log("product.discount", discount)

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

    // Vérifier que le produit existe
    const existingProduct = await Product.findById(productId)
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Produit introuvable" },
        { status: 404 }
      )
    }

    // Sauvegarder l'ancienne quantité pour vérifier le stock bas
    const oldQuantity = existingProduct.quantity ?? 0
    const newQuantity = quantity || 0

    // Mettre à jour le produit
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
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
        category: mongoose.Types.ObjectId.isValid(category)
          ? new mongoose.Types.ObjectId(category)
          : null,
        discount: mongoose.Types.ObjectId.isValid(discount)
          ? new mongoose.Types.ObjectId(discount)
          : null,
        Characteristic: Characteristic,
        inStock: inStock !== undefined ? inStock : quantity > 0,
        quantity: quantity || 0,
        isNewProduct: isNewProduct || false,
        isOnSale: isOnSale || false
      },
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Erreur lors de la mise à jour" },
        { status: 500 }
      )
    }

    // Vérifier le stock bas après la mise à jour
    const LOW_STOCK_THRESHOLD = 15
    if (
      newQuantity > 0 &&
      newQuantity < LOW_STOCK_THRESHOLD &&
      oldQuantity >= LOW_STOCK_THRESHOLD
    ) {
      try {
        await sendLowStockEmail({
          id: updatedProduct._id?.toString() ?? "",
          nameFr: updatedProduct.name?.fr ?? "Produit sans nom",
          nameAr: updatedProduct.name?.ar,
          image: Array.isArray(updatedProduct.images) && updatedProduct.images.length > 0
            ? updatedProduct.images[0]
            : undefined,
          quantity: newQuantity
        })
      } catch (emailError) {
        console.error(
          "Erreur lors de l'envoi de l'email de stock bas:",
          emailError
        )
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Produit mis à jour avec succès",
        product: {
          _id: updatedProduct._id.toString(),
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: updatedProduct.price,
          originalPrice: updatedProduct.originalPrice,
          images: updatedProduct.images,
          category: updatedProduct.category
            ? updatedProduct.category.toString()
            : "",
          discount: updatedProduct.discount
            ? updatedProduct.discount.toString()
            : "",
          Characteristic: updatedProduct.Characteristic,
          inStock: updatedProduct.inStock,
          quantity: updatedProduct.quantity,
          isNewProduct: updatedProduct.isNewProduct,
          isOnSale: updatedProduct.isOnSale,
          slug: updatedProduct.slug,
          createdAt: updatedProduct.createdAt
            ? updatedProduct.createdAt.toISOString()
            : new Date().toISOString(),
          updatedAt: updatedProduct.updatedAt
            ? updatedProduct.updatedAt.toISOString()
            : new Date().toISOString()
        }
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la mise à jour du produit:", error)

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
        message: "Erreur lors de la mise à jour du produit"
      },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un produit
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  const { productId } = await context.params
  try {
    await connectToDatabase()

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, message: "ID de produit invalide" },
        { status: 400 }
      )
    }

    const product = await Product.findById(productId)

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Produit introuvable" },
        { status: 404 }
      )
    }

    await Product.findByIdAndDelete(productId)

    return NextResponse.json(
      {
        success: true,
        message: "Produit supprimé avec succès"
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la suppression du produit:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la suppression du produit"
      },
      { status: 500 }
    )
  }
}
