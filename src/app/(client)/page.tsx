import React from 'react';
import { Shield, Truck, Award, Headphones } from 'lucide-react';
import { Category, Product, Service } from '@/types/type';
import HeroSection from '@/components/home/HeroSection';
import Image from 'next/image';
import { ProductCardStandard } from '@/components/shop/ProductCard';
import { FREE_SHIPPING_THRESHOLD } from '@/data';

// Composant Services
const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      icon: <Truck size={40} />,
      title: "Livraison Rapide",
      description:`Livraison gratuite à partir de ${FREE_SHIPPING_THRESHOLD}DH dans tout le Maroc`
    },
    {
      icon: <Shield size={40} />,
      title: "Bonne Qualité",
      description: "Tous nos produits sont de bonne qualité"
    },
    {
      icon: <Award size={40} />,
      title: "Expert en Couture",
      description: "Plus de 15 ans d'expérience dans le domaine"
    },
    {
      icon: <Headphones size={40} />,
      title: "Support Client",
      description: "Service client disponible 7j/7 pour vous accompagner"
    }
  ];

  return (
    <section className="py-16 ">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Pourquoi Nous Choisir
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Nous vous offrons des produits de couture de haute qualité, un service rapide et fiable, ainsi qu&apos;un accompagnement personnalisé pour tous vos projets créatifs.
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <div className="bg-orange-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Categories
const CategoriesSection: React.FC = () => {
  const categories: Category[] = [
    {
      id: "1",
      name: "Tissus",
      image: "https://www.tissus-price.com/img/cms/IMG%20BLOG/tissu-burlington-pas-cher.jpg",
      productCount: 120
    },
    {
      id: "2",
      name: "Fils et Aiguilles",
      image: "https://www.lerobert.com/sites/default/files/scald_image/dico-en-ligne-le-robert-de-fil-en-aiguille-marcelle-ratafia.jpg",
      productCount: 75
    },
    {
      id: "3",
      name: "Boutons et Fermetures",
      image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/1b/9a/d2/1b9ad2c9d7b8c8841a1f0e84104f648308aa6d60.jpg?rule=ad-large",
      productCount: 50
    },
    {
      id: "4",
      name: "Accessoires de Couture",
      image: "https://www.coutureenfant.fr/wp-content/uploads/2017/05/materiel-de-couture.jpg",
      productCount: 90
    },
    
  ];


  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Catégories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de coutureet accessoires adaptés à tous vos besoins
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={500}
                  height={256}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40  group-hover:bg-black/25 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm">{category.productCount} produits</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Produits Populaires
const FeaturedProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: "1",
      name: "Bobines de fil multicolores",
      price: 25,
      originalPrice: 30,
      image: "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg",
      rating: 4.7,
      reviews: 120,
      isNew: false,
      isOnSale: true,
      category: "Accessoires de Couture",
      material: "Polyester",
      height: "-",
      color: "Multicolore",
      inStock: true,
      description: "Un assortiment de belles bobines de fil multicolores, parfaites pour tous vos projets de couture."
    },
    {
      id: "2",
      name: "Fournitures de couture ",
      price: 40,
      image: "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg",
      rating: 4.5,
      reviews: 85,
      category: "Accessoires de Couture",
      material: "Mix",
      height: "-",
      color: "Multicolore",
      inStock: true,
      description: "Collection d’outils de couture (fils, boutons, etc.) idéal pour atelier et DIY."
    },
    {
      id: "3",
      name: "Fils colorés dans un tiroir",
      price: 30,
      image: "https://static.mapetitemercerie.com/99298-large_default/kit-de-11-fils-a-coudre-guetermann-accessoires.jpg",
      rating: 4.8,
      reviews: 150,
      isNew: true,
      isOnSale: false,
      category: "Accessoires de Couture",
      material: "Coton",
      height: "-",
      color: "Multicolore",
      inStock: true,
      description: "Vue rapprochée de fils à coudre colorés bien rangés dans un tiroir."
    },
    {
      id: "4",
      name: "Tissus assortis colorés",
      price: 35,
      image: "https://static.mapetitemercerie.com/48913-large_default/machine-a-coudre-smarter-260c-pfaff.jpg",
      rating: 4.6,
      reviews: 143,
      isNew: false,
      isOnSale: false,
      category: "Tissus",
      material: "Coton",
      height: "-",
      color: "Multicolore",
      inStock: true,
      description: "Collection de tissus 100% coton, idéals pour patchwork, quilting et projets créatifs."
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Produits Populaires</h2>
          <p className="text-gray-600">Les produits les plus appréciés par nos clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCardStandard key={product.id} product ={product}/>
          ))}
        </div>
      </div>
    </section>
  );
};



// Composant Footer

// Composant Principal
const HomePage: React.FC = async () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <ServicesSection />
    </div>
  );
};

export default HomePage;
