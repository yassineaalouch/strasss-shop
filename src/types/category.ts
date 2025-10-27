export interface CategoryName {
  fr: string
  ar: string
}

export interface CategoryDescription {
  fr: string
  ar: string
}
export interface CategoriesHomPageSection {
  id: string
  name: {
    fr: string
    ar: string
  }
  image: string
  productCount: number
}
export interface Category {
  _id: string
  name: CategoryName
  description?: CategoryDescription
  parentId?: string
  isActive: boolean
  slug?: CategoryName
  order?: number
  createdAt: string
  updatedAt: string
}

export interface CategoryFormData {
  name: CategoryName
  description: CategoryDescription
  parentId: string
  isActive: boolean
}

export interface CategoryRequestBody {
  name: CategoryName
  description?: CategoryDescription
  parentId?: string
  isActive: boolean
}

export interface CategoryResponse {
  success: boolean
  message?: string
  category?: Category
  categories?: Category[]
  errors?: string[]
}

export interface FilterState {
  search: string
  parentFilter: "all" | "root" | "children"
  status: "all" | "active" | "inactive"
}

export interface SortState {
  field: "name" | "createdAt" | "updatedAt"
  direction: "asc" | "desc"
}

export interface CategoryTreeNode {
  category: Category
  children: CategoryTreeNode[]
  level: number
}
