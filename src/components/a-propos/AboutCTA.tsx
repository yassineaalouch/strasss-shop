'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, Phone } from 'lucide-react'

export default function AboutCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Découvrir Notre Collection ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Explorez notre gamme complète d&apos;accessoires de couture et commencez 
            votre prochain projet créatif dès aujourd&apos;hui.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/boutique"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 group"
            >
              <span>Découvrir la Boutique</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Nous Contacter
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm opacity-90">
            <div className="flex items-center space-x-2">
              <Mail size={18} />
              <span>contact@accessoires-couture.fr</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={18} />
              <span>01 23 45 67 89</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}