"use client"

import React, { useState, useMemo } from "react"
import {
  FolderTree,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Save,
  X,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  AlertTriangle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff
} from "lucide-react"

// Interface pour les catégories
export interface Category {
  id: string
  name: {
    fr: string
    ar: string
  }
  description?: {
    fr: string
    ar: string
  }
  parentId?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface CategoryFormData {
  name: {
    fr: string
    ar: string
  }
  description: {
    fr: string
    ar: string
  }
  parentId: string
  isActive: boolean
}

interface FilterState {
  search: string
  parentFilter: "all" | "root" | "children"
  status: "all" | "active" | "inactive"
}

interface SortState {
  field: "name" | "createdAt" | "updatedAt"
  direction: "asc" | "desc"
}

// Interface pour l'arbre de catégories
interface CategoryTreeNode {
  category: Category
  children: CategoryTreeNode[]
  level: number
}

const AdminCategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [currentLanguage, setCurrentLanguage] = useState<"fr" | "ar">("fr")
  const [showFilters, setShowFilters] = useState(false)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<"tree" | "table">("tree")

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    parentFilter: "all",
    status: "all"
  })

  const [sort, setSort] = useState<SortState>({
    field: "name",
    direction: "asc"
  })

  const [formData, setFormData] = useState<CategoryFormData>({
    name: { fr: "", ar: "" },
    description: { fr: "", ar: "" },
    parentId: "",
    isActive: true
  })

  // Données d'exemple de catégories
  const exampleCategories: Category[] = useMemo(
    () => [
      {
        id: "1",
        name: { fr: "Fils et Bobines", ar: "الخيوط والبكرات" },
        description: {
          fr: "Tous types de fils pour la couture et broderie",
          ar: "جميع أنواع الخيوط للخياطة والتطريز"
        },
        isActive: true,
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2025-01-01")
      },
      {
        id: "2",
        name: { fr: "Fils de Coton", ar: "خيوط القطن" },
        parentId: "1",
        description: {
          fr: "Fils en coton naturel de haute qualité",
          ar: "خيوط من القطن الطبيعي عالي الجودة"
        },
        isActive: true,
        createdAt: new Date("2025-01-02"),
        updatedAt: new Date("2025-01-02")
      },
      {
        id: "3",
        name: { fr: "Fils Polyester", ar: "خيوط البوليستر" },
        parentId: "1",
        description: {
          fr: "Fils synthétiques résistants",
          ar: "خيوط صناعية مقاومة"
        },
        isActive: true,
        createdAt: new Date("2025-01-03"),
        updatedAt: new Date("2025-01-03")
      },
      {
        id: "4",
        name: { fr: "Outils de Couture", ar: "أدوات الخياطة" },
        description: {
          fr: "Tous les outils nécessaires pour la couture",
          ar: "جميع الأدوات اللازمة للخياطة"
        },
        isActive: true,
        createdAt: new Date("2025-01-04"),
        updatedAt: new Date("2025-01-04")
      },
      {
        id: "5",
        name: { fr: "Ciseaux", ar: "المقصات" },
        parentId: "4",
        description: {
          fr: "Ciseaux de couture professionnels",
          ar: "مقصات خياطة مهنية"
        },
        isActive: true,
        createdAt: new Date("2025-01-05"),
        updatedAt: new Date("2025-01-05")
      },
      {
        id: "6",
        name: { fr: "Aiguilles", ar: "الإبر" },
        parentId: "4",
        description: {
          fr: "Aiguilles de différentes tailles",
          ar: "إبر بأحجام مختلفة"
        },
        isActive: true,
        createdAt: new Date("2025-01-06"),
        updatedAt: new Date("2025-01-06")
      },
      {
        id: "7",
        name: { fr: "Aiguilles à Broderie", ar: "إبر التطريز" },
        parentId: "6",
        description: {
          fr: "Aiguilles spécialisées pour la broderie",
          ar: "إبر متخصصة للتطريز"
        },
        isActive: true,
        createdAt: new Date("2025-01-07"),
        updatedAt: new Date("2025-01-07")
      },
      {
        id: "8",
        name: { fr: "Tissus", ar: "الأقمشة" },
        description: {
          fr: "Différents types de tissus",
          ar: "أنواع مختلفة من الأقمشة"
        },
        isActive: false,
        createdAt: new Date("2025-01-08"),
        updatedAt: new Date("2025-01-08")
      }
    ],
    []
  )

  // Initialiser avec les données d'exemple
  React.useEffect(() => {
    setCategories(exampleCategories)
  }, [exampleCategories])

  // Fonction pour vérifier si une catégorie est descendante d'une autre
  const isDescendant = (ancestorId: string, categoryId: string): boolean => {
    const category = categories.find((c) => c.id === categoryId)
    if (!category || !category.parentId) return false
    if (category.parentId === ancestorId) return true
    return isDescendant(ancestorId, category.parentId)
  }

  // Fonction pour obtenir tous les descendants d'une catégorie
  const getAllDescendants = (categoryId: string): string[] => {
    const descendants: string[] = []
    const directChildren = categories.filter((c) => c.parentId === categoryId)

    for (const child of directChildren) {
      descendants.push(child.id)
      descendants.push(...getAllDescendants(child.id))
    }

    return descendants
  }

  // Fonction pour obtenir le chemin complet d'une catégorie
  const getCategoryPath = (categoryId: string): Category[] => {
    const path: Category[] = []
    let currentCategory = categories.find((c) => c.id === categoryId)

    while (currentCategory) {
      path.unshift(currentCategory)
      currentCategory = currentCategory.parentId
        ? categories.find((c) => c.id === currentCategory!.parentId)
        : undefined
    }

    return path
  }

  // Construire l'arbre de catégories
  const buildCategoryTree = (
    parentId?: string,
    level: number = 0
  ): CategoryTreeNode[] => {
    return categories
      .filter((cat) => cat.parentId === parentId)
      .sort((a, b) =>
        a.name[currentLanguage].localeCompare(b.name[currentLanguage])
      )
      .map((category) => ({
        category,
        children: buildCategoryTree(category.id, level + 1),
        level
      }))
  }

  // Obtenir les catégories qui peuvent être parents (éviter les boucles)
  const getAvailableParents = (excludeId?: string): Category[] => {
    if (!excludeId) return categories.filter((c) => c.id !== excludeId)

    const excludeIds = [excludeId, ...getAllDescendants(excludeId)]
    return categories.filter((c) => !excludeIds.includes(c.id))
  }

  const filteredAndSortedCategories = useMemo(() => {
    const result = categories.filter((category) => {
      // Filtre de recherche
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          category.name[currentLanguage].toLowerCase().includes(searchLower) ||
          (category.description &&
            category.description[currentLanguage]
              .toLowerCase()
              .includes(searchLower))
        if (!matchesSearch) return false
      }

      // Filtre par type parent
      switch (filters.parentFilter) {
        case "root":
          if (category.parentId) return false
          break
        case "children":
          if (!category.parentId) return false
          break
      }

      // Filtre par statut
      if (filters.status === "active" && !category.isActive) return false
      if (filters.status === "inactive" && category.isActive) return false

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
        case "createdAt":
          comparison = a.createdAt.getTime() - b.createdAt.getTime()
          break
        case "updatedAt":
          comparison = a.updatedAt.getTime() - b.updatedAt.getTime()
          break
      }

      return sort.direction === "asc" ? comparison : -comparison
    })

    return result
  }, [categories, filters, sort, currentLanguage])

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
      description: { fr: "", ar: "" },
      parentId: "",
      isActive: true
    })
    setIsCreating(false)
    setEditingCategory(null)
  }

  const handleSaveCategory = () => {
    if (!formData.name.fr || !formData.name.ar) {
      alert("Veuillez remplir les noms en français et en arabe")
      return
    }

    // Vérifier les boucles si c'est une modification
    if (editingCategory && formData.parentId) {
      if (formData.parentId === editingCategory.id) {
        alert("Une catégorie ne peut pas être son propre parent")
        return
      }

      if (isDescendant(editingCategory.id, formData.parentId)) {
        alert(
          "Impossible de créer une boucle : cette catégorie est déjà descendante de la catégorie sélectionnée"
        )
        return
      }
    }

    const now = new Date()
    const newCategory: Category = {
      id: editingCategory?.id || `cat-${Date.now()}`,
      name: formData.name,
      description:
        formData.description.fr || formData.description.ar
          ? formData.description
          : undefined,
      parentId: formData.parentId || undefined,
      isActive: formData.isActive,
      createdAt: editingCategory?.createdAt || now,
      updatedAt: now
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingCategory.id ? newCategory : cat))
      )
    } else {
      setCategories((prev) => [...prev, newCategory])
    }

    resetForm()
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description || { fr: "", ar: "" },
      parentId: category.parentId || "",
      isActive: category.isActive
    })
    setIsCreating(true)
  }

  const handleDeleteCategory = (categoryId: string) => {
    const hasChildren = categories.some((cat) => cat.parentId === categoryId)

    if (hasChildren) {
      alert(
        "Impossible de supprimer cette catégorie car elle contient des sous-catégories. Supprimez d'abord les sous-catégories."
      )
      return
    }

    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
    }
  }

  const toggleCategoryStatus = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, isActive: !cat.isActive, updatedAt: new Date() }
          : cat
      )
    )
  }

  const toggleNodeExpansion = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const renderCategoryTree = (nodes: CategoryTreeNode[]): React.ReactNode => {
    return nodes.map((node) => {
      const hasChildren = node.children.length > 0
      const isExpanded = expandedNodes.has(node.category.id)

      return (
        <div key={node.category.id} className="w-full">
          <div
            className={`flex items-center py-2 px-4 hover:bg-gray-50 cursor-pointer border-l-2 ${
              node.category.isActive ? "border-green-500" : "border-red-500"
            }`}
            style={{ marginLeft: `${node.level * 20}px` }}
            onClick={() => hasChildren && toggleNodeExpansion(node.category.id)}
          >
            <div className="flex items-center flex-1 min-w-0">
              {hasChildren ? (
                isExpanded ? (
                  <ChevronDown
                    className="mr-2 text-gray-500 flex-shrink-0"
                    size={16}
                  />
                ) : (
                  <ChevronRight
                    className="mr-2 text-gray-500 flex-shrink-0"
                    size={16}
                  />
                )
              ) : (
                <div className="w-4 mr-2 flex-shrink-0" />
              )}

              {hasChildren ? (
                isExpanded ? (
                  <FolderOpen
                    className="mr-2 text-blue-500 flex-shrink-0"
                    size={16}
                  />
                ) : (
                  <Folder
                    className="mr-2 text-blue-500 flex-shrink-0"
                    size={16}
                  />
                )
              ) : (
                <Folder
                  className="mr-2 text-gray-400 flex-shrink-0"
                  size={16}
                />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-medium truncate ${
                        node.category.isActive
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {node.category.name[currentLanguage]}
                    </p>
                    {node.category.description && (
                      <p className="text-xs text-gray-500 truncate">
                        {node.category.description[currentLanguage]}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        node.category.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {node.category.isActive ? "Actif" : "Inactif"}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleCategoryStatus(node.category.id)
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title={node.category.isActive ? "Désactiver" : "Activer"}
                    >
                      {node.category.isActive ? (
                        <Eye size={14} />
                      ) : (
                        <EyeOff size={14} />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditCategory(node.category)
                      }}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="Modifier"
                    >
                      <Edit size={14} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteCategory(node.category.id)
                      }}
                      className="p-1 text-red-600 hover:text-red-800"
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {hasChildren && isExpanded && (
            <div>{renderCategoryTree(node.children)}</div>
          )}
        </div>
      )
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
  }

  const categoryTree = buildCategoryTree()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <FolderTree className="mr-3" size={32} />
                Gestion des Catégories
              </h1>
              <p className="text-gray-600 mt-2">
                {categories.length} catégorie{categories.length > 1 ? "s" : ""}{" "}
                •{categories.filter((c) => !c.parentId).length} racine
                {categories.filter((c) => !c.parentId).length > 1 ? "s" : ""} •
                {categories.filter((c) => c.isActive).length} active
                {categories.filter((c) => c.isActive).length > 1 ? "s" : ""}
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

              <div className="flex items-center bg-white rounded-lg border">
                <button
                  onClick={() => setViewMode("tree")}
                  className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                    viewMode === "tree"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Arbre
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                    viewMode === "table"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Tableau
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
                Créer une Catégorie
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
                    placeholder="Nom, description..."
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
                  Type
                </label>
                <select
                  value={filters.parentFilter}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      parentFilter: e.target
                        .value as FilterState["parentFilter"]
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="root">Catégories racines</option>
                  <option value="children">Sous-catégories</option>
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
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setFilters({
                    search: "",
                    parentFilter: "all",
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

        {/* Vue en arbre ou tableau */}
        {!isCreating && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {viewMode === "tree" ? (
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    Arbre des Catégories
                  </h3>
                  <button
                    onClick={() => {
                      if (expandedNodes.size === 0) {
                        // Développer tous les nœuds
                        const allIds = new Set(categories.map((c) => c.id))
                        setExpandedNodes(allIds)
                      } else {
                        // Réduire tous les nœuds
                        setExpandedNodes(new Set())
                      }
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {expandedNodes.size === 0
                      ? "Développer tout"
                      : "Réduire tout"}
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {categoryTree.length === 0 ? (
                    <div className="p-8 text-center">
                      <FolderTree
                        className="mx-auto mb-4 text-gray-400"
                        size={48}
                      />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Aucune catégorie trouvée
                      </h3>
                      <p className="text-gray-500">
                        Créez votre première catégorie ou modifiez vos filtres.
                      </p>
                    </div>
                  ) : (
                    renderCategoryTree(categoryTree)
                  )}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("name")}
                          className="flex items-center hover:text-gray-700"
                        >
                          Catégorie
                          {getSortIcon("name")}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chemin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("createdAt")}
                          className="flex items-center hover:text-gray-700"
                        >
                          Créée le
                          {getSortIcon("createdAt")}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAndSortedCategories.map((category) => {
                      const path = getCategoryPath(category.id)
                      const hasChildren = categories.some(
                        (c) => c.parentId === category.id
                      )

                      return (
                        <tr
                          key={category.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {hasChildren ? (
                                  <Folder
                                    className="mr-2 text-blue-500"
                                    size={16}
                                  />
                                ) : (
                                  <Folder
                                    className="mr-2 text-gray-400"
                                    size={16}
                                  />
                                )}
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {category.name[currentLanguage]}
                                  </div>
                                  {category.description && (
                                    <div className="text-sm text-gray-500">
                                      {category.description[currentLanguage]}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-600">
                              {path.map((cat, index) => (
                                <span
                                  key={cat.id}
                                  className="flex items-center"
                                >
                                  {index > 0 && (
                                    <ChevronRight className="mx-1" size={12} />
                                  )}
                                  <span
                                    className={
                                      index === path.length - 1
                                        ? "font-medium text-gray-900"
                                        : ""
                                    }
                                  >
                                    {cat.name[currentLanguage]}
                                  </span>
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                category.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {category.isActive ? "Actif" : "Inactif"}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(category.createdAt)}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  toggleCategoryStatus(category.id)
                                }
                                className={`p-2 rounded-lg ${
                                  category.isActive
                                    ? "text-green-600 hover:bg-green-50"
                                    : "text-gray-400 hover:bg-gray-50"
                                }`}
                                title={
                                  category.isActive ? "Désactiver" : "Activer"
                                }
                              >
                                {category.isActive ? (
                                  <Eye size={16} />
                                ) : (
                                  <EyeOff size={16} />
                                )}
                              </button>
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Modifier"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Supprimer"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {filteredAndSortedCategories.length === 0 &&
              viewMode === "table" && (
                <div className="p-8 text-center">
                  <FolderTree
                    className="mx-auto mb-4 text-gray-400"
                    size={48}
                  />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune catégorie trouvée
                  </h3>
                  <p className="text-gray-500">
                    Créez votre première catégorie ou modifiez vos filtres.
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
                  {editingCategory
                    ? "Modifier la Catégorie"
                    : "Créer une Nouvelle Catégorie"}
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
                    Nom de la catégorie (Français) *
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
                    placeholder="Ex: Fils et Bobines"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la catégorie (Arabe) *
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
                    placeholder="الخيوط والبكرات"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Catégorie parent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie parent (optionnel)
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      parentId: e.target.value
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Aucune (catégorie racine)</option>
                  {getAvailableParents(editingCategory?.id).map((category) => {
                    const path = getCategoryPath(category.id)
                    const pathString = path
                      .map((c) => c.name[currentLanguage])
                      .join(" > ")

                    return (
                      <option key={category.id} value={category.id}>
                        {pathString}
                      </option>
                    )
                  })}
                </select>

                {editingCategory && formData.parentId && (
                  <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle
                        className="mr-2 text-yellow-600 flex-shrink-0 mt-0.5"
                        size={16}
                      />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium">Attention :</p>
                        <p>
                          Modifier la catégorie parent peut affecter
                          l&apos;organisation de vos produits. Assurez-vous que
                          ce changement est intentionnel.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

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
                    placeholder="Description de la catégorie..."
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
                    placeholder="وصف الفئة..."
                    dir="rtl"
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
                  Catégorie active
                </label>
              </div>

              {/* Aperçu de la hiérarchie */}
              {formData.parentId && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">
                    Aperçu de la hiérarchie
                  </h4>
                  <div className="flex items-center text-sm text-gray-600">
                    {getCategoryPath(formData.parentId).map((cat, index) => (
                      <span key={cat.id} className="flex items-center">
                        {index > 0 && (
                          <ChevronRight className="mx-1" size={12} />
                        )}
                        <span>{cat.name[currentLanguage]}</span>
                      </span>
                    ))}
                    <ChevronRight className="mx-1" size={12} />
                    <span className="font-medium text-blue-600">
                      {formData.name[currentLanguage] || "Nouvelle catégorie"}
                    </span>
                  </div>
                </div>
              )}

              {/* Aperçu de la catégorie */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">
                  Aperçu de la catégorie
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nom (FR):</span>
                    <span>{formData.name.fr || "Non défini"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nom (AR):</span>
                    <span dir="rtl">{formData.name.ar || "غير محدد"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span>
                      {formData.parentId
                        ? "Sous-catégorie"
                        : "Catégorie racine"}
                    </span>
                  </div>
                  {formData.parentId && (
                    <div className="flex justify-between">
                      <span>Parent:</span>
                      <span>
                        {categories.find((c) => c.id === formData.parentId)
                          ?.name[currentLanguage] || "Non trouvé"}
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
                onClick={handleSaveCategory}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Save className="mr-2" size={16} />
                {editingCategory ? "Modifier" : "Créer"} la Catégorie
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminCategoriesManager
