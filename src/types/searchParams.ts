// types/searchParams.ts
export interface SearchParams {
  category?: string | string[]
  characteristics?: string | string[]
  minPrice?: string
  maxPrice?: string
  inStock?: string
  onSale?: string
  isNew?: string
  sortBy?: string
  page?: string
  limit?: string
}

export interface FilterQuery {
  category?: { $in: string[] } | string | { [key: string]: any }
  discount?: string | { [key: string]: any }
  price?: { $gte?: number; $lte?: number }
  quantity?: { $gte?: number; $lte?: number; $gt?: number }
  inStock?: boolean
  isOnSale?: boolean
  isNewProduct?: boolean
  $or?: {
    [key: string]: string[] | boolean | number | object
  }[]
  "Characteristic.values"?: {
    $elemMatch: {
      $or: {
        fr?: { $in: string[] }
        ar?: { $in: string[] }
      }[]
    }
  }
  [key: string]: any // Allow additional properties
}

type SortOrder = 1 | -1

export interface SortOptions {
  [key: string]: SortOrder | undefined
  "name.fr"?: SortOrder
  price?: SortOrder
  createdAt?: SortOrder
}
