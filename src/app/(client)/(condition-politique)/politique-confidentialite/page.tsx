import { Metadata } from 'next'
import LegalLayout from '@/components/conditions-utilisation/LegalLayout'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Accessoires de Couture Premium',
  description: 'Notre politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.',
  robots: 'index, follow',
  alternates: {
    canonical: '/politique-confidentialite'
  }
}

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalLayout title="Politique de Confidentialité" lastUpdated="15 janvier 2025">
      <div className="space-y-8">
        <section>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <h2 className="text-xl font-bold text-blue-800 mb-2">🔒 Votre vie privée est importante</h2>
            <p className="text-blue-700">
              Cette politique explique comment nous collectons, utilisons et protégeons vos données personnelles 
              conformément au RGPD et à la loi Informatique et Libertés.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            1. Responsable du Traitement
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="mb-4"><strong>Responsable du traitement :</strong></p>
            <div className="text-gray-700">
              Accessoires Couture Premium<br />
              123 Rue de la Couture, 75001 Paris<br />
              Email : dpo@accessoires-couture.fr<br />
              Téléphone : 01 23 45 67 89
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            2. Données Collectées
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <h3 className="font-semibold text-gray-800 mb-2">2.1 Données d&apos;identification</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Nom, prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse postale</li>
              <li>Date de naissance (facultative)</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">2.2 Données de navigation</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Adresse IP</li>
              <li>Type de navigateur et appareil</li>
              <li>Pages visitées et temps de navigation</li>
              <li>Cookies et technologies similaires</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">2.3 Données commerciales</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Historique des commandes</li>
              <li>Préférences produits</li>
              <li>Panier d&apos;achat</li>
              <li>Avis et commentaires</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            3. Finalités du Traitement
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ Traitements nécessaires</h3>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                <li>Gestion des commandes</li>
                <li>Livraison des produits</li>
                <li>Facturation et comptabilité</li>
                <li>Service client</li>
                <li>Gestion des retours</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">📧 Avec votre consentement</h3>
              <ul className="list-disc list-inside space-y-1 text-orange-700">
                <li>Newsletter et promotions</li>
                <li>Recommandations personnalisées</li>
                <li>Études marketing</li>
                <li>Cookies publicitaires</li>
                <li>Réseaux sociaux</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            4. Base Légale des Traitements
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Traitement</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Base légale</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3">Gestion des commandes</td>
                  <td className="px-4 py-3">Exécution du contrat</td>
                  <td className="px-4 py-3">5 ans</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-3">Marketing direct</td>
                  <td className="px-4 py-3">Consentement</td>
                  <td className="px-4 py-3">Jusqu&apos;au retrait</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3">Comptabilité</td>
                  <td className="px-4 py-3">Obligation légale</td>
                  <td className="px-4 py-3">10 ans</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            5. Cookies et Technologies Similaires
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <h3 className="font-semibold text-gray-800 mb-2">5.1 Types de cookies utilisés</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-green-800 mb-2">🍪 Essentiels</h4>
                <p className="text-sm text-green-700">
                  Fonctionnement du site, panier, session utilisateur
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-blue-800 mb-2">📊 Analytiques</h4>
                <p className="text-sm text-blue-700">
                  Google Analytics, statistiques de visite
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-purple-800 mb-2">🎯 Marketing</h4>
                <p className="text-sm text-purple-700">
                  Publicité ciblée, réseaux sociaux
                </p>
              </div>
            </div>

            <p className="mb-4">
              Vous pouvez gérer vos préférences de cookies à tout moment via notre bandeau de cookies 
              ou les paramètres de votre navigateur.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            6. Partage des Données
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p className="mb-4">
              Nous ne vendons jamais vos données personnelles. Nous pouvons les partager uniquement 
              dans les cas suivants :
            </p>
            
            <h3 className="font-semibold text-gray-800 mb-2">6.1 Prestataires de services</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Transporteurs :</strong> La Poste, Chronopost, DPD</li>
                <li><strong>Paiement :</strong> Stripe, PayPal</li>
                <li><strong>Email :</strong> Mailchimp, SendGrid</li>
                <li><strong>Hébergement :</strong> OVH (France)</li>
              </ul>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">6.2 Obligations légales</h3>
            <p>
              Nous pouvons divulguer vos données si la loi l&apos;exige ou pour protéger nos droits, 
              notre propriété ou notre sécurité.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            7. Sécurité des Données
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">🔐 Mesures techniques</h3>
                <ul className="list-disc list-inside space-y-1 text-green-700">
                  <li>Chiffrement SSL/TLS</li>
                  <li>Serveurs sécurisés en France</li>
                  <li>Sauvegardes régulières</li>
                  <li>Pare-feu et antivirus</li>
                  <li>Accès restreint aux données</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">👥 Mesures organisationnelles</h3>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Formation du personnel</li>
                  <li>Politique de mots de passe</li>
                  <li>Audit de sécurité régulier</li>
                  <li>Procédure de violation</li>
                  <li>Contrats de confidentialité</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            8. Vos Droits RGPD
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p className="mb-4">
              Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">👁</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Droit d&apos;accès</h3>
                    <p className="text-sm text-gray-600">Connaître les données que nous détenons sur vous</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">✏️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Droit de rectification</h3>
                    <p className="text-sm text-gray-600">Corriger des données inexactes ou incomplètes</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">🗑</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Droit d&apos;effacement</h3>
                    <p className="text-sm text-gray-600">Supprimer vos données dans certaines conditions</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">⏸</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Droit de limitation</h3>
                    <p className="text-sm text-gray-600">Limiter le traitement de vos données</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">📦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Droit à la portabilité</h3>
                    <p className="text-sm text-gray-600">Récupérer vos données dans un format exploitable</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">🚫</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Droit d&apos;opposition</h3>
                    <p className="text-sm text-gray-600">Vous opposer à certains traitements</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Décision automatisée</h3>
                    <p className="text-sm text-gray-600">Ne pas faire l&apos;objet de décisions automatisées</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">❌</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Retrait du consentement</h3>
                    <p className="text-sm text-gray-600">Retirer votre consentement à tout moment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mt-6">
              <h3 className="font-semibold text-orange-800 mb-2">📧 Comment exercer vos droits ?</h3>
              <p className="text-orange-700 mb-2">
                Pour exercer l&apos;un de ces droits, contactez-nous :
              </p>
              <ul className="list-disc list-inside space-y-1 text-orange-700">
                <li>Email : dpo@accessoires-couture.fr</li>
                <li>Courrier : DPO, 123 Rue de la Couture, 75001 Paris</li>
                <li>Délai de réponse : 1 mois maximum</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            9. Transferts Internationaux
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p className="mb-4">
              Vos données sont principalement traitées en France. Certains de nos prestataires peuvent 
              être situés hors de l&apos;Union européenne. Dans ce cas, nous nous assurons que :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Le niveau de protection est adéquat (décision d&apos;adéquation de la Commission européenne)</li>
              <li>Des garanties appropriées sont mises en place (clauses contractuelles types)</li>
              <li>Votre consentement explicite est obtenu si nécessaire</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            10. Mineurs
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p>
              Notre site ne s&apos;adresse pas aux mineurs de moins de 16 ans. Nous ne collectons pas 
              sciemment de données personnelles de mineurs de moins de 16 ans sans le consentement 
              des parents ou tuteurs légaux.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            11. Modifications
          </h2>
          <div className="prose text-gray-600 leading-relaxed">
            <p>
              Cette politique de confidentialité peut être modifiée pour refléter les changements 
              dans nos pratiques ou la législation. Les modifications importantes vous seront 
              communiquées par email ou via une notification sur le site.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            12. Réclamations
          </h2>
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <h3 className="font-semibold text-red-800 mb-2">🛡️ Autorité de contrôle</h3>
            <p className="text-red-700 mb-2">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de :
            </p>
            <div className="text-red-700">
              <strong>CNIL (Commission Nationale de l&apos;Informatique et des Libertés)</strong><br />
              3 Place de Fontenoy, TSA 80715<br />
              75334 Paris Cedex 07<br />
              Tél : 01 53 73 22 22<br />
              Site web : www.cnil.fr
            </div>
          </div>
        </section>
      </div>
    </LegalLayout>
  )
}
