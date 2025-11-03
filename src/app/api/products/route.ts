import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import "@/models/Characteristic"
import "@/models/Category"
import "@/models/Discount"
import Product from "@/models/Product"
import { ProductResponse, ProductRequestBody } from "@/types/product"
import mongoose from "mongoose"
import { FilterQuery, SortOptions } from "@/types/searchParams"

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

// GET - Récupérer tous les produits avec filtrage et pagination
export async function GET(
  request: NextRequest
): Promise<NextResponse<ProductResponse>> {
  try {
    await connectToDatabase()

    // Récupérer les paramètres de recherche
    const searchParams = request.nextUrl.searchParams

    // Paramètres de filtrage (client shop)
    const categories = searchParams.getAll("category")
    const characteristics = searchParams.getAll("characteristics")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const inStock = searchParams.get("inStock")
    const isNew = searchParams.get("isNew")
    const isOnSale = searchParams.get("onSale")

    // Paramètres de filtrage (dashboard)
    const search = searchParams.get("search") // Search in product names
    const categoryName = searchParams.get("categoryName") // Category by name (dashboard)
    const discountName = searchParams.get("discountName") // Discount by name (dashboard)
    const status = searchParams.get("status") // Status filter (dashboard)
    const minQuantity = searchParams.get("minQuantity")
    const maxQuantity = searchParams.get("maxQuantity")
    const language = searchParams.get("language") || "fr" // Language for sorting

    // Paramètres de tri
    const sortBy = searchParams.get("sortBy") || "newest"
    const sortField = searchParams.get("sortField") // For dashboard: name, price, quantity, category, createdAt
    const sortDirection = searchParams.get("sortDirection") || "asc" // asc or desc

    // Paramètres de pagination
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    // Construire la requête de filtrage
    const query: FilterQuery = {}
    const orConditions: any[] = []

    // Filtre par recherche de nom (dashboard)
    if (search) {
      orConditions.push(
        { "name.fr": { $regex: search, $options: "i" } },
        { "name.ar": { $regex: search, $options: "i" } }
      )
    }

    // Filtre par catégories (client shop - multiple categories)
    if (categories.length > 0) {
      const Category = mongoose.model("Category")
      const categoryDocs = await Category.find({
        $or: [
          { "name.fr": { $in: categories } },
          { "name.ar": { $in: categories } }
        ]
      })
      const categoryIds = categoryDocs.map((cat) => cat._id)
      if (categoryIds.length > 0) {
        query.category = { $in: categoryIds }
      }
    }

    // Filtre par nom de catégorie (dashboard - single category)
    if (categoryName) {
      const Category = mongoose.model("Category")
      const categoryDoc = await Category.findOne({
        $or: [
          { "name.fr": categoryName },
          { "name.ar": categoryName }
        ]
      })
      if (categoryDoc) {
        query.category = categoryDoc._id
      }
    }

    // Filtre par nom de discount (dashboard)
    if (discountName) {
      const Discount = mongoose.model("Discount")
      const discountDoc = await Discount.findOne({
        $or: [
          { "name.fr": discountName },
          { "name.ar": discountName }
        ]
      })
      if (discountDoc) {
        query.discount = discountDoc._id
      }
    }

    // Filtre par caractéristiques
    if (characteristics.length > 0) {
      query["Characteristic.values"] = {
        $elemMatch: {
          $or: [
            { fr: { $in: characteristics } },
            { ar: { $in: characteristics } }
          ]
        }
      }
    }

    // Filtre par prix
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseFloat(minPrice)
      if (maxPrice) query.price.$lte = parseFloat(maxPrice)
    }

    // Filtre par statut (dashboard) - doit être fait avant la quantité pour éviter les conflits
    if (status && status !== "all") {
      switch (status) {
        case "inStock":
          query.inStock = true
          break
        case "outOfStock":
          orConditions.push(
            { inStock: false },
            { quantity: 0 }
          )
          break
        case "lowStock":
          query.inStock = true
          break
        case "new":
          query.isNewProduct = true
          break
        case "onSale":
          query.isOnSale = true
          break
      }
    }

    // Filtre par quantité (dashboard) - après le statut
    const quantityConditions: { $gte?: number; $lte?: number; $gt?: number } = {}
    if (minQuantity) quantityConditions.$gte = parseInt(minQuantity)
    if (maxQuantity) quantityConditions.$lte = parseInt(maxQuantity)
    
    // Add status-specific quantity conditions
    if (status === "inStock") {
      quantityConditions.$gt = 0
    } else if (status === "lowStock") {
      quantityConditions.$lte = 10
      quantityConditions.$gt = 0
    }
    
    // Only set quantity if we have conditions
    if (Object.keys(quantityConditions).length > 0) {
      query.quantity = quantityConditions
    }

    // Ajouter les conditions $or si nécessaire
    if (orConditions.length > 0) {
      query.$or = orConditions
    }

    // Filtres booléens (client shop)
    if (inStock !== null) query.inStock = inStock === "true"
    if (isNew !== null) query.isNewProduct = isNew === "true"
    if (isOnSale !== null) query.isOnSale = isOnSale === "true"

    // Définir l'ordre de tri
    let sortOptions: SortOptions = {}
    
    // Dashboard sort (using sortField and sortDirection)
    if (sortField) {
      switch (sortField) {
        case "name":
          sortOptions = { [`name.${language}`]: sortDirection === "desc" ? -1 : 1 }
          break
        case "price":
          sortOptions = { price: sortDirection === "desc" ? -1 : 1 }
          break
        case "quantity":
          sortOptions = { quantity: sortDirection === "desc" ? -1 : 1 }
          break
        case "category":
          // Sort by category name requires aggregation, simplified to createdAt
          sortOptions = { createdAt: sortDirection === "desc" ? -1 : 1 }
          break
        case "createdAt":
          sortOptions = { createdAt: sortDirection === "desc" ? -1 : 1 }
          break
        default:
          sortOptions = { createdAt: -1 }
      }
    } else {
      // Client shop sort (using sortBy)
      switch (sortBy) {
        case "name-asc":
          sortOptions = { "name.fr": 1 }
          break
        case "name-desc":
          sortOptions = { "name.fr": -1 }
          break
        case "price-asc":
          sortOptions = { price: 1 }
          break
        case "price-desc":
          sortOptions = { price: -1 }
          break
        case "newest":
        default:
          sortOptions = { createdAt: -1 }
          break
      }
    }

    // Compter le nombre total de produits correspondant aux filtres
    const totalProducts = await Product.countDocuments(query)
    const totalPages = Math.ceil(totalProducts / limit)

    // Récupérer les produits avec pagination
    const products = await Product.find(query)
      .populate("category")
      .populate("discount")
      .populate("Characteristic.name")
      .sort(sortOptions as Record<string, 1 | -1>)
      .skip(skip)
      .limit(limit)

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
        })),
        pagination: {
          page,
          limit,
          totalProducts,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
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
