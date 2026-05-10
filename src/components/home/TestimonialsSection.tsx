import { getLocale, getTranslations } from "next-intl/server"
import { Quote } from "lucide-react"

type TestimonialItem = {
  quote: string
  name: string
  role: string
}

type ApiTestimonialRow = {
  quote: { fr: string; ar: string }
  name: { fr: string; ar: string }
  role: { fr: string; ar: string }
}

async function fetchDbTestimonials(): Promise<ApiTestimonialRow[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/testimonials`, {
      next: { revalidate: 60 }
    })
    const data = await res.json()
    if (data.success && Array.isArray(data.items) && data.items.length > 0) {
      return data.items.map(
        (it: {
          quote: ApiTestimonialRow["quote"]
          name: ApiTestimonialRow["name"]
          role: ApiTestimonialRow["role"]
        }) => ({
          quote: it.quote,
          name: it.name,
          role: it.role
        })
      )
    }
  } catch {
    // fallback aux traductions statiques
  }
  return []
}

export default async function TestimonialsSection() {
  const locale = (await getLocale()) as "fr" | "ar"
  const t = await getTranslations("Testimonials")

  const dbRows = await fetchDbTestimonials()

  let items: TestimonialItem[]

  if (dbRows.length > 0) {
    items = dbRows.map((row) => ({
      quote:
        row.quote[locale]?.trim() ||
        row.quote.fr?.trim() ||
        row.quote.ar?.trim() ||
        "",
      name:
        row.name[locale]?.trim() ||
        row.name.fr?.trim() ||
        row.name.ar?.trim() ||
        "",
      role:
        row.role[locale]?.trim() ||
        row.role.fr?.trim() ||
        row.role.ar?.trim() ||
        ""
    }))
  } else {
    items = t.raw("items") as TestimonialItem[]
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <Quote
                className="w-8 h-8 text-orange-200 mb-3 shrink-0"
                aria-hidden
              />
              <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">
                {item.quote}
              </p>
              <div className="pt-4 border-t border-gray-100 mt-auto">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
