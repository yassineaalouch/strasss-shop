import { Package, Users, Award, Clock } from 'lucide-react'

export default function AboutStats() {
  const stats = [
    {
      icon: Package,
      number: "10,000+",
      label: "Produits disponibles",
      description: "Large gamme d'accessoires"
    },
    {
      icon: Users,
      number: "50,000+",
      label: "Clients satisfaits",
      description: "Dans toute la France"
    },
    {
      icon: Award,
      number: "20+",
      label: "Années d'expérience",
      description: "Expertise reconnue"
    },
    {
      icon: Clock,
      number: "24/48h",
      label: "Livraison rapide",
      description: "Partout en France"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <stat.icon className="text-orange-600" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
              <p className="text-orange-600 font-semibold mb-1">{stat.label}</p>
              <p className="text-gray-500 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}