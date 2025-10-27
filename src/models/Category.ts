import mongoose, { Document, Schema, Model, Types } from "mongoose"

// --- Interface pour champs localisés ---
export interface LocalizedField {
  fr: string
  ar: string
}

// --- Interface pour le document Category ---
export interface CategoryDocument extends Document {
  _id: Types.ObjectId
  name: LocalizedField
  description: LocalizedField
  parentId?: Types.ObjectId | null
  isActive: boolean
  slug: LocalizedField
  order: number
  createdAt: Date
  updatedAt: Date

  hasChildren(): Promise<boolean>
  getAllDescendants(): Promise<CategoryDocument[]>
}

// --- Schéma ---
const CategorySchema = new Schema<CategoryDocument>(
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
      fr: { type: String, trim: true, default: "" },
      ar: { type: String, trim: true, default: "" }
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null
    },
    isActive: { type: Boolean, default: true },
    slug: {
      fr: { type: String, unique: true, sparse: true },
      ar: { type: String, unique: true, sparse: true }
    },
    order: { type: Number, default: 0 }
  },
  {
    timestamps: true, // ✅ important pour avoir createdAt et updatedAt
    suppressReservedKeysWarning: true // ✅ pour supprimer ton warning mongoose
  }
)

// --- Indexes ---
CategorySchema.index({ parentId: 1 })
CategorySchema.index({ isActive: 1 })
CategorySchema.index({ "name.fr": 1 })
CategorySchema.index({ "name.ar": 1 })

// --- Méthode: vérifier si la catégorie a des enfants ---
CategorySchema.methods.hasChildren = async function (this: CategoryDocument) {
  const count = await mongoose.models.Category.countDocuments({
    parentId: this._id
  })
  return count > 0
}

// --- Méthode: obtenir tous les descendants ---
CategorySchema.methods.getAllDescendants = async function (
  this: CategoryDocument
): Promise<CategoryDocument[]> {
  const descendants: CategoryDocument[] = []
  const queue: Types.ObjectId[] = [this._id]

  while (queue.length > 0) {
    const currentId = queue.shift()
    if (!currentId) continue

    const children = (await mongoose.models.Category.find({
      parentId: currentId
    })) as CategoryDocument[]

    for (const child of children) {
      descendants.push(child)
      queue.push(child._id as Types.ObjectId)
    }
  }

  return descendants
}

// --- Middleware: empêcher suppression si des enfants existent ---
CategorySchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (this: CategoryDocument, next) {
    const hasChildren = await this.hasChildren()
    if (hasChildren) {
      return next(
        new Error(
          "Impossible de supprimer cette catégorie car elle contient des sous-catégories"
        )
      )
    }
    next()
  }
)

// --- Middleware: générer un slug avant sauvegarde ---
CategorySchema.pre("save", function (this: CategoryDocument, next) {
  if (this.isModified("name")) {
    this.slug = {
      fr: this.name.fr
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      ar: this.name.ar
        .toLowerCase()
        .replace(/[^ء-ي0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }
  }
  next()
})

// --- Export du modèle ---
const Category: Model<CategoryDocument> =
  mongoose.models.Category ||
  mongoose.model<CategoryDocument>("Category", CategorySchema)

export default Category
