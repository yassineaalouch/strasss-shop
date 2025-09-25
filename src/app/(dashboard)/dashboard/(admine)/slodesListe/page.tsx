"use client"

import React, { useState, useMemo } from "react"
import {
  Tag,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Save,
  X,
  Calendar,
  Percent,
  Gift,
  Ticket,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ToggleRight
} from "lucide-react"

// Types
export type DiscountType = "PERCENTAGE" | "BUY_X_GET_Y" | "COUPON"

export interface Discount {
  id: string
  name: {
    fr: string
    ar: string
  }
  type: DiscountType
  value?: number
  buyQuantity?: number
  getQuantity?: number
  couponCode?: string
  description?: {
    fr: string
    ar: string
  }
  startDate?: Date
  endDate?: Date
  isActive: boolean
}

export interface DiscountFormData {
  name: {
    fr: string
    ar: string
  }
  type: DiscountType
  value: string
  buyQuantity: string
  getQuantity: string
  couponCode: string
  description: {
    fr: string
    ar: string
  }
  startDate: string
  endDate: string
  isActive: boolean
}

export interface FilterState {
  search: string
  type: DiscountType | "all"
  status: "all" | "active" | "inactive" | "expired" | "upcoming"
}

export interface SortState {
  field: "name" | "type" | "startDate" | "endDate"
  direction: "asc" | "desc"
}

const AdminDiscountsManager: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null)
  const [currentLanguage, setCurrentLanguage] = useState<"fr" | "ar">("fr")
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: "all",
    status: "all"
  })

  const [sort, setSort] = useState<SortState>({
    field: "startDate",
    direction: "desc"
  })

  const [formData, setFormData] = useState<DiscountFormData>({
    name: { fr: "", ar: "" },
    type: "PERCENTAGE",
    value: "",
    buyQuantity: "",
    getQuantity: "",
    couponCode: "",
    description: { fr: "", ar: "" },
    startDate: "",
    endDate: "",
    isActive: true
  })

  // Données d'exemple de réductions
  const exampleDiscounts: Discount[] = useMemo(
    () => [
      {
        id: "1",
        name: { fr: "Soldes d'été 2025", ar: "تخفيضات الصيف 2025" },
        type: "PERCENTAGE",
        value: 20,
        description: {
          fr: "Réduction de 20% sur tous les articles d'été",
          ar: "خصم 20% على جميع مقالات الصيف"
        },
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-08-31"),
        isActive: true
      },
      {
        id: "2",
        name: {
          fr: "Achetez 2, obtenez 1 gratuit",
          ar: "اشترِ 2 واحصل على 1 مجاناً"
        },
        type: "BUY_X_GET_Y",
        buyQuantity: 2,
        getQuantity: 1,
        description: {
          fr: "Promotion sur les bobines de fil",
          ar: "عرض ترويجي على بكرات الخيط"
        },
        startDate: new Date("2025-01-15"),
        endDate: new Date("2025-02-15"),
        isActive: true
      },
      {
        id: "3",
        name: { fr: "Code promo COUTURE50", ar: "كود خصم COUTURE50" },
        type: "COUPON",
        value: 50,
        couponCode: "COUTURE50",
        description: {
          fr: "50 DH de réduction avec le code COUTURE50",
          ar: "خصم 50 درهم مع الكود COUTURE50"
        },
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-12-31"),
        isActive: true
      },
      {
        id: "4",
        name: { fr: "Promotion Black Friday", ar: "عرض الجمعة السوداء" },
        type: "PERCENTAGE",
        value: 50,
        description: {
          fr: "Méga réduction pour le Black Friday",
          ar: "خصم كبير للجمعة السوداء"
        },
        startDate: new Date("2025-11-29"),
        endDate: new Date("2025-11-29"),
        isActive: false
      }
    ],
    []
  )

  // Initialiser avec les données d'exemple
  React.useEffect(() => {
    setDiscounts(exampleDiscounts)
  }, [exampleDiscounts])

  const getDiscountStatus = (discount: Discount) => {
    const now = new Date()

    if (!discount.isActive) return "inactive"
    if (discount.endDate && discount.endDate < now) return "expired"
    if (discount.startDate && discount.startDate > now) return "upcoming"
    return "active"
  }

  const getStatusBadge = (discount: Discount) => {
    const status = getDiscountStatus(discount)

    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1" size={12} />
            Actif
          </span>
        )
      case "inactive":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XCircle className="mr-1" size={12} />
            Inactif
          </span>
        )
      case "expired":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <Clock className="mr-1" size={12} />
            Expiré
          </span>
        )
      case "upcoming":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <AlertTriangle className="mr-1" size={12} />À venir
          </span>
        )
    }
  }

  const getTypeIcon = (type: DiscountType) => {
    switch (type) {
      case "PERCENTAGE":
        return <Percent size={16} className="text-blue-500" />
      case "BUY_X_GET_Y":
        return <Gift size={16} className="text-green-500" />
      case "COUPON":
        return <Ticket size={16} className="text-purple-500" />
    }
  }

  const getTypeText = (type: DiscountType) => {
    switch (type) {
      case "PERCENTAGE":
        return "Pourcentage"
      case "BUY_X_GET_Y":
        return "Achetez X, Obtenez Y"
      case "COUPON":
        return "Code Promo"
    }
  }

  const filteredAndSortedDiscounts = useMemo(() => {
    const result = discounts.filter((discount) => {
      // Filtre de recherche
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          discount.name[currentLanguage].toLowerCase().includes(searchLower) ||
          discount.couponCode?.toLowerCase().includes(searchLower) ||
          (discount.description &&
            discount.description[currentLanguage]
              .toLowerCase()
              .includes(searchLower))
        if (!matchesSearch) return false
      }

      // Filtre par type
      if (filters.type !== "all" && discount.type !== filters.type) return false

      // Filtre par statut
      if (filters.status !== "all") {
        const status = getDiscountStatus(discount)
        if (status !== filters.status) return false
      }

      return true
    })

    // Tri
    result.sort((a, b) => {
      let comparison = 0

      switch (sort.field) {
        case "name":
          comparison = a.name[currentLanguage].localeCompare(
            b.name[currentLanguage]
          )
          break
        case "type":
          comparison = a.type.localeCompare(b.type)
          break
        case "startDate":
          const aStart = a.startDate?.getTime() || 0
          const bStart = b.startDate?.getTime() || 0
          comparison = aStart - bStart
          break
        case "endDate":
          const aEnd = a.endDate?.getTime() || 0
          const bEnd = b.endDate?.getTime() || 0
          comparison = aEnd - bEnd
          break
      }

      return sort.direction === "asc" ? comparison : -comparison
    })

    return result
  }, [discounts, filters, sort, currentLanguage])

  const handleSort = (field: SortState["field"]) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }))
  }

  const getSortIcon = (field: SortState["field"]) => {
    if (sort.field !== field) return <ArrowUpDown className="ml-1" size={14} />
    return sort.direction === "asc" ? (
      <ArrowUp className="ml-1" size={14} />
    ) : (
      <ArrowDown className="ml-1" size={14} />
    )
  }

  const resetForm = () => {
    setFormData({
      name: { fr: "", ar: "" },
      type: "PERCENTAGE",
      value: "",
      buyQuantity: "",
      getQuantity: "",
      couponCode: "",
      description: { fr: "", ar: "" },
      startDate: "",
      endDate: "",
      isActive: true
    })
    setIsCreating(false)
    setEditingDiscount(null)
  }

  const handleSaveDiscount = () => {
    if (!formData.name.fr || !formData.name.ar) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Validation selon le type
    if (formData.type === "PERCENTAGE" && !formData.value) {
      alert("Veuillez entrer un pourcentage de réduction")
      return
    }

    if (
      formData.type === "BUY_X_GET_Y" &&
      (!formData.buyQuantity || !formData.getQuantity)
    ) {
      alert("Veuillez entrer les quantités pour l'offre")
      return
    }

    if (formData.type === "COUPON" && !formData.couponCode) {
      alert("Veuillez entrer un code promo")
      return
    }

    const newDiscount: Discount = {
      id: editingDiscount?.id || `discount-${Date.now()}`,
      name: formData.name,
      type: formData.type,
      value: formData.value ? parseFloat(formData.value) : undefined,
      buyQuantity: formData.buyQuantity
        ? parseInt(formData.buyQuantity)
        : undefined,
      getQuantity: formData.getQuantity
        ? parseInt(formData.getQuantity)
        : undefined,
      couponCode: formData.couponCode || undefined,
      description:
        formData.description.fr || formData.description.ar
          ? formData.description
          : undefined,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      isActive: formData.isActive
    }

    if (editingDiscount) {
      setDiscounts((prev) =>
        prev.map((discount) =>
          discount.id === editingDiscount.id ? newDiscount : discount
        )
      )
    } else {
      setDiscounts((prev) => [...prev, newDiscount])
    }

    resetForm()
  }

  const handleEditDiscount = (discount: Discount) => {
    setEditingDiscount(discount)
    setFormData({
      name: discount.name,
      type: discount.type,
      value: discount.value?.toString() || "",
      buyQuantity: discount.buyQuantity?.toString() || "",
      getQuantity: discount.getQuantity?.toString() || "",
      couponCode: discount.couponCode || "",
      description: discount.description || { fr: "", ar: "" },
      startDate: discount.startDate
        ? discount.startDate.toISOString().split("T")[0]
        : "",
      endDate: discount.endDate
        ? discount.endDate.toISOString().split("T")[0]
        : "",
      isActive: discount.isActive
    })
    setIsCreating(true)
  }

  const handleDeleteDiscount = (discountId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette réduction ?")) {
      setDiscounts((prev) =>
        prev.filter((discount) => discount.id !== discountId)
      )
    }
  }

  const toggleDiscountStatus = (discountId: string) => {
    setDiscounts((prev) =>
      prev.map((discount) =>
        discount.id === discountId
          ? { ...discount, isActive: !discount.isActive }
          : discount
      )
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <Tag className="mr-3" size={32} />
                Gestion des Soldes et Promotions
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredAndSortedDiscounts.length} promotion
                {filteredAndSortedDiscounts.length > 1 ? "s" : ""} •
                {
                  discounts.filter((d) => getDiscountStatus(d) === "active")
                    .length
                }{" "}
                active
                {discounts.filter((d) => getDiscountStatus(d) === "active")
                  .length > 1
                  ? "s"
                  : ""}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-lg border">
                <button
                  onClick={() => setCurrentLanguage("fr")}
                  className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                    currentLanguage === "fr"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setCurrentLanguage("ar")}
                  className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                    currentLanguage === "ar"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  AR
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <Filter className="mr-2" size={16} />
                Filtres
              </button>

              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus className="mr-2" size={20} />
                Créer une Promotion
              </button>
            </div>
          </div>
        </div>

        {/* Filtres */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recherche
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Nom, code promo, description..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de promotion
                </label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      type: e.target.value as FilterState["type"]
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tous les types</option>
                  <option value="PERCENTAGE">Pourcentage</option>
                  <option value="BUY_X_GET_Y">Achetez X, Obtenez Y</option>
                  <option value="COUPON">Code Promo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      status: e.target.value as FilterState["status"]
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="expired">Expiré</option>
                  <option value="upcoming">À venir</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setFilters({
                    search: "",
                    type: "all",
                    status: "all"
                  })
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        )}

        {/* Liste des promotions */}
        {!isCreating && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center hover:text-gray-700"
                      >
                        Promotion
                        {getSortIcon("name")}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("type")}
                        className="flex items-center hover:text-gray-700"
                      >
                        Type
                        {getSortIcon("type")}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valeur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("startDate")}
                        className="flex items-center hover:text-gray-700"
                      >
                        Période
                        {getSortIcon("startDate")}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedDiscounts.map((discount) => (
                    <tr
                      key={discount.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {discount.name[currentLanguage]}
                          </div>
                          {discount.description && (
                            <div className="text-sm text-gray-500 mt-1">
                              {discount.description[currentLanguage]}
                            </div>
                          )}
                          {discount.couponCode && (
                            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                              <Ticket className="mr-1" size={12} />
                              {discount.couponCode}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTypeIcon(discount.type)}
                          <span className="ml-2 text-sm text-gray-900">
                            {getTypeText(discount.type)}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {discount.type === "PERCENTAGE" &&
                            discount.value &&
                            `${discount.value}%`}
                          {discount.type === "BUY_X_GET_Y" &&
                            discount.buyQuantity &&
                            discount.getQuantity &&
                            `Achetez ${discount.buyQuantity}, obtenez ${discount.getQuantity}`}
                          {discount.type === "COUPON" &&
                            discount.value &&
                            `${discount.value} DH`}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {discount.startDate && (
                            <div className="flex items-center">
                              <Calendar className="mr-1" size={12} />
                              {formatDate(discount.startDate)}
                            </div>
                          )}
                          {discount.endDate && (
                            <div className="flex items-center text-gray-500 text-xs">
                              au {formatDate(discount.endDate)}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(discount)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleDiscountStatus(discount.id)}
                            className={`p-2 rounded-lg ${
                              discount.isActive
                                ? "text-green-600 hover:bg-green-50"
                                : "text-gray-400 hover:bg-gray-50"
                            }`}
                            title={discount.isActive ? "Désactiver" : "Activer"}
                          >
                            <ToggleRight size={16} />
                          </button>
                          <button
                            onClick={() => handleEditDiscount(discount)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Modifier"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteDiscount(discount.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAndSortedDiscounts.length === 0 && (
              <div className="p-8 text-center">
                <Tag className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune promotion trouvée
                </h3>
                <p className="text-gray-500">
                  Créez votre première promotion ou modifiez vos filtres.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Formulaire de création/édition */}
        {isCreating && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingDiscount
                    ? "Modifier la Promotion"
                    : "Créer une Nouvelle Promotion"}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations de base */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la promotion (Français) *
                  </label>
                  <input
                    type="text"
                    value={formData.name.fr}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: { ...prev.name, fr: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Soldes d'été 2025"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la promotion (Arabe) *
                  </label>
                  <input
                    type="text"
                    value={formData.name.ar}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: { ...prev.name, ar: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="تخفيضات الصيف 2025"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Type de promotion */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de promotion *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(
                    ["PERCENTAGE", "BUY_X_GET_Y", "COUPON"] as DiscountType[]
                  ).map((type) => (
                    <label
                      key={type}
                      className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="discountType"
                        value={type}
                        checked={formData.type === type}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            type: e.target.value as DiscountType
                          }))
                        }
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        {getTypeIcon(type)}
                        <span className="ml-2 text-sm font-medium">
                          {getTypeText(type)}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Champs spécifiques selon le type */}
              {formData.type === "PERCENTAGE" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pourcentage de réduction *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.value}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          value: e.target.value
                        }))
                      }
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="20"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      %
                    </span>
                  </div>
                </div>
              )}

              {formData.type === "BUY_X_GET_Y" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantité à acheter *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.buyQuantity}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          buyQuantity: e.target.value
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantité offerte *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.getQuantity}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          getQuantity: e.target.value
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1"
                    />
                  </div>
                </div>
              )}

              {formData.type === "COUPON" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code promo *
                    </label>
                    <input
                      type="text"
                      value={formData.couponCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couponCode: e.target.value.toUpperCase()
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="COUTURE50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Montant de réduction (DH)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.value}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          value: e.target.value
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="50.00"
                    />
                  </div>
                </div>
              )}

              {/* Descriptions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Français)
                  </label>
                  <textarea
                    value={formData.description.fr}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: { ...prev.description, fr: e.target.value }
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description de la promotion..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Arabe)
                  </label>
                  <textarea
                    value={formData.description.ar}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: { ...prev.description, ar: e.target.value }
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="وصف العرض الترويجي..."
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDate: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        endDate: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Statut actif */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.checked
                    }))
                  }
                  className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium text-gray-700"
                >
                  Promotion active
                </label>
              </div>

              {/* Aperçu de la promotion */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">
                  Aperçu de la promotion
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nom:</span>
                    <span>
                      {formData.name[currentLanguage] || "Non défini"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span>{getTypeText(formData.type)}</span>
                  </div>
                  {formData.type === "PERCENTAGE" && formData.value && (
                    <div className="flex justify-between">
                      <span>Réduction:</span>
                      <span>{formData.value}%</span>
                    </div>
                  )}
                  {formData.type === "BUY_X_GET_Y" &&
                    formData.buyQuantity &&
                    formData.getQuantity && (
                      <div className="flex justify-between">
                        <span>Offre:</span>
                        <span>
                          Achetez {formData.buyQuantity}, obtenez{" "}
                          {formData.getQuantity}
                        </span>
                      </div>
                    )}
                  {formData.type === "COUPON" && (
                    <>
                      {formData.couponCode && (
                        <div className="flex justify-between">
                          <span>Code:</span>
                          <span className="font-mono bg-purple-100 px-2 py-1 rounded">
                            {formData.couponCode}
                          </span>
                        </div>
                      )}
                      {formData.value && (
                        <div className="flex justify-between">
                          <span>Réduction:</span>
                          <span>{formData.value} DH</span>
                        </div>
                      )}
                    </>
                  )}
                  {formData.startDate && formData.endDate && (
                    <div className="flex justify-between">
                      <span>Période:</span>
                      <span>
                        {new Date(formData.startDate).toLocaleDateString(
                          "fr-FR"
                        )}{" "}
                        -{" "}
                        {new Date(formData.endDate).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Statut:</span>
                    <span
                      className={
                        formData.isActive ? "text-green-600" : "text-red-600"
                      }
                    >
                      {formData.isActive ? "Actif" : "Inactif"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveDiscount}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Save className="mr-2" size={16} />
                {editingDiscount ? "Modifier" : "Créer"} la Promotion
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDiscountsManager
