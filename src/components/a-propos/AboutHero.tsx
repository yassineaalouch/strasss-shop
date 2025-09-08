'use client'
import { motion } from 'framer-motion'
import { Scissors, Heart, Star } from 'lucide-react'

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-white pt-20 pb-16">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-orange-300">
          <Scissors size={40} className="rotate-12" />
        </div>
        <div className="absolute top-32 right-20 text-orange-300">
          <Heart size={35} className="rotate-45" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-orange-300">
          <Star size={30} className="-rotate-12" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Notre <span className="text-orange-500 relative">
              Passion
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-orange-300 rounded"></div>
            </span> pour la Couture
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Depuis plus de 20 ans, nous accompagnons les créateurs, artisans et passionnés 
            de couture avec des accessoires de qualité exceptionnelle.
          </p>
          <div className="flex justify-center items-center space-x-8 text-orange-500">
            <div className="flex items-center space-x-2">
              <Scissors size={24} />
              <span className="font-semibold">Expertise</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart size={24} />
              <span className="font-semibold">Passion</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={24} />
              <span className="font-semibold">Qualité</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}