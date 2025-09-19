import React from "react"
import { Star } from "lucide-react"
import { Product, ProductCardProps } from "@/types/type"
import Image from "next/image"
import { useLocale } from "next-intl"

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  if (viewMode === "list") {
    return <ProductCardListView product={product} />
  }

  return <ProductCardStandard product={product} />
}
export function ProductCardListView({ product }: { product: Product }) {
  const locale = useLocale()
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
      <div className="w-32 h-32 flex-shrink-0">
        <Image
          src={product.image}
          alt={
            locale === "ar" ? product.name.arabicName : product.name.franshName
          }
          height={500}
          width={500}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {locale === "ar"
                ? product.name.arabicName
                : product.name.franshName}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {locale === "ar"
                ? product.description.arabicDescription
                : product.description.franshDescription}
            </p>

            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={
                      i < Math.floor(product.rating) ? "currentColor" : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews})</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Catégorie: {product.category}</span>
              <span>Matériau: {product.material}</span>
              <span>Hauteur: {product.height}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl font-bold text-firstColor">
                {product.price} DH
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice} DH
                </span>
              )}
            </div>

            <div className="flex space-x-2 mb-2">
              {product.isNew && (
                <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded">
                  Nouveau
                </span>
              )}
              {product.isOnSale && (
                <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                  Promo
                </span>
              )}
              {!product.inStock && (
                <span className="bg-gray-500 text-white px-2 py-1 text-xs rounded">
                  Rupture
                </span>
              )}
            </div>

            <button
              className={`px-6 py-2 rounded font-medium transition-colors duration-300 ${
                product.inStock
                  ? "bg-firstColor text-white hover:bg-secondColor"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              disabled={!product.inStock}
            >
              {product.inStock ? "Ajouter au panier" : "Indisponible"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export function ProductCardStandard({ product }: { product: Product }) {
  const locale = useLocale()
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="w-full flex justify-center items-center">
          <Image
            src={product.image}
            alt={
              locale === "ar"
                ? product.name.arabicName
                : product.name.franshName
            }
            height={250}
            width={250}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded">
              Nouveau
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
              Promo
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white px-2 py-1 text-xs rounded">
              Rupture
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {locale === "ar" ? product.name.arabicName : product.name.franshName}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        <div className="text-xs text-gray-500 mb-3">
          <div>
            {product.category} • {product.material}
          </div>
          <div>
            Hauteur: {product.height} • Couleur: {product.color}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-firstColor">
              {product.price} DH
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice} DH
              </span>
            )}
          </div>
        </div>

        <button
          className={`w-full py-2 rounded font-medium transition-colors duration-300 ${
            product.inStock
              ? "bg-firstColor text-white hover:bg-secondColor"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
          disabled={!product.inStock}
        >
          {product.inStock ? "Ajouter au panier" : "Indisponible"}
        </button>
      </div>
    </div>
  )
}
export default ProductCard
