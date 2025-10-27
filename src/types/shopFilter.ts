export interface FilterState {
  category: string[]
  priceRange: [number, number]
  characteristics: string[]
  inStock: boolean
  onSale: boolean
  isNewCategory: boolean
}

export interface ProductFilterProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  isOpen: boolean
  onClose: () => void
}
