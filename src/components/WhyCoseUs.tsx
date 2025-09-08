import { Award, Headphones, Shield, Truck } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="bg-white rounded-lg shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Pourquoi choisir CoutureShop ?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Truck size={32} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Livraison Express</h3>
          <p className="text-sm text-gray-600">Expédition sous 24h partout au Maroc</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield size={32} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Qualité Premium</h3>
          <p className="text-sm text-gray-600">Accessoires sélectionnés par nos experts</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award size={32} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">10 ans d&apos;Expertise</h3>
          <p className="text-sm text-gray-600">Spécialistes en fournitures de couture</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Headphones size={32} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Support Dédié</h3>
          <p className="text-sm text-gray-600">Conseils personnalisés 7j/7</p>
        </div>
      </div>
    </section>
  );
}
