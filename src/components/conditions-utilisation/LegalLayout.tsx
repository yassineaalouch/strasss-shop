'use client'
import { motion } from 'framer-motion'
import { Calendar, Scale, Shield } from 'lucide-react'

interface LegalLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Scale size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <div className="flex items-center justify-center space-x-2 text-orange-100">
              <Calendar size={20} />
              <span>Dernière mise à jour : {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex flex-wrap justify-center space-x-6 text-sm">
            <a href="/conditions-utilisation" className="text-gray-600 hover:text-orange-600 transition-colors py-2">
              Conditions d&apos;Utilisation
            </a>
            <a href="/conditions-vente" className="text-gray-600 hover:text-orange-600 transition-colors py-2">
              Conditions de Vente
            </a>
            <a href="/politique-confidentialite" className="text-gray-600 hover:text-orange-600 transition-colors py-2">
              Politique de Confidentialité
            </a>
          </nav>
        </div>
      </section>

      {/* Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Contact Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center mb-4">
              <Shield className="text-orange-500 mr-3" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Questions ou Préoccupations ?</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Si vous avez des questions concernant nos conditions légales ou la protection de vos données, 
              n&apos;hésitez pas à nous contacter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:legal@accessoires-couture.fr"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-center"
              >
                Nous Contacter
              </a>
              <a 
                href="/contact"
                className="border border-orange-500 text-orange-600 px-6 py-2 rounded-lg hover:bg-orange-50 transition-colors text-center"
              >
                Formulaire de Contact
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
