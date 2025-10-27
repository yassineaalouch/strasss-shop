// models/Product.ts
import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    name: {
      fr: {
        type: String,
        required: [true, "Le nom en français est requis"],
        trim: true,
        minlength: [2, "Le nom doit contenir au moins 2 caractères"]
      },
      ar: {
        type: String,
        required: [true, "Le nom en arabe est requis"],
        trim: true,
        minlength: [2, "الاسم يجب أن يحتوي على حرفين على الأقل"]
      }
    },
    description: {
      fr: {
        type: String,
        required: [true, "La description en français est requise"],
        trim: true
      },
      ar: {
        type: String,
        required: [true, "La description en arabe est requise"],
        trim: true
      }
    },
    price: {
      type: Number,
      required: [true, "Le prix est requis"],
      min: [0, "Le prix doit être positif"]
    },
    originalPrice: {
      type: Number,
      min: [0, "Le prix original doit être positif"]
    },
    images: {
      type: [String],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0
        },
        message: "Au moins une image est requise"
      }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
      default: null
    },
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
      required: false,
      default: null
    },
    Characteristic: {
      type: [
        {
          name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Characteristic",
            required: false,
            default: null
          },
          values: [
            {
              fr: { type: String },
              ar: { type: String }
            }
          ]
        }
      ],
      required: false,
      default: []
    },
    inStock: {
      type: Boolean,
      default: true
    },
    quantity: {
      type: Number,
      required: [true, "La quantité est requise"],
      min: [0, "La quantité ne peut pas être négative"],
      default: 0
    },
    isNew: {
      type: Boolean,
      default: false
    },
    isOnSale: {
      type: Boolean,
      default: false
    },
    slug: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  {
    timestamps: true
  }
)

// Index pour améliorer les performances
ProductSchema.index({ category: 1 })
ProductSchema.index({ inStock: 1 })
ProductSchema.index({ isNew: 1 })
ProductSchema.index({ isOnSale: 1 })
ProductSchema.index({ price: 1 })
ProductSchema.index({ "name.fr": "text", "name.ar": "text" })

// 🧠 Hook pre-save pour s'assurer que le slug est unique
ProductSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const baseSlug = this?.name?.fr
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    let slug = baseSlug
    let counter = 1

    // Vérifie si le slug existe déjà
    const Product =
      mongoose.models.Product || mongoose.model("Product", ProductSchema)
    while (await Product.exists({ slug })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    this.slug = slug
  }
  next()
})

// Mettre à jour inStock automatiquement selon la quantité
ProductSchema.pre("save", function (next) {
  if (this.isModified("quantity")) {
    this.inStock = this.quantity > 0
  }
  next()
})

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema)
