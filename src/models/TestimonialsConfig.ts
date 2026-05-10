import mongoose, { Document, Schema } from "mongoose"

export interface LocalizedPair {
  fr: string
  ar: string
}

export interface TestimonialItemDoc {
  quote: LocalizedPair
  name: LocalizedPair
  role: LocalizedPair
  order: number
}

export interface TestimonialsConfigDocument extends Document {
  singleton: string
  items: TestimonialItemDoc[]
  createdAt: Date
  updatedAt: Date
}

const localizedSchema = new Schema(
  {
    fr: { type: String, default: "" },
    ar: { type: String, default: "" }
  },
  { _id: false }
)

const testimonialItemSchema = new Schema(
  {
    quote: { type: localizedSchema, required: true },
    name: { type: localizedSchema, required: true },
    role: { type: localizedSchema, required: true },
    order: { type: Number, default: 0 }
  },
  { _id: true }
)

const TestimonialsConfigSchema = new Schema<TestimonialsConfigDocument>(
  {
    singleton: {
      type: String,
      default: "home_testimonials",
      unique: true,
      immutable: true
    },
    items: {
      type: [testimonialItemSchema],
      default: []
    }
  },
  { timestamps: true }
)

const TestimonialsConfig =
  mongoose.models.TestimonialsConfig ||
  mongoose.model<TestimonialsConfigDocument>(
    "TestimonialsConfig",
    TestimonialsConfigSchema
  )

export default TestimonialsConfig
