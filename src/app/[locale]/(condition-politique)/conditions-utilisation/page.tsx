import { Metadata } from 'next'
import LegalLayout from '@/components/conditions-utilisation/LegalLayout'

export const metadata: Metadata = {
  title: 'Conditions d\'Utilisation | Accessoires de Couture Premium',
  description: 'Consultez nos conditions d\'utilisation pour l\'usage de notre site web spécialisé en accessoires de couture.',
  robots: 'index, follow',
  alternates: {
    canonical: '/conditions-utilisation'
  }
}

export default function ConditionsUtilisationPage() {
  return (
    <LegalLayout title="Conditions d'Utilisation" lastUpdated="15 janvier 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            1. Objet et Champ d&apos;Application
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p className="mb-4">
              Les présentes conditions générales d&apos;utilisation (CGU) ont pour objet de définir les modalités 
              et conditions dans lesquelles les utilisateurs peuvent accéder et utiliser le site web 
              <strong className="text-orange-600"> www.accessoires-couture.fr</strong>, édité par la société 
              Accessoires Couture Premium.
            </p>
            <p>
              L&apos;accès au site implique l&apos;acceptation pleine et entière des présentes conditions générales 
              d&apos;utilisation. Ces dernières constituent un contrat entre l&apos;utilisateur et Accessoires Couture Premium.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            2. Mentions Légales
          </h2>
          <div className="bg-orange-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Éditeur du site :</h3>
                <p className="text-gray-600">
                  Accessoires Couture Premium<br />
                  SARL au capital de 50 000 €<br />
                  SIRET : 123 456 789 00012<br />
                  Code APE : 4751Z
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Coordonnées :</h3>
                <p className="text-gray-600">
                  123 Rue de la Couture<br />
                  75001 Paris, France<br />
                  Tél : 01 23 45 67 89<br />
                  Email : contact@accessoires-couture.fr
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            3. Accès au Site et Services
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p className="mb-4">
              Le site est accessible 24h/24, 7j/7, sauf cas de force majeure, maintenance programmée ou panne. 
              Accessoires Couture Premium met tout en œuvre pour offrir aux utilisateurs un accès continu au site, 
              mais ne saurait être tenu responsable de tout dommage résultant d&apos;une indisponibilité du site.
            </p>
            <h3 className="font-semibold text-gray-800 mb-2">3.1 Conditions d&apos;accès</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>L&apos;accès au site est gratuit pour la consultation</li>
              <li>Certaines fonctionnalités nécessitent la création d&apos;un compte utilisateur</li>
              <li>L&apos;utilisateur garantit la véracité des informations fournies</li>
              <li>Un seul compte par personne physique est autorisé</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            4. Propriété Intellectuelle
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p className="mb-4">
              L&apos;ensemble des contenus présents sur le site (textes, images, vidéos, logos, graphismes, etc.) 
              est protégé par les droits de propriété intellectuelle et appartient exclusivement à 
              Accessoires Couture Premium ou à ses partenaires.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
              <p className="font-semibold text-yellow-800 mb-2">⚠️ Interdictions :</p>
              <ul className="list-disc list-inside space-y-1 text-yellow-700">
                <li>Reproduction, représentation ou diffusion sans autorisation</li>
                <li>Modification ou altération du contenu</li>
                <li>Usage commercial non autorisé</li>
                <li>Extraction de données automatisée (scraping)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            5. Responsabilités et Obligations
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <h3 className="font-semibold text-gray-800 mb-2">5.1 Obligations de l&apos;utilisateur</h3>
            <p className="mb-4">L&apos;utilisateur s&apos;engage à :</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Respecter les présentes conditions d&apos;utilisation</li>
              <li>Ne pas porter atteinte à l&apos;ordre public et aux bonnes mœurs</li>
              <li>Ne pas violer les droits de tiers</li>
              <li>Maintenir la confidentialité de ses identifiants de connexion</li>
            </ul>
            
            <h3 className="font-semibold text-gray-800 mb-2">5.2 Limitation de responsabilité</h3>
            <p>
              Accessoires Couture Premium ne saurait être tenu responsable des dommages directs ou indirects 
              causés au matériel de l&apos;utilisateur lors de l&apos;accès au site, résultant de l&apos;utilisation d&apos;un 
              matériel non adapté ou de l&apos;apparition d&apos;un bug ou d&apos;une incompatibilité.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            6. Protection des Données Personnelles
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p className="mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique 
              et Libertés, les informations personnelles collectées font l&apos;objet d&apos;un traitement destiné à 
              gérer votre compte client et vos commandes.
            </p>
            <p>
              Pour plus d&apos;informations, consultez notre 
              <a href="/politique-confidentialite" className="text-orange-600 hover:text-orange-700 font-semibold">
                Politique de Confidentialité
              </a>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            7. Modification des CGU
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p>
              Accessoires Couture Premium se réserve le droit de modifier à tout moment les présentes 
              conditions générales d&apos;utilisation. Les modifications prennent effet dès leur publication 
              sur le site. Il appartient à l&apos;utilisateur de consulter régulièrement la dernière version.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            8. Droit Applicable et Juridiction
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p>
              Les présentes conditions générales sont soumises au droit français. En cas de litige, 
              les tribunaux français seront seuls compétents.
            </p>
          </div>
        </section>
      </div>
    </LegalLayout>
  )
}