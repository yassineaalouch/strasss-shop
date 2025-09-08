import { Shield, Truck, HeartHandshake, Leaf } from 'lucide-react'

export default function AboutValues() {
  const values = [
    {
      icon: Shield,
      title: "Qualité Garantie",
      description: "Tous nos produits sont rigoureusement sélectionnés et testés par notre équipe d'experts."
    },
    {
      icon: Truck,
      title: "Livraison Express",
      description: "Expédition sous 24h et livraison rapide partout en France pour ne jamais interrompre votre créativité."
    },
    {
      icon: HeartHandshake,
      title: "Service Client",
      description: "Une équipe dédiée pour vous conseiller et vous accompagner dans tous vos projets de couture."
    },
    {
      icon: Leaf,
      title: "Éco-Responsable",
      description: "Nous privilégions les fournisseurs respectueux de l'environnement et les matériaux durables."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Pourquoi Nous Choisir ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez ce qui nous rend uniques dans l&apos;univers des accessoires de couture
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-orange-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
