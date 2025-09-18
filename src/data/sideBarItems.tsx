// // data/navigationData.tsx
// import {
//   Home,
//   Package,
//   ShoppingCart,
//   Users,
//   BarChart3,
//   Settings,
//   Palette,
//   Tags,
//   Truck,
//   CreditCard,
//   Star,
//   MessageSquare
// } from 'lucide-react';
// import { NavigationItem } from '../types/type';

// export const getNavigationItems = (currentPath: string): NavigationItem[] => [
//   {
//     id: 'dashboard',
//     label: 'Dashboard',
//     icon: <Home className="w-5 h-5" />,
//     href: '/dashboard',
//     isActive: currentPath === '/dashboard'
//   },
//   {
//     id: 'products',
//     label: 'Produits',
//     icon: <Package className="w-5 h-5" />,
//     href: '/dashboard/packsListe',
//     badge: 12,
//     isActive: currentPath.startsWith('/products'),
//     submenu: [
//       { id: 'all-products', label: 'Tous les produits', href: '/dashboard/packsListe' },
//       { id: 'categories', label: 'Catégories', href: '/dashboard/packsListe' },
//       { id: 'variants', label: 'Variants', href: '/dashboard/packsListe' }
//     ]
//   },
//   {
//     id: 'orders',
//     label: 'Commandes',
//     icon: <ShoppingCart className="w-5 h-5" />,
//     href: '/dashboard/orders',
//     badge: 5,
//     isActive: currentPath.startsWith('/orders'),
//     submenu: [
//       { id: 'all-orders', label: 'Toutes les commandes', href: '/orders' },
//       { id: 'pending', label: 'En attente', href: '/orders/pending' },
//       { id: 'shipped', label: 'Expédiées', href: '/orders/shipped' }
//     ]
//   },
//   {
//     id: 'customers',
//     label: 'Clients',
//     icon: <Users className="w-5 h-5" />,
//     href: '/dashboard/customers',
//     isActive: currentPath.startsWith('/customers')
//   },
//   {
//     id: 'design',
//     label: 'Design',
//     icon: <Palette className="w-5 h-5" />,
//     href: '/dashboard/design',
//     isActive: currentPath.startsWith('/design'),
//     submenu: [
//       { id: 'colors', label: 'Couleurs', href: '/design/colors' },
//       { id: 'sizes', label: 'Tailles', href: '/design/sizes' },
//       { id: 'materials', label: 'Matériaux', href: '/design/materials' }
//     ]
//   },
//   {
//     id: 'marketing',
//     label: 'Marketing',
//     icon: <Tags className="w-5 h-5" />,
//     href: '/dashboard/marketing',
//     isActive: currentPath.startsWith('/marketing'),
//     submenu: [
//       { id: 'promotions', label: 'Promotions', href: '/marketing/promotions' },
//       { id: 'coupons', label: 'Coupons', href: '/marketing/coupons' }
//     ]
//   },
//   {
//     id: 'shipping',
//     label: 'Livraison',
//     icon: <Truck className="w-5 h-5" />,
//     href: '/dashboard/shipping',
//     isActive: currentPath.startsWith('/shipping')
//   },
//   {
//     id: 'payments',
//     label: 'Paiements',
//     icon: <CreditCard className="w-5 h-5" />,
//     href: '/dashboard/payments',
//     isActive: currentPath.startsWith('/payments')
//   },
//   {
//     id: 'reviews',
//     label: 'Avis',
//     icon: <Star className="w-5 h-5" />,
//     href: '/dashboard/reviews',
//     badge: 3,
//     isActive: currentPath.startsWith('/reviews')
//   },
//   {
//     id: 'analytics',
//     label: 'Analytics',
//     icon: <BarChart3 className="w-5 h-5" />,
//     href: '/dashboard/analytics',
//     isActive: currentPath.startsWith('/analytics'),
//     submenu: [
//       { id: 'sales', label: 'Ventes', href: '/analytics/sales' },
//       { id: 'traffic', label: 'Trafic', href: '/analytics/traffic' },
//       { id: 'conversion', label: 'Conversion', href: '/analytics/conversion' }
//     ]
//   },
//   {
//     id: 'messages',
//     label: 'Messages',
//     icon: <MessageSquare className="w-5 h-5" />,
//     href: '/dashboard/messages',
//     badge: 8,
//     isActive: currentPath.startsWith('/messages')
//   },
//   {
//     id: 'settings',
//     label: 'Paramètres',
//     icon: <Settings className="w-5 h-5" />,
//     href: '/dashboard/settings',
//     isActive: currentPath.startsWith('/settings'),
//     submenu: [
//       { id: 'general', label: 'Général', href: '/settings/general' },
//       { id: 'users', label: 'Utilisateurs', href: '/settings/users' },
//       { id: 'integrations', label: 'Intégrations', href: '/settings/integrations' }
//     ]
//   }
// ];
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
