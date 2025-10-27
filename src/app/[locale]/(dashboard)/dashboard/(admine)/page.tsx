"use client"

import React, { useEffect, useState } from "react"
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Star
} from "lucide-react"
const DashboardPage: React.FC = () => {
  const [amount, setAmount] = useState<number | null>(null)

  useEffect(() => {
    // Générer une seule fois au chargement du client
    setAmount(Math.random() * 200 + 50)
  }, [])
  // Données d'exemple pour les stats
  const stats = [
    {
      title: "Revenus Total",
      value: "€45,231",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Commandes",
      value: "1,234",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Clients",
      value: "892",
      change: "+8.1%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Produits",
      value: "156",
      change: "-2.4%",
      trend: "down",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Titre de la page */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenue sur Strass Shop
        </h1>
        <p className="text-gray-600">
          Voici un aperçu de votre boutique aujourd&apos;hui
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp
                    className={`w-4 h-4 mr-1 ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Commandes récentes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Commandes Récentes
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-firstColor/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-firstColor" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Commande #{1000 + i}
                      </p>
                      <p className="text-sm text-gray-500">Client {i}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      €{amount ? amount.toFixed(2) : "--.--"}{" "}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Confirmée
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Produits populaires */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Produits Populaires
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      Produit Strass #{i}
                    </p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-500 ml-1">
                        4.{5 + i} ({10 + i * 3} avis)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
