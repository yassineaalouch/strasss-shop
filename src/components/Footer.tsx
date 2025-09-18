import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="text-white p-2 rounded-lg mr-3">
                <Image
                  src="/logo.png"
                  alt="logo"
                  height={40}
                  width={40}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-xl font-bold">Strass Shop</span>
            </div>
            <p className="text-gray-400 mb-4">
              Votre partenaire de confiance pour tous vos projets de clôture au
              Maroc.
            </p>
            <div className="flex items-center mb-2">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">Meknes, Maroc</span>
            </div>
            <div className="flex items-center mb-2">
              <Phone size={16} className="mr-2" />
              <span className="text-sm">+212 670366581</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span className="text-sm">Denon_taha@hotmail.fr</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/shop" className="hover:text-white">
                  CotureRigides
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  Grillages Souples
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  Portails
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  Accessoires
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  Packs Complets
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Client</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Conditions de Vente
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Politique de Livraison
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Retours & Échanges
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Strass Shop. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Paiement sécurisé</span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">Livraison rapide</span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">Service client 7j/7</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
