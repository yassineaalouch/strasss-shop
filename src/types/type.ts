import { ReactNode } from "react"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  isNew?: boolean
  isOnSale?: boolean
  category: string
  material: string
  height: string
  color: string
  inStock: boolean
  quantity: number
  description: string
}

export interface FormData {
  name: string
  price: string
  originalPrice: string
  image: string
  rating: string
  reviews: string
  isNew: boolean
  isOnSale: boolean
  category: string
  material: string
  height: string
  color: string
  inStock: boolean
  description: string
}

export interface FormErrors {
  name?: string
  price?: string
  originalPrice?: string
  image?: string
  rating?: string
  reviews?: string
  category?: string
  material?: string
  height?: string
  color?: string
  description?: string
}

export interface SortOption {
  value: string
  label: string
}

export interface ShopContentProps {
  products: Product[]
}

export interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
}

export interface FilterState {
  category: string[]
  priceRange: [number, number]
  material: string[]
  height: string[]
  color: string[]
  inStock: boolean
  onSale: boolean
  rating: number
}

export interface ProductFilterProps {
  products: Product[]
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  isOpen: boolean
  onClose: () => void
}

export interface ProductSorterProps {
  totalProducts: number
  sortBy: string
  onSortChange: (sortBy: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  onOpenFilters: () => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface Category {
  id: string
  name: string
  image: string
  productCount: number
}

export interface Service {
  icon: React.ReactNode
  title: string
  description: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: string[]
  color: string
}

export interface ContactInfoCardProps {
  contactInfo: ContactInfo
}

export interface OpeningHour {
  day: string
  hours: string
  isToday?: boolean
}

export interface CartContextType {
  cartItems: CartItem[]
  isCartOpen: boolean
  FREE_SHIPPING_THRESHOLD: number
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  updateQuantity: (
    id: string,
    quantity: number,
    color?: string,
    size?: string
  ) => void
  removeItem: (id: string, color?: string, size?: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  totalItems: number
  totalPrice: number
  remainingForFreeShipping: number
  progressPercentage: number
  hasFreeShipping: boolean
}

export interface CartProviderProps {
  children: ReactNode
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  image: string
  color?: string
  size?: string
}

export interface SideCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}

export interface CheckoutFormData {
  customerName: string
  city: string
  phoneNumber: string
}

export interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void
  isProcessing: boolean
  total: number
}

export interface CartSummaryProps {
  items: CartItem[]
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  subtotal: number
  shipping: number
  total: number
}

export interface FormErrors {
  customerName?: string
  city?: string
  phoneNumber?: string
}

export interface BaseEntity {
  id: string
  name: string
}

export interface EntityTableAction {
  type: "view" | "edit" | "delete"
  label: string
  icon: React.ReactNode
  className?: string
  onClick: (item: BaseEntity) => void
}

export interface EntityTableProps {
  data: BaseEntity[]
  title: string
  actions?: EntityTableAction[]
  onSearch?: (query: string) => void
  loading?: boolean
  emptyMessage?: string
}

export interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
  isActive?: boolean
  submenu?: NavigationSubItem[]
}

export interface NavigationSubItem {
  id: string
  label: string
  href: string
  isActive?: boolean
}

export interface UserProfile {
  name: string
  email: string
  avatar?: string
  role: string
}

export interface DashboardLayoutProps {
  children: React.ReactNode
  currentPath?: string
}
