'use client'
import { motion } from 'framer-motion'

export default function AboutStory() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Notre Histoire
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-6">
                Tout a commencé en 2003 dans un petit atelier parisien. Marie et Pierre, 
                passionnés de couture depuis leur enfance, ont décidé de partager leur 
                amour pour cet art ancestral.
              </p>
              <p className="mb-6">
                Ce qui était au début une petite boutique familiale est devenu 
                aujourd&apos;hui une référence incontournable pour les professionnels 
                et amateurs de couture à travers toute la France.
              </p>
              <p>
                Notre mission reste la même : vous offrir les meilleurs accessoires 
                de couture pour donner vie à vos créations les plus ambitieuses.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-orange-200 rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Nos Valeurs Fondamentales
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Qualité irréprochable</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Service client exceptionnel</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Innovation constante</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Respect de l&apos;artisanat</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
