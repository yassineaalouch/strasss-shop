'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ } from '@/types/type';



const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
  {
    id: 1,
    question: "Quels types d’accessoires de couture proposez-vous ?",
    answer: "Nous proposons une large gamme d’accessoires de couture : fils, aiguilles, boutons, fermetures, ciseaux, machines à coudre, kits DIY, et bien plus encore. Tous nos produits sont sélectionnés pour leur qualité et durabilité."
  },
  {
    id: 2,
    question: "Comment passer commande ?",
    answer: "Vous pouvez commander directement sur notre site en ajoutant les produits à votre panier et en suivant le processus de paiement sécurisé. Vous pouvez également nous contacter par téléphone ou email pour des commandes spéciales."
  },
  {
    id: 3,
    question: "Quels sont les délais de livraison ?",
    answer: "Pour les produits en stock, la livraison est généralement effectuée sous 2 à 5 jours ouvrables au Maroc. Les commandes personnalisées ou kits sur mesure peuvent nécessiter 7 à 10 jours selon la disponibilité."
  },
  {
    id: 4,
    question: "Proposez-vous des produits sur mesure ?",
    answer: "Oui, nous pouvons créer des kits de couture sur mesure et vous fournir des accessoires spécifiques selon vos besoins. Contactez-nous avec votre projet et nous vous conseillerons sur les meilleures options."
  },
  {
    id: 5,
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Nous acceptons le paiement par carte bancaire, virement, et paiement mobile. Pour les commandes importantes, des paiements échelonnés peuvent être négociés."
  },
  {
    id: 6,
    question: "Les produits sont-ils de bonne qualité ?",
    answer: "Tous nos accessoires de couture proviennent de fournisseurs fiables et sont soigneusement vérifiés avant expédition pour garantir une qualité optimale et une longue durée de vie."
  },
  {
    id: 7,
    question: "Puis-je retourner un produit si je ne suis pas satisfait ?",
    answer: "Oui, nous acceptons les retours sous 14 jours après réception, à condition que le produit soit dans son état d’origine et non utilisé. Les frais de retour sont à la charge du client sauf en cas de défaut de fabrication."
  },
  {
    id: 8,
    question: "Proposez-vous des conseils ou tutoriels de couture ?",
    answer: "Absolument ! Nous partageons régulièrement des guides, tutoriels et astuces de couture sur notre blog et notre chaîne YouTube pour vous aider à réaliser vos projets facilement."
  }
];


  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Questions Fréquemment Posées
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trouvez rapidement les réponses à vos questions les plus courantes sur nos services de coutureau Maroc.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <button
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                onClick={() => toggleFAQ(faq.id)}
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === faq.id ? (
                    <ChevronUp className="text-green-600" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={24} />
                  )}
                </div>
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-6 py-4 bg-white border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-green-50 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-3">
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className="text-green-700 mb-4">
            Notre équipe d&apos;experts est là pour répondre à toutes vos questions personnalisées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+212 670366581"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold"
            >
              Appelez-nous
            </a>
            <a
              href="mailto:Denon_taha@hotmail.fr"
              className="bg-white text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300 font-semibold"
            >
              Envoyez un email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;