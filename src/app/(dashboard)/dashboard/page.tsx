// app/page.js - Page d'accueil pour site e-commerce accessoires de couture
import { FREE_SHIPPING_THRESHOLD } from '@/data';
import Link from 'next/link';

export default function HomePage() {
  // Données des promotions en cours (bannières visuelles)
  const promotions = [
    {
      id: "1",
      title: "Nouvelle Collection Automne",
      description: "Découvrez nos derniers accessoires de couture",
      discount: "20% de réduction",
      image: "/images/promotion-automne.jpg",
      ctaText: "Découvrir"
    },
    {
      id: "2",
      title: "Pack Débutant Couture",
      description: "Tout ce qu'il faut pour commencer",
      discount: "Prix spécial",
      image: "/images/pack-debutant.jpg",
      ctaText: "Voir le pack"
    }
  ];

  // Catégories principales avec images grandes et claires
  const categories = [
    {
      name: "Fils et Bobines",
      image: "/images/category-fils.jpg",
      count: "250+ produits",
      slug: "fils-bobines"
    },
    {
      name: "Aiguilles et Épingles",
      image: "/images/category-aiguilles.jpg", 
      count: "180+ produits",
      slug: "aiguilles-epingles"
    },
    {
      name: "Boutons",
      image: "/images/category-boutons.jpg",
      count: "300+ produits", 
      slug: "boutons"
    },
    {
      name: "Ciseaux et Outils",
      image: "/images/category-outils.jpg",
      count: "120+ produits",
      slug: "ciseaux-outils"
    },
    {
      name: "Tissus Premium",
      image: "/images/category-tissus.jpg",
      count: "400+ produits",
      slug: "tissus"
    },
    {
      name: "Machines à Coudre",
      image: "/images/category-machines.jpg",
      count: "50+ produits",
      slug: "machines"
    }
  ];

  // Quelques produits populaires ou nouveaux
  const featuredProducts = [
    {
      id: "1",
      name: "Kit Couture Professionnel",
      price: "299.00",
      originalPrice: "350.00",
      image: "/images/kit-pro.jpg",
      isNew: true,
      rating: 4.8
    },
    {
      id: "2",
      name: "Fils Premium Polyester x50",
      price: "45.00", 
      image: "/images/fils-premium.jpg",
      isPopular: true,
      rating: 4.9
    },
    {
      id: "3",
      name: "Ciseaux Professionnels Inox",
      price: "89.00",
      image: "/images/ciseaux-pro.jpg",
      rating: 4.7
    },
    {
      id: "4",
      name: "Machine à Coudre Singer Start",
      price: "199.00",
      originalPrice: "249.00", 
      image: "/images/machine-singer.jpg",
      isNew: true,
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Section Hero avec promotions */}
      <section className="relative bg-gradient-to-r from-yellow-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Contenu principal */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Votre Passion pour la
                <span className="text-yellow-600 block">Couture</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Découvrez notre collection complète d&apos;accessoires de couture de qualité professionnelle. 
                Des fils aux machines, tout pour donner vie à vos créations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/shop" className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                  Découvrir la Boutique
                </Link>
                <Link href="/contact" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-yellow-600 hover:text-yellow-600 transition-colors">
                  Nous Contacter
                </Link>
              </div>
            </div>

            {/* Image hero */}
            <div className="relative">
              <div className="bg-yellow-100 rounded-2xl p-8">
                <div className="aspect-square bg-white rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-yellow-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl">✂️</span>
                    </div>
                    <p className="text-gray-600">Image Hero</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions en cours - Bannières visuelles */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Promotions en Cours
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {promotions.map((promo) => (
              <div key={promo.id} className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-[16/9] bg-gradient-to-r from-yellow-100 to-yellow-200 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-4 block">🧵</span>
                    <p className="text-gray-600">Image: {promo.image}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{promo.title}</h3>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {promo.discount}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{promo.description}</p>
                  <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                    {promo.ctaText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catégories principales */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos Catégories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explorez notre large gamme d&apos;accessoires de couture organisés par catégories pour faciliter votre recherche
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                href={`/shop/${category.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-5xl mb-4 block">
                      {index === 0 ? '🧵' : index === 1 ? '📍' : index === 2 ? '🔘' : index === 3 ? '✂️' : index === 4 ? '🧶' : '🪡'}
                    </span>
                    <p className="text-gray-600 text-sm">Image: {category.image}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{category.count}</p>
                  <div className="flex items-center text-yellow-600 font-semibold">
                    <span>Explorer</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produits populaires/nouveaux */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Produits Vedettes
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos produits les plus populaires et nos dernières nouveautés
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                
                {/* Image produit */}
                <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">
                      {product.id === "1" ? '🧰' : product.id === "2" ? '🧵' : product.id === "3" ? '✂️' : '🪡'}
                    </span>
                    <p className="text-xs text-gray-500">Image: {product.image}</p>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        Nouveau
                      </span>
                    )}
                    {product.isPopular && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        Populaire
                      </span>
                    )}
                  </div>

                  {/* Bouton "Ajouter au panier" au hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                      Ajouter au panier
                    </button>
                  </div>
                </div>

                {/* Informations produit */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                  </div>

                  {/* Prix */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{product.price} DH</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice} DH</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop" className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors inline-flex items-center">
              Voir tous les produits
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Livraison Gratuite</h3>
              <p className="text-gray-600">Livraison gratuite à partir de {FREE_SHIPPING_THRESHOLD} DH d&apos;achat partout au Maroc</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Qualité Garantie</h3>
              <p className="text-gray-600">Produits sélectionnés avec soin pour les professionnels et passionnés</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Support Client</h3>
              <p className="text-gray-600">Une équipe disponible pour vous conseiller dans vos projets couture</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-yellow-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à Créer vos Plus Beaux Projets ?
          </h2>
          <p className="text-xl text-yellow-100 mb-8">
            Rejoignez notre communauté de passionnés et découvrez des accessoires de couture d&apos;exception
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Commencer vos Achats
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors">
              Obtenir des Conseils
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}