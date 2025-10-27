import React from "react"
import { CategoriesHomPageSection } from "@/types/category"
import HeroSection from "@/components/home/HeroSection"
import ProductCard from "@/components/shop/ProductCard"
import WhyChooseUs from "@/components/WhyCoseUs"
import { getTranslations, getLocale } from "next-intl/server"
import Image from "next/image"
import { Product } from "@/types/product"

const CategoriesSection = async () => {
  const t = await getTranslations("HomePage")
  const locale = (await getLocale()) as "fr" | "ar"

  const categories: CategoriesHomPageSection[] = [
    {
      id: "1",
      name: {
        fr: "Tissus",
        ar: "أقمشة"
      },
      image:
        "https://www.tissus-price.com/img/cms/IMG%20BLOG/tissu-burlington-pas-cher.jpg",
      productCount: 120
    },
    {
      id: "2",
      name: {
        fr: "Fils et Aiguilles",
        ar: "خيوط وإبر"
      },
      image:
        "https://www.lerobert.com/sites/default/files/scald_image/dico-en-ligne-le-robert-de-fil-en-aiguille-marcelle-ratafia.jpg",
      productCount: 75
    },
    {
      id: "3",
      name: {
        fr: "Boutons et Fermetures",
        ar: "أزرار وإغلاق"
      },
      image:
        "https://img.leboncoin.fr/api/v1/lbcpb1/images/1b/9a/d2/1b9ad2c9d7b8c8841a1f0e84104f648308aa6d60.jpg?rule=ad-large",
      productCount: 50
    },
    {
      id: "4",
      name: {
        fr: "Accessoires de Couture",
        ar: "إكسسوارات الخياطة"
      },
      image:
        "https://www.coutureenfant.fr/wp-content/uploads/2017/05/materiel-de-couture.jpg",
      productCount: 90
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("CategoriesSection.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("CategoriesSection.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md h-64">
                <Image
                  src={category.image}
                  alt={category.name[locale]}
                  fill // Utilisation de `fill`
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">
                      {category.name[locale]}
                    </h3>
                    <p className="text-sm">
                      {t("CategoriesSection.productCount", {
                        count: category.productCount
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Composant Produits Populaires
const FeaturedProducts: React.FC = async () => {
  const t = await getTranslations("HomePage")
  const products: Product[] = [
    {
      _id: "1",
      name: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Bobines de fil multicolores"
      },
      description: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Un assortiment de belles bobines de fil multicolores, parfaites pour tous vos projets de couture."
      },
      price: 25,
      originalPrice: 30,
      images: [
        "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg"
      ],
      category: {
        _id: "cat1",
        name: { fr: "Accessoires de Couture", ar: "إكسسوارات الخياطة" },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      discount: {
        _id: "disc1",
        name: { fr: "Promotion 10%", ar: "تخفيض 10%" },
        type: "PERCENTAGE",
        value: 10,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      Characteristic: [
        {
          _id: "c1",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [
            { fr: "Multicolore", ar: "متعدد الألوان" },
            { fr: "Blanc", ar: "أبيض" }
          ]
        },
        {
          _id: "c2",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [
            { fr: "Polyester", ar: "بوليستر" },
            { fr: "Coton", ar: "قطن" }
          ]
        }
      ],
      inStock: true,
      quantity: 20,
      isNewProduct: false,
      isOnSale: true,
      slug: "bobines-de-fil-multicolores",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "2",
      name: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Fournitures de couture"
      },
      description: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Collection d’outils de couture (fils, boutons, etc.) idéale pour atelier et DIY."
      },
      price: 40,
      images: [
        "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg"
      ],
      category: {
        _id: "cat1",
        name: { fr: "Accessoires de Couture", ar: "إكسسوارات الخياطة" },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      Characteristic: [
        {
          _id: "c3",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Multicolore", ar: "متعدد الألوان" }]
        },
        {
          _id: "c4",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Mix", ar: "خليط" }]
        }
      ],
      inStock: true,
      quantity: 50,
      isNewProduct: false,
      isOnSale: false,
      slug: "fournitures-de-couture",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "3",
      name: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Fils colorés dans un tiroir"
      },
      description: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Vue rapprochée de fils à coudre colorés bien rangés dans un tiroir."
      },
      price: 30,
      images: [
        "https://static.mapetitemercerie.com/99298-large_default/kit-de-11-fils-a-coudre-guetermann-accessoires.jpg"
      ],
      category: {
        _id: "cat1",
        name: { fr: "Accessoires de Couture", ar: "إكسسوارات الخياطة" },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      Characteristic: [
        {
          _id: "c5",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Multicolore", ar: "متعدد الألوان" }]
        },
        {
          _id: "c6",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Coton", ar: "قطن" }]
        }
      ],
      inStock: true,
      quantity: 70,
      isNewProduct: true,
      isOnSale: false,
      slug: "fils-colores-dans-un-tiroir",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "4",
      name: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Tissus assortis colorés"
      },
      description: {
        ar: "ؤاعبا نتيبا بنابش نبتلابلاب نمبابب",
        fr: "Collection de tissus 100% coton, idéals pour patchwork, quilting et projets créatifs."
      },
      price: 35,
      images: [
        "https://static.mapetitemercerie.com/48913-large_default/machine-a-coudre-smarter-260c-pfaff.jpg"
      ],
      category: {
        _id: "cat2",
        name: { fr: "Tissus", ar: "أقمشة" },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      Characteristic: [
        {
          _id: "c7",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Multicolore", ar: "متعدد الألوان" }]
        },
        {
          _id: "c8",
          name: {
            _id: "68fcc6f03124d8faea297cb3",
            name: { fr: "color", ar: "أبيض" },
            values: [
              { name: { fr: "Polyester", ar: "بوليستر" } },
              { name: { fr: "Coton", ar: "قطن" } }
            ]
          },
          values: [{ fr: "Coton", ar: "قطن" }]
        }
      ],
      inStock: true,
      quantity: 80,
      isNewProduct: false,
      isOnSale: false,
      slug: "tissus-assortis-colores",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("FeaturedProductsSection.title")}
          </h2>
          <p className="text-gray-600">
            {t("FeaturedProductsSection.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} viewMode={"grid"} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Composant Principal
const HomePage: React.FC = async () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyChooseUs />
    </div>
  )
}

export default HomePage
