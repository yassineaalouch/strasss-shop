import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Le nom du client est requis"],
      trim: true,
      minlength: [2, "Le nom doit contenir au moins 2 caractères"]
    },
    city: {
      type: String,
      required: [true, "La ville est requise"],
      trim: true,
      minlength: [2, "La ville doit contenir au moins 2 caractères"]
    },
    phoneNumber: {
      type: String,
      required: [true, "Le numéro de téléphone est requis"],
      trim: true,
      match: [
        /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
        "Numéro de téléphone invalide"
      ]
    },
    items: [
      {
        id: String,
        name: String,
        category: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],
    subtotal: {
      type: Number,
      required: true
    },
    shipping: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending"
    },
    orderDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)
