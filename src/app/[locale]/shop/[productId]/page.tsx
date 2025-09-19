import Image from "next/image";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ productId: string }>;
};

// Simule un produit (API/DB plus tard)
async function getProduct(productId: string) {
  const products = [
    {
      id: "1",
      name: "Honey Jar Premium",
      price: 19.99,
      description:
        "Pure natural honey harvested from wildflowers. Rich taste, 100% organic.",    image: "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg",

    },
    {
      id: "2",
      name: "Bee Pollen",
      price: 12.5,
      description:
        "Nutrient-rich bee pollen, a natural energy booster with antioxidants.",    image: "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg",

    },
  ];

  return products.find((p) => p.id === productId) || null;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // ✅ attendre params
  const { productId } = await params;

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            height={500}
            width={500}
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
