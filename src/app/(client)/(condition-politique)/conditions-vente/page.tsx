import { Metadata } from 'next'
import LegalLayout from '@/components/conditions-utilisation/LegalLayout'
import { FREE_SHIPPING_THRESHOLD } from '@/data'

export const metadata: Metadata = {
  title: 'Conditions de Vente | Accessoires de Couture Premium',
  description: 'Découvrez nos conditions générales de vente pour l\'achat d\'accessoires de couture en ligne.',
  robots: 'index, follow',
  alternates: {
    canonical: '/conditions-vente'
  }
}

export default function ConditionsVentePage() {
  return (
    <LegalLayout title="Conditions Générales de Vente" lastUpdated="15 janvier 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            1. Champ d&apos;Application
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p>
              Les présentes conditions générales de vente (CGV) s&apos;appliquent à toutes les commandes passées 
              sur le site www.accessoires-couture.fr par des consommateurs ou professionnels. Elles régissent 
              les relations contractuelles entre Accessoires Couture Premium et ses clients.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            2. Produits et Prix
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <h3 className="font-semibold text-gray-800 mb-2">2.1 Description des produits</h3>
            <p className="mb-4">
              Les produits proposés sont ceux qui figurent dans le catalogue publié sur le site. 
              Les photographies et descriptifs sont les plus fidèles possibles mais n&apos;engagent pas 
              la responsabilité de la société en cas de légères différences.
            </p>
            
            <h3 className="font-semibold text-gray-800 mb-2">2.2 Prix</h3>
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <ul className="list-disc list-inside space-y-2">
                <li>Les prix sont indiqués en euros TTC</li>
                <li>Ils incluent la TVA française au taux en vigueur</li>
                <li>Les prix peuvent être modifiés à tout moment mais s&apos;appliquent au moment de la commande</li>
                <li>Les frais de livraison sont en supplément et indiqués avant validation</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            3. Commande et Paiement
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <h3 className="font-semibold text-gray-800 mb-2">3.1 Processus de commande</h3>
            <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
              <li>Sélection des produits et ajout au panier</li>
              <li>Vérification du contenu du panier</li>
              <li>Identification ou création de compte client</li>
              <li>Choix du mode de livraison</li>
              <li>Choix du mode de paiement</li>
              <li>Validation de la commande après acceptation des CGV</li>
            </ol>

            <h3 className="font-semibold text-gray-800 mb-2">3.2 Moyens de paiement acceptés</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✅ Paiements sécurisés</h4>
                <ul className="list-disc list-inside space-y-1 text-green-700">
                  <li>Cartes bancaires (Visa, Mastercard, CB)</li>
                  <li>PayPal</li>
                  <li>Virement bancaire (sur devis)</li>
                  <li>Chèque (France uniquement)</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🔒 Sécurité</h4>
                <p className="text-blue-700">
                  Tous les paiements sont sécurisés par cryptage SSL. 
                  Nous ne conservons aucune donnée bancaire.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            4. Livraison
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <h3 className="font-semibold text-gray-800 mb-2">4.1 Zones de livraison</h3>
            <p className="mb-4">Nous livrons en France métropolitaine, Corse et DOM-TOM.</p>
            
            <h3 className="font-semibold text-gray-800 mb-2">4.2 Délais et tarifs</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-orange-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Mode de livraison</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Délai</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Tarif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3">Colissimo</td>
                    <td className="px-4 py-3">2-3 jours ouvrés</td>
                    <td className="px-4 py-3">6,90€</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="px-4 py-3">Chronopost Express</td>
                    <td className="px-4 py-3">24h</td>
                    <td className="px-4 py-3">14,90€</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3">Point Relais</td>
                    <td className="px-4 py-3">3-5 jours ouvrés</td>
                    <td className="px-4 py-3">4,90€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              *Livraison gratuite dès {FREE_SHIPPING_THRESHOLD} MAD d&apos;achat en Colissimo
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            5. Droit de Rétractation
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">📋 Délai légal : 14 jours</h3>
              <p className="text-blue-700">
                Conformément à l&apos;article L221-18 du Code de la consommation, vous disposez d&apos;un délai 
                de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation.
              </p>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">5.1 Conditions de retour</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Produits dans leur emballage d&apos;origine</li>
              <li>Produits non utilisés et en parfait état</li>
              <li>Étiquettes et accessoires inclus</li>
              <li>Formulaire de rétractation complété (optionnel)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            6. Garanties et Service Après-Vente
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <h3 className="font-semibold text-gray-800 mb-2">6.1 Garantie légale de conformité</h3>
            <p className="mb-4">
              Tous nos produits bénéficient de la garantie légale de conformité (articles L217-4 et suivants 
              du Code de la consommation) et de la garantie légale des vices cachés (articles 1641 et suivants 
              du Code civil).
            </p>
            
            <h3 className="font-semibold text-gray-800 mb-2">6.2 Service client</h3>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="mb-2">Notre équipe est à votre disposition :</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Par email : support@accessoires-couture.fr</li>
                <li>Par téléphone : 01 23 45 67 89 (9h-18h, lun-ven)</li>
                <li>Délai de réponse : 48h maximum</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            7. Responsabilité et Force Majeure
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p>
              La responsabilité d&apos;Accessoires Couture Premium ne saurait être engagée en cas de force majeure 
              ou de circonstances indépendantes de sa volonté. Sont considérés comme cas de force majeure 
              les événements imprévisibles, irrésistibles et extérieurs aux parties.
            </p>
          </div>
        </section>
      </div>
    </LegalLayout>
  )
}