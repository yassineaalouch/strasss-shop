"use client"

import React, { useState, useMemo } from "react"
import { Search, Eye, Edit, Trash2 } from "lucide-react"
import { EntityTableAction, EntityTableProps } from "@/types/type"

const EntityTable: React.FC<EntityTableProps> = ({
  data,
  title,
  actions = [],
  onSearch,
  loading = false,
  emptyMessage = "Aucun élément trouvé"
}) => {
  const [searchQuery, setSearchQuery] = useState("")

  // Actions par défaut
  const defaultActions: EntityTableAction[] = [
    {
      type: "view",
      label: "Voir",
      icon: <Eye className="w-4 h-4" />,
      className: "text-blue-600 hover:text-blue-800 hover:bg-blue-50",
      onClick: (item) => console.log("Voir:", item)
    },
    {
      type: "edit",
      label: "Modifier",
      icon: <Edit className="w-4 h-4" />,
      className: "text-green-600 hover:text-green-800 hover:bg-green-50",
      onClick: (item) => console.log("Modifier:", item)
    },
    {
      type: "delete",
      label: "Supprimer",
      icon: <Trash2 className="w-4 h-4" />,
      className: "text-red-600 hover:text-red-800 hover:bg-red-50",
      onClick: (item) => console.log("Supprimer:", item)
    }
  ]

  const finalActions = actions.length > 0 ? actions : defaultActions

  // Filtrage des données par nom
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [data, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  if (loading) {
    return <EntityTableSkeleton title={title} />
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-firstColor to-firstColor/80 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-sm font-medium text-white">
              {filteredData.length} élément(s)
            </span>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="border-b border-gray-200 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-firstColor focus:border-firstColor transition-colors text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Contenu du tableau */}
      {filteredData.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {emptyMessage}
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? "Aucun résultat pour votre recherche"
              : "Aucun élément disponible"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Nom */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-firstColor/10 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-firstColor font-semibold text-sm">
                          {item.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 font-mono">
                          ID: {item.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {finalActions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(item)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            action.className ||
                            "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                          }`}
                          title={action.label}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const EntityTableSkeleton: React.FC<{ title: string }> = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* En-tête skeleton */}
      <div className="bg-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
        </div>
      </div>

      {/* Barre de recherche skeleton */}
      <div className="border-b border-gray-200 p-6">
        <div className="h-12 bg-gray-200 rounded-lg w-80 animate-pulse"></div>
      </div>

      {/* Contenu skeleton */}
      <div className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EntityTable
