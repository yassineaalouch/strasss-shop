import { notFound } from "next/navigation";

type ProductPageProps = {
  params: { productId: string };
};

// Simule un produit (normalement tu le récupères via API/DB)
async function getProduct(productId: string) {
  const products = [
    {
      id: "1",
      name: "Honey Jar Premium",
      price: 19.99,
      description:
        "Pure natural honey harvested from wildflowers. Rich taste, 100% organic.",
      image:
        "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=800&q=80",
    },
    {
      id: "2",
      name: "Bee Pollen",
      price: 12.5,
      description:
        "Nutrient-rich bee pollen, a natural energy booster with antioxidants.",
      image:
        "https://images.unsplash.com/photo-1621944193602-6e13d5c2c8d4?w=800&q=80",
    },
  ];

  return products.find((p) => p.id === productId) || null;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl shadow-lg object-cover w-full max-h-[500px]"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-xl text-yellow-600 font-semibold mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex space-x-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl shadow-md transition font-medium">
              Add to Cart
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-xl shadow-sm hover:bg-gray-100 transition font-medium">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
