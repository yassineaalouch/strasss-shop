"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { FAQ } from "@/types/type"
import { useLocale, useTranslations } from "next-intl"

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  const locale = useLocale()
  const t = useTranslations("ContactPage.FAQSection")

  const faqs: FAQ[] = [
    {
      id: "1",
      question: {
        fr: "Quels types d'accessoires de couture proposez-vous ?",
        ar: "ما هي أنواع مستلزمات الخياطة التي تقدمونها؟"
      },
      answer: {
        fr: "Nous proposons une large gamme d'accessoires de couture : fils, aiguilles, boutons, fermetures, ciseaux, machines à coudre, kits DIY, et bien plus encore. Tous nos produits sont sélectionnés pour leur qualité et durabilité.",
        ar: "نحن نقدم مجموعة واسعة من مستلزمات الخياطة: خيوط، إبر، أزرار، سحابات، مقصات، آلات خياطة، أطقم أشغال يدوية، والمزيد. جميع منتجاتنا مختارة لجودتها ومتانتها."
      }
    },
    {
      id: "2",
      question: {
        fr: "Comment passer commande ?",
        ar: "كيف يمكنني تقديم طلب شراء؟"
      },
      answer: {
        fr: "Vous pouvez commander directement sur notre site en ajoutant les produits à votre panier et en suivant le processus de paiement sécurisé. Vous pouvez également nous contacter par téléphone ou email pour des commandes spéciales.",
        ar: "يمكنك الطلب مباشرة من موقعنا عن طريق إضافة المنتجات إلى سلة التسوق واتباع عملية الدفع الآمنة. كما يمكنك الاتصال بنا عبر الهاتف أو البريد الإلكتروني للطلبات الخاصة."
      }
    },
    {
      id: "3",
      question: {
        fr: "Quels sont les délais de livraison ?",
        ar: "ما هي آجال التوصيل؟"
      },
      answer: {
        fr: "Pour les produits en stock, la livraison est généralement effectuée sous 2 à 5 jours ouvrables au Maroc. Les commandes personnalisées ou kits sur mesure peuvent nécessiter 7 à 10 jours selon la disponibilité.",
        ar: "بالنسبة للمنتجات المتوفرة، يتم التوصيل عادة في غضون 2 إلى 5 أيام عمل داخل المغرب. أما الطلبات المخصصة أو الأطقم المصممة خصيصًا فقد تستغرق من 7 إلى 10 أيام حسب التوفر."
      }
    },
    {
      id: "4",
      question: {
        fr: "Proposez-vous des produits sur mesure ?",
        ar: "هل تقدمون منتجات حسب الطلب؟"
      },
      answer: {
        fr: "Oui, nous pouvons créer des kits de couture sur mesure et vous fournir des accessoires spécifiques selon vos besoins. Contactez-nous avec votre projet et nous vous conseillerons sur les meilleures options.",
        ar: "نعم، يمكننا إعداد أطقم خياطة حسب الطلب وتزويدك بمستلزمات محددة وفقًا لاحتياجاتك. اتصل بنا مع مشروعك وسنرشدك إلى أفضل الخيارات."
      }
    },
    {
      id: "5",
      question: {
        fr: "Quels moyens de paiement acceptez-vous ?",
        ar: "ما هي طرق الدفع التي تقبلونها؟"
      },
      answer: {
        fr: "Nous acceptons le paiement par carte bancaire, virement, et paiement mobile. Pour les commandes importantes, des paiements échelonnés peuvent être négociés.",
        ar: "نقبل الدفع بواسطة البطاقة البنكية، التحويل البنكي، والدفع عبر الهاتف المحمول. بالنسبة للطلبات الكبيرة، يمكن التفاوض على الدفع بالتقسيط."
      }
    },
    {
      id: "6",
      question: {
        fr: "Les produits sont-ils de bonne qualité ?",
        ar: "هل المنتجات ذات جودة جيدة؟"
      },
      answer: {
        fr: "Tous nos accessoires de couture proviennent de fournisseurs fiables et sont soigneusement vérifiés avant expédition pour garantir une qualité optimale et une longue durée de vie.",
        ar: "جميع مستلزمات الخياطة لدينا تأتي من موردين موثوقين ويتم فحصها بعناية قبل الشحن لضمان جودة عالية وعمر طويل."
      }
    },
    {
      id: "7",
      question: {
        fr: "Puis-je retourner un produit si je ne suis pas satisfait ?",
        ar: "هل يمكنني إرجاع منتج إذا لم أكن راضيًا؟"
      },
      answer: {
        fr: "Oui, nous acceptons les retours sous 14 jours après réception, à condition que le produit soit dans son état d'origine et non utilisé. Les frais de retour sont à la charge du client sauf en cas de défaut de fabrication.",
        ar: "نعم، نقبل الإرجاع خلال 14 يومًا من الاستلام، بشرط أن يكون المنتج في حالته الأصلية وغير مستخدم. تكاليف الإرجاع يتحملها العميل إلا في حالة وجود عيب في التصنيع."
      }
    },
    {
      id: "8",
      question: {
        fr: "Proposez-vous des conseils ou tutoriels de couture ?",
        ar: "هل تقدمون نصائح أو دروسًا في الخياطة؟"
      },
      answer: {
        fr: "Absolument ! Nous partageons régulièrement des guides, tutoriels et astuces de couture sur notre blog et notre chaîne YouTube pour vous aider à réaliser vos projets facilement.",
        ar: "بالتأكيد! نحن نشارك بانتظام أدلة، دروسًا ونصائح في الخياطة على مدونتنا وقناتنا على يوتيوب لمساعدتك على إنجاز مشاريعك بسهولة."
      }
    }
  ]

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {t("header.title")}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("header.subtitle")}
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
                  {faq.question[locale as "fr" | "ar"]}
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
                    {faq.answer[locale as "fr" | "ar"]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-green-50 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-3">
            {t("contact.title")}
          </h3>
          <p className="text-green-700 mb-4">{t("contact.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+212 670366581"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold"
            >
              {t("contact.callButton")}
            </a>
            <a
              href="mailto:Denon_taha@hotmail.fr"
              className="bg-white text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300 font-semibold"
            >
              {t("contact.emailButton")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
