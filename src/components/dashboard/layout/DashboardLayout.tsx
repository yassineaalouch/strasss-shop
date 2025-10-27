"use client"

import React, { useState } from "react"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  User,
  ChevronLeft,
  Home,
  Package,
  ShoppingCart,
  Settings,
  Percent,
  Boxes,
  Layers,
  LayoutDashboard,
  Palette
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Types
interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  isActive: boolean
  badge?: string
  submenu?: NavigationItem[]
}

interface UserProfile {
  name: string
  email: string
  avatar: string
  role: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const currentPath = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set())
  console.log("currentPath", currentPath)
  // Profil utilisateur
  const userProfile: UserProfile = {
    name: "Taha larhrissi",
    email: "admin@strass-shop.com",
    avatar: "/api/placeholder/40/40",
    role: "Administrateur"
  }

  // Navigation items (exemple)
  const navigationItems: NavigationItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: "/dashboard",
      isActive:
        currentPath.toLowerCase() === "/fr/dashboard" ||
        currentPath.toLowerCase() === "/ar/dashboard"
    },
    {
      id: "orders",
      label: "Commandes",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/dashboard/ordersListe",
      isActive: currentPath.includes("/dashboard/orders")
    },
    {
      id: "products",
      label: "Produits",
      icon: <Package className="w-5 h-5" />,
      href: "/dashboard/productList",
      isActive: currentPath.includes("/dashboard/productList")
    },
    {
      id: "packs",
      label: "Packs",
      icon: <Boxes className="w-5 h-5" />,
      href: "/dashboard/packsListe",
      isActive: currentPath.includes("/dashboard/packsListe")
    },
    {
      id: "categories",
      label: "Catégories",
      icon: <Layers className="w-5 h-5" />,
      href: "/dashboard/categoriesListe",
      isActive: currentPath.includes("/dashboard/categoriesListe")
    },
    {
      id: "properties",
      label: "characteristiques",
      icon: <Palette className="w-5 h-5" />,
      href: "/dashboard/characteristics",
      isActive: currentPath.includes("/dashboard/characteristics")
    },
    {
      id: "hero",
      label: "Hero Content",
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: "/dashboard/pagesContent",
      isActive: currentPath.includes("/dashboard/pagesContent")
    },
    {
      id: "marketing",
      label: "Marketing",
      icon: <Percent className="w-5 h-5" />,
      href: "/dashboard/soldesListe",
      isActive: currentPath.includes("/dashboard/soldesListe")
    },
    {
      id: "settings",
      label: "Paramètres",
      icon: <Settings className="w-5 h-5" />,
      href: "/dashboard/settings",
      isActive: currentPath.includes("/dashboard/settings")
    }
  ]

  // Gestion du menu déroulant
  const toggleSubmenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus)
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId)
    } else {
      newExpanded.add(menuId)
    }
    setExpandedMenus(newExpanded)
  }

  // Largeur de la sidebar selon l'état
  const sidebarWidth = sidebarCollapsed ? "w-16" : "w-72"

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${sidebarWidth}
        bg-white shadow-2xl lg:shadow-xl flex flex-col
      `}
      >
        {/* Logo et contrôles - Section fixe */}
        <div
          className={`
          flex items-center h-16 px-4 border-b border-gray-200 bg-gradient-to-r from-firstColor to-firstColor/80 shrink-0
          ${sidebarCollapsed ? "justify-center" : "justify-between"}
        `}
        >
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="logo"
                  height={32}
                  width={32}
                  className="object-cover rounded-lg animate-bounce"
                />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Strass Shop</h1>
                <p className="text-white/80 text-xs">Admin Panel</p>
              </div>
            </div>
          )}

          {sidebarCollapsed && (
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="logo"
                height={32}
                width={32}
                className="w-full h-full object-cover rounded-lg animate-bounce"
              />
            </div>
          )}

          {/* Bouton collapse/expand pour desktop */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>

          {/* Bouton fermeture pour mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profil utilisateur - Section fixe */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={userProfile.avatar || "/api/placeholder/40/40"}
                  alt="T.L"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-firstColor/20"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {userProfile.name}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {userProfile.role}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Avatar réduit pour mode collapsed */}
        {sidebarCollapsed && (
          <div className="p-2 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white shrink-0 flex justify-center">
            <div className="relative">
              <Image
                src={userProfile.avatar || "/api/placeholder/32/32"}
                alt="T.L"
                width={32}
                height={32}
                className="rounded-full border-2 border-firstColor/20"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        )}

        {/* Navigation - Section scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className={sidebarCollapsed ? "px-2 py-4" : "px-4 py-4"}>
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  {/* Item principal */}
                  <div className="group relative">
                    {item.submenu && !sidebarCollapsed ? (
                      <button
                        onClick={() => toggleSubmenu(item.id)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                          ${
                            item.isActive
                              ? "bg-firstColor text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }
                          group-hover:scale-[1.02] group-hover:shadow-md
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={
                              item.isActive
                                ? "text-white"
                                : "text-gray-400 group-hover:text-firstColor"
                            }
                          >
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                          {item.badge && (
                            <span
                              className={`
                              ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full
                              ${
                                item.isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-firstColor text-white"
                              }
                            `}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {expandedMenus.has(item.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`
                          flex items-center ${
                            sidebarCollapsed
                              ? "justify-center px-3 py-3"
                              : "px-3 py-2.5"
                          } text-sm font-medium rounded-lg transition-all duration-200 relative
                          ${
                            item.isActive
                              ? "bg-firstColor text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }
                          group-hover:scale-[1.02] group-hover:shadow-md
                        `}
                        title={sidebarCollapsed ? item.label : undefined}
                      >
                        <span
                          className={
                            item.isActive
                              ? "text-white"
                              : "text-gray-400 group-hover:text-firstColor"
                          }
                        >
                          {item.icon}
                        </span>
                        {!sidebarCollapsed && (
                          <>
                            <span className="ml-3">{item.label}</span>
                            {item.badge && (
                              <span
                                className={`
                                ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full
                                ${
                                  item.isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-firstColor text-white"
                                }
                              `}
                              >
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}

                        {/* Badge pour mode collapsed */}
                        {sidebarCollapsed && item.badge && (
                          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-firstColor rounded-full">
                            {item.badge}
                          </span>
                        )}

                        {/* Tooltip pour mode collapsed */}
                        {sidebarCollapsed && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                            {item.label}
                          </div>
                        )}
                      </Link>
                    )}
                  </div>

                  {/* Sous-menu */}
                  {item.submenu &&
                    expandedMenus.has(item.id) &&
                    !sidebarCollapsed && (
                      <div className="mt-1 ml-6 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className={`
                            block px-3 py-2 text-sm rounded-lg transition-colors
                            ${
                              subItem.isActive || currentPath === subItem.href
                                ? "bg-firstColor/10 text-firstColor font-medium"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }
                          `}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Actions du bas - Section fixe */}
        <div
          className={`p-4 border-t border-gray-200 bg-gray-50 shrink-0 ${
            sidebarCollapsed ? "px-2" : "px-4"
          }`}
        >
          <div className="space-y-2">
            <button
              className={`
                w-full flex items-center text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group relative
                ${sidebarCollapsed ? "justify-center px-3 py-3" : "px-3 py-2"}
              `}
              title={sidebarCollapsed ? "Mon profil" : undefined}
            >
              <User className="w-4 h-4 text-gray-400" />
              {!sidebarCollapsed && <span className="ml-3">Mon profil</span>}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  Mon profil
                </div>
              )}
            </button>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className={`
                w-full flex items-center text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors group relative
                ${sidebarCollapsed ? "justify-center px-3 py-3" : "px-3 py-2"}
              `}
              title={sidebarCollapsed ? "Déconnexion" : undefined}
            >
              <LogOut className="w-4 h-4" />
              {!sidebarCollapsed && <span className="ml-3">Déconnexion</span>}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  Déconnexion
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Menu burger et titre */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Dashboard
                </h2>
                <p className="text-sm text-gray-500">
                  Gérez votre boutique Strass
                </p>
              </div>
            </div>

            {/* Actions header */}
            <div className="flex items-center space-x-4">
              {/* Recherche */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-firstColor focus:border-firstColor transition-colors w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Avatar utilisateur */}
              <div className="flex items-center space-x-2">
                <Image
                  src={userProfile.avatar || "/api/placeholder/32/32"}
                  alt="T.L"
                  width={32}
                  height={32}
                  className="rounded-full border border-gray-300"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {userProfile.name}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
