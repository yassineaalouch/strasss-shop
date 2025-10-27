import ShopContent from "@/components/shop/ShopContent"
import { Product } from "@/types/product"

const ShopPage: React.FC = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store" // Pour toujours avoir les données à jour
  })

  const data = await res.json()

  const products: Product[] = data?.products || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ShopContent products={products} />
      </div>
    </div>
  )
}

export default ShopPage
