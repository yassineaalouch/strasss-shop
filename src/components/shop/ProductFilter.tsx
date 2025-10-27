"use client"

import React, { useEffect, useState } from "react"
import { Filter, X } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import axios from "axios"
import { Category } from "@/types/category"
import { ProductFilterProps } from "@/types/shopFilter"
import { ICharacteristic } from "@/types/characteristic"
import { ChevronDown, ChevronUp } from "lucide-react"
const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onClose
}) => {
  const t = useTranslations("ShopPage.ProductFilter")
  const locale = useLocale() as "fr" | "ar"
  const [categories, setCategories] = useState<string[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [characteristics, setCharacteristics] = useState<ICharacteristic[]>([])
  const [openChar, setOpenChar] = useState<string | null>(null)

  const toggleChar = (id: string) => {
    setOpenChar((prev) => (prev === id ? null : id))
  }

  async function fetchCharacteristics() {
    const res = await axios.get("/api/characteristics")
    setCharacteristics(res.data)
  }

  useEffect(() => {
    fetchCategories()
    fetchCharacteristics()
  }, [])
  //categorie
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true)
      const response = await axios.get("/api/categories")
      if (response.data.success) {
        setCategories(
          response.data.categories.map(
            (category: Category) => category?.name?.[locale]
          )
        )
      }
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error)
      alert("Erreur lors du chargement des catégories")
    } finally {
      setLoadingCategories(false)
    }
  }

  // 🕹 Handlers
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category]
    onFiltersChange({ ...filters, category: newCategories })
  }

  const handleCharacteristicChange = (value: string) => {
    const newValues = filters.characteristics.includes(value)
      ? filters.characteristics.filter((v) => v !== value)
      : [...filters.characteristics, value]
    onFiltersChange({ ...filters, characteristics: newValues })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: [],
      priceRange: [0, 5000],
      characteristics: [],
      inStock: false,
      onSale: false,
      isNew: false
    })
  }

  // 💻 Classes pour sidebar
  const sidebarClasses = `fixed lg:relative inset-y-0 z-50 lg:z-40 left-0 w-80 bg-white shadow-lg lg:shadow-none transform ${
    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
  } transition-transform duration-300 ease-in-out lg:block`

  // 🔍 Si des filtres actifs
  const hasActiveFilters =
    filters.category.length > 0 ||
    filters.characteristics.length > 0 ||
    filters.inStock ||
    filters.onSale ||
    filters.isNew

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        ></div>
      )}

      <div className={sidebarClasses}>
        <div className="p-4 sm:p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Filter className="mr-2" size={20} />
              {t("title")}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearAllFilters}
                className="text-sm text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
              >
                {t("reset")}
              </button>
              <button
                onClick={onClose}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Prix */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
              {t("sections.price.title")}
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder={t("sections.price.min")}
                value={filters.priceRange[0]}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    priceRange: [
                      parseInt(e.target.value) || 0,
                      filters.priceRange[1]
                    ]
                  })
                }
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <span>-</span>
              <input
                type="number"
                placeholder={t("sections.price.max")}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    priceRange: [
                      filters.priceRange[0],
                      parseInt(e.target.value) || 5000
                    ]
                  })
                }
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Catégories */}
          {categories.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
                {t("sections.categories.title")}
              </h3>
              <div className="space-y-2">
                {!loadingCategories ? (
                  categories.map((category, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-3 text-yellow-500 focus:ring-yellow-500 rounded"
                      />
                      <span className="text-sm text-gray-700 flex-1">
                        {category}
                      </span>
                    </label>
                  ))
                ) : (
                  <div>loding</div>
                )}
              </div>
            </div>
          )}

          {/* Caractéristiques */}
          {characteristics.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">
                {t("sections.characteristics.title")}
              </h3>

              <div className="space-y-4">
                {characteristics.map((char) => (
                  <div
                    key={char._id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Header de la caractéristique */}
                    <button
                      type="button"
                      onClick={() => toggleChar(char._id)}
                      className="w-full flex justify-between items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span className="text-gray-800 font-medium">
                        {char.name[locale]}
                      </span>
                      {openChar === char._id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    {/* Contenu déroulant */}
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        openChar === char._id
                          ? "max-h-60 opacity-100"
                          : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      <div className="p-3 space-y-2">
                        {char.values.map((val, j) => {
                          const label = val.name[locale]
                          const isChecked =
                            filters.characteristics.includes(label)

                          return (
                            <label
                              key={j}
                              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() =>
                                  handleCharacteristicChange(label)
                                }
                                className="text-yellow-500 focus:ring-yellow-500 rounded"
                              />
                              <span className="text-sm text-gray-700">
                                {label}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Options */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
              {t("sections.options.title")}
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, inStock: e.target.checked })
                  }
                  className="mr-3 text-yellow-500 focus:ring-yellow-500 rounded"
                />
                <span className="text-sm text-gray-700 flex-1">
                  {t("sections.options.inStock")}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={filters.onSale}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, onSale: e.target.checked })
                  }
                  className="mr-3 text-yellow-500 focus:ring-yellow-500 rounded"
                />
                <span className="text-sm text-gray-700 flex-1">
                  {t("sections.options.onSale")}
                </span>
              </label>

              <label className="flex items-baseline gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={filters.isNew}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, isNew: e.target.checked })
                  }
                  className="mr-3 text-yellow-500 focus:ring-yellow-500 rounded"
                />
                <span className="text-sm text-gray-700 flex-1">
                  {t("sections.options.isNew")}
                </span>
              </label>
            </div>
          </div>

          {/* Filtres actifs */}
          {hasActiveFilters && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                {t("activeFilters")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {filters.category.map((category) => (
                  <span
                    key={category}
                    className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg text-xs flex items-center border border-yellow-200"
                  >
                    {category}
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className="ml-2 hover:text-yellow-900"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {filters.characteristics.map((char) => (
                  <span
                    key={char}
                    className="bg-green-50 text-green-700 px-2 py-1 rounded-lg text-xs flex items-center border border-green-200"
                  >
                    {char}
                    <button
                      onClick={() => handleCharacteristicChange(char)}
                      className="ml-2 hover:text-green-900"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductFilter
