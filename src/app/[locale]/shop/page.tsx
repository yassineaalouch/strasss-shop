import ShopContent from "@/components/shop/ShopContent"
import { productsListDemo } from "@/data/data"

const ShopPage: React.FC = async () => {
  const products = productsListDemo

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Le contenu interactif est délégué au composant client */}
        <ShopContent products={products} />
      </div>
    </div>
  )
}

export default ShopPage
