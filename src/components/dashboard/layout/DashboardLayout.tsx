'use client';

import React, { useState } from 'react';
import { 
  Menu, 
  X,
  ChevronDown,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  User
} from 'lucide-react';
import Image from 'next/image';
import { DashboardLayoutProps, NavigationItem, UserProfile } from '@/types/type';
import { getNavigationItems } from '@/data/sideBarItems';
import Link from 'next/link';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  currentPath = '/dashboard' 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  // Profil utilisateur (remplacer par vos données)
  const userProfile: UserProfile = {
    name: "Taha larhrissi",
    email: "admin@strass-shop.com",
    avatar: "/api/placeholder/40/40",
    role: "Administrateur"
  };

  // Navigation items
  const navigationItems: NavigationItem[] = getNavigationItems(currentPath)

  // Gestion du menu déroulant
  const toggleSubmenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

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
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white shadow-2xl lg:shadow-xl flex flex-col
      `}>
        {/* Logo et fermeture - Section fixe */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-firstColor to-firstColor/80 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-firstColor font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Strass Shop</h1>
              <p className="text-white/80 text-xs">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profil utilisateur - Section fixe */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white shrink-0">
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

        {/* Navigation - Section scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-4">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  {/* Item principal */}
                  <div className="group">
                    {item.submenu ? (
                      <button
                        onClick={() => toggleSubmenu(item.id)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                          ${item.isActive 
                            ? 'bg-firstColor text-white shadow-lg' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }
                          group-hover:scale-[1.02] group-hover:shadow-md
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={item.isActive ? 'text-white' : 'text-gray-400 group-hover:text-firstColor'}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className={`
                              ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full
                              ${item.isActive 
                                ? 'bg-white/20 text-white' 
                                : 'bg-firstColor text-white'
                              }
                            `}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {expandedMenus.has(item.id) ? 
                          <ChevronDown className="w-4 h-4" /> : 
                          <ChevronRight className="w-4 h-4" />
                        }
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`
                          flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                          ${item.isActive 
                            ? 'bg-firstColor text-white shadow-lg' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }
                          group-hover:scale-[1.02] group-hover:shadow-md
                        `}
                      >
                        <span className={item.isActive ? 'text-white' : 'text-gray-400 group-hover:text-firstColor'}>
                          {item.icon}
                        </span>
                        <span className="ml-3">{item.label}</span>
                        {item.badge && (
                          <span className={`
                            ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full
                            ${item.isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-firstColor text-white'
                            }
                          `}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>

                  {/* Sous-menu */}
                  {item.submenu && expandedMenus.has(item.id) && (
                    <div className="mt-1 ml-6 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          className={`
                            block px-3 py-2 text-sm rounded-lg transition-colors
                            ${subItem.isActive || currentPath === subItem.href
                              ? 'bg-firstColor/10 text-firstColor font-medium' 
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
        <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-4 h-4 text-gray-400" />
              <span className="ml-3">Mon profil</span>
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="ml-3">Déconnexion</span>
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
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;