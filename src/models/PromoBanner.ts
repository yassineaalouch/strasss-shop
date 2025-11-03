// models/PromoBanner.ts
import mongoose, { Document, Schema } from "mongoose"

export interface PromoBannerDocument extends Document {
  image: string
  link: string // URL vers un produit ou pack (ex: /shop/[productId] ou /packs/[packId])
  linkType: "product" | "pack" | "custom" // Type de lien
  linkId?: string // ID du produit ou pack (si applicable)
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  // Champ singleton pour garantir un seul document
  singleton: string
}

const PromoBannerSchema = new Schema<PromoBannerDocument>(
  {
    image: {
      type: String,
      required: [true, "L'image est requise"],
      trim: true
    },
    link: {
      type: String,
      required: [true, "Le lien est requis"],
      trim: true,
      validate: {
        validator: function (v: string) {
          // Valider que l'URL commence par / ou http
          return v.startsWith("/") || v.startsWith("http")
        },
        message: "Le lien doit commencer par / ou http"
      }
    },
    linkType: {
      type: String,
      enum: ["product", "pack", "custom"],
      default: "custom"
    },
    linkId: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    singleton: {
      type: String,
      default: "promo_banner",
      unique: true,
      immutable: true
    }
  },
  {
    timestamps: true
  }
)

// Index
PromoBannerSchema.index({ isActive: 1 })

const PromoBanner =
  mongoose.models.PromoBanner ||
  mongoose.model<PromoBannerDocument>("PromoBanner", PromoBannerSchema)

export default PromoBanner

