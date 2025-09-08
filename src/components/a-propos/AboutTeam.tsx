'use client'
import { motion } from 'framer-motion'

export default function AboutTeam() {
  const team = [
    {
      name: "Marie Dubois",
      role: "Fondatrice & Directrice",
      description: "Passionnée de couture depuis 30 ans, Marie guide notre vision et notre expertise.",
      image: "👩‍💼"
    },
    {
      name: "Pierre Martin",
      role: "Co-fondateur & Achat",
      description: "Expert en sourcing, Pierre sélectionne les meilleurs fournisseurs mondiaux.",
      image: "👨‍💼"
    },
    {
      name: "Sophie Laurent",
      role: "Responsable Qualité",
      description: "Sophie s'assure que chaque produit répond à nos standards d'excellence.",
      image: "👩‍🔬"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Notre Équipe Passionnée
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rencontrez les personnes qui donnent vie à notre vision chaque jour
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <div className="text-6xl mb-4">{member.image}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}