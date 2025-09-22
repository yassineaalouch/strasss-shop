import { NavigationItem } from "@/types/type"
import {
  Home,
  Package,
  Percent,
  ShoppingCart,
  BarChart3,
  Settings
} from "lucide-react"

export const getNavigationItems = (currentPath: string): NavigationItem[] => [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    href: "/dashboard",
    isActive: currentPath === "/dashboard"
  },
  {
    id: "products",
    label: "Produits",
    icon: <Package className="w-5 h-5" />,
    href: "/dashboard/products",
    isActive: currentPath.startsWith("/dashboard/products"),
    submenu: [
      {
        id: "all-products",
        label: "Tous les produits",
        href: "/dashboard/products"
      },
      { id: "categories", label: "Catégories", href: "/dashboard/categories" },
      { id: "properties", label: "Propriétés", href: "/dashboard/properties" },
      { id: "packs", label: "Packs", href: "/dashboard/packs" }
    ]
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: <Percent className="w-5 h-5" />,
    href: "/dashboard/marketing",
    isActive: currentPath.startsWith("/dashboard/marketing"),
    submenu: [
      { id: "promotions", label: "Promotions", href: "/dashboard/promotions" },
      { id: "coupons", label: "Coupons", href: "/dashboard/coupons" }
    ]
  },
  {
    id: "orders",
    label: "Commandes",
    icon: <ShoppingCart className="w-5 h-5" />,
    href: "/dashboard/orders",
    isActive: currentPath.startsWith("/dashboard/orders"),
    submenu: [
      {
        id: "all-orders",
        label: "Toutes les commandes",
        href: "/dashboard/orders"
      },
      { id: "pending", label: "En attente", href: "/dashboard/orders/pending" },
      { id: "shipped", label: "Expédiées", href: "/dashboard/orders/shipped" }
    ]
  },
  {
    id: "analytics",
    label: "Statistiques",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/dashboard/analytics",
    isActive: currentPath.startsWith("/dashboard/analytics")
  },
  {
    id: "settings",
    label: "Paramètres",
    icon: <Settings className="w-5 h-5" />,
    href: "/dashboard/settings",
    isActive: currentPath.startsWith("/settings")
  }
]
