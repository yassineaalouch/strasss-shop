// app/packs/page.tsx
import { Suspense } from "react"
import { Metadata } from "next"
import { PacksFilters } from "@/components/packs/PacksFilters"
import { PacksSkeleton } from "@/components/packs/PacksSkeleton"
import { PacksGrid } from "@/components/packs/PacksGrid"

export const metadata: Metadata = {
  title: "Nos Packs Promotionnels | Économisez sur vos produits préférés",
  description:
    "Découvrez nos packs de produits à prix réduits. Profitez d'offres exceptionnelles sur une sélection de produits groupés.",
  openGraph: {
    title: "Packs Promotionnels",
    description: "Économisez avec nos packs de produits sélectionnés",
    type: "website"
  }
}

interface PageProps {
  searchParams: Promise<{
    page?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
    search?: string
  }>
}

export default async function PacksPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const sortBy = params.sort || "newest"
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined
  const searchQuery = params.search || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Nos Packs Exclusifs
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Économisez jusqu&apos;à 30% en achetant nos packs de produits
              soigneusement sélectionnés
            </p>
          </div>
        </div>
        {/* Decorative waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(255 247 237)"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Filters - Client Component */}
          <aside className="lg:sticky lg:top-4 lg:h-fit">
            <PacksFilters />
          </aside>

          {/* Packs Grid - Server Component with Suspense */}
          <main>
            <Suspense
              key={`${currentPage}-${sortBy}-${minPrice}-${maxPrice}-${searchQuery}`}
              fallback={<PacksSkeleton />}
            >
              <PacksGrid
                page={currentPage}
                sortBy={sortBy}
                minPrice={minPrice}
                maxPrice={maxPrice}
                searchQuery={searchQuery}
              />
            </Suspense>
          </main>
        </div>
      </section>
    </div>
  )
}
