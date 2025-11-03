"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, SlidersHorizontal, X } from "lucide-react"

export function PacksFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSearch(searchParams.get("search") || "")
    setSortBy(searchParams.get("sort") || "newest")
    setMinPrice(searchParams.get("minPrice") || "")
    setMaxPrice(searchParams.get("maxPrice") || "")
  }, [searchParams])

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Reset to page 1 when filters change
    params.delete("page")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters({ search })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    updateFilters({ sort: value })
  }

  const handlePriceFilter = () => {
    updateFilters({ minPrice, maxPrice })
  }

  const clearFilters = () => {
    setSearch("")
    setSortBy("newest")
    setMinPrice("")
    setMaxPrice("")
    router.push(pathname)
  }

  const hasActiveFilters = search || sortBy !== "newest" || minPrice || maxPrice

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-orange-200 bg-white px-4 py-3 font-medium text-orange-600 transition-colors hover:bg-orange-50 lg:hidden"
      >
        <SlidersHorizontal className="h-5 w-5" />
        Filtres {hasActiveFilters && "•"}
      </button>

      {/* Filters Panel - Modern design */}
      <div
        className={`space-y-6 rounded-2xl bg-gradient-to-b from-white to-gray-50 p-6 shadow-xl border-2 border-gray-100 transition-all lg:block ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {/* Header - Modern design */}
        <div className="flex items-center justify-between border-b-2 border-gray-200 pb-4">
          <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md">
              <SlidersHorizontal className="h-5 w-5 text-white" />
            </div>
            Filtres
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs px-3 py-1.5 bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-lg font-medium transition-all duration-200 border border-orange-200"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* Search - Modern design */}
        <div className="p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
          <label className="mb-3 block text-sm font-bold text-gray-800 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
            Rechercher
          </label>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nom du pack..."
              className="w-full rounded-lg border-2 border-gray-200 py-2.5 pl-10 pr-10 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("")
                  updateFilters({ search: "" })
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>

        {/* Sort By - Modern design */}
        <div className="p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
          <label className="mb-3 block text-sm font-bold text-gray-800 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
            Trier par
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 bg-white py-2.5 px-4 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
          >
            <option value="newest">Plus récents</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="discount">Meilleure réduction</option>
          </select>
        </div>

        {/* Price Range - Auto-apply - Modern design */}
        <div className="p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
          <label className="mb-3 block text-sm font-bold text-gray-800 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
            Fourchette de prix (MAD)
          </label>
          <div className="space-y-3">
            <div>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value)
                  // Auto-apply when value changes
                  if (e.target.value || maxPrice) {
                    updateFilters({ minPrice: e.target.value, maxPrice })
                  }
                }}
                placeholder="Min"
                min="0"
                className="w-full rounded-lg border-2 border-gray-200 py-2.5 px-4 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>
            <div>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value)
                  // Auto-apply when value changes
                  if (minPrice || e.target.value) {
                    updateFilters({ minPrice, maxPrice: e.target.value })
                  }
                }}
                placeholder="Max"
                min="0"
                className="w-full rounded-lg border-2 border-gray-200 py-2.5 px-4 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="rounded-lg bg-orange-50 p-4 border border-orange-100">
            <p className="mb-2 text-sm font-semibold text-orange-900">
              Filtres actifs :
            </p>
            <div className="space-y-1 text-sm text-orange-700">
              {search && <p>• Recherche : &apos;{search}&apos;</p>}
              {sortBy !== "newest" && (
                <p>
                  • Tri :{" "}
                  {sortBy === "price-asc"
                    ? "Prix croissant"
                    : sortBy === "price-desc"
                    ? "Prix décroissant"
                    : "Meilleure réduction"}
                </p>
              )}
              {(minPrice || maxPrice) && (
                <p>
                  • Prix : {minPrice || "0"} - {maxPrice || "∞"} MAD
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
