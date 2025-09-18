"use client"

import React from "react"
import { BaseEntity, EntityTableAction } from "@/types/type"
import { Eye, Edit, Trash2 } from "lucide-react"
import EntityTable from "@/components/dashboard/CreativeTable"

const SimpleTableExample: React.FC = () => {
  // Données d'exemple
  const products: BaseEntity[] = [
    { id: "1", name: "iPhone 15 Pro Max" },
    { id: "2", name: "MacBook Air M2" },
    { id: "3", name: "AirPods Pro 2" },
    { id: "4", name: "iPad Air" },
    { id: "5", name: "Apple Watch Series 9" }
  ]

  const categories: BaseEntity[] = [
    { id: "1", name: "Smartphones" },
    { id: "2", name: "Ordinateurs" },
    { id: "3", name: "Audio" },
    { id: "4", name: "Tablettes" }
  ]

  const variants: BaseEntity[] = [
    { id: "1", name: "iPhone Noir 128Go" },
    { id: "2", name: "iPhone Blanc 256Go" },
    { id: "3", name: "iPhone Bleu 512Go" },
    { id: "4", name: "MacBook Silver 8GB" },
    { id: "5", name: "MacBook Space Gray 16GB" }
  ]

  // Actions personnalisées
  const customActions: EntityTableAction[] = [
    {
      type: "view",
      label: "Voir détails",
      icon: <Eye className="w-4 h-4" />,
      className: "text-blue-600 hover:text-blue-800 hover:bg-blue-50",
      onClick: (item) => alert(`Voir: ${item.name}`)
    },
    {
      type: "edit",
      label: "Modifier",
      icon: <Edit className="w-4 h-4" />,
      className: "text-green-600 hover:text-green-800 hover:bg-green-50",
      onClick: (item) => alert(`Modifier: ${item.name}`)
    },
    {
      type: "delete",
      label: "Supprimer",
      icon: <Trash2 className="w-4 h-4" />,
      className: "text-red-600 hover:text-red-800 hover:bg-red-50",
      onClick: (item) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer "${item.name}" ?`)) {
          alert(`Supprimé: ${item.name}`)
        }
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Tableau des Produits */}
        <EntityTable
          data={products}
          title="Produits"
          actions={customActions}
          onSearch={(query) => console.log("Recherche produits:", query)}
          emptyMessage="Aucun produit trouvé"
        />

        {/* Tableau des Catégories */}
        <EntityTable
          data={categories}
          title="Catégories"
          actions={customActions}
          onSearch={(query) => console.log("Recherche catégories:", query)}
          emptyMessage="Aucune catégorie trouvée"
        />

        {/* Tableau des Variants */}
        <EntityTable
          data={variants}
          title="Variants"
          actions={customActions}
          onSearch={(query) => console.log("Recherche variants:", query)}
          emptyMessage="Aucun variant trouvé"
        />
      </div>
    </div>
  )
}

export default SimpleTableExample
