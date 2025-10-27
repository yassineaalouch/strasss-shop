import { Product } from "./product"

// Interface locale pour gérer les produits sélectionnés avec leur objet complet
export interface SelectedPackItem {
  productId: string
  product: Product
  quantity: number
}
