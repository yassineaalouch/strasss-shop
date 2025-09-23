import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getLocale } from "next-intl/server"
import HeroSlider from "./HeroSlider"

export default async function HeroSection() {
  const locale = await getLocale()

  const HeroSectionContent = {
    title: {
      ar: "اكتشف إكسسوارات الخياطة عالية الجودة لدينا",
      fr: "Découvrez nos accessoires de couture de qualité"
    },
    description: {
      ar: "خيوط، إبر، مقصات وكل ما تحتاجه لمشاريع الخياطة. توصيل سريع وموثوق.",
      fr: "Fils, aiguilles, ciseaux et tout le nécessaire pour vos projets de couture. Livraison rapide et fiable."
    },
    button: {
      ar: "شاهد منتجاتنا",
      fr: "Voir nos produits"
    },
    images: [
      "https://static.mapetitemercerie.com/56855-large_default/mannequin-de-couture-prymadonna-multi-taille-s.jpg",
      "https://static.mapetitemercerie.com/200778-large_default/fil-macaroni-coton-recycle-cachou-100m.jpg",
      "https://static.mapetitemercerie.com/191023-large_default/aiguille-circulaire-bois-d-erable-80-cm-n15.jpg",
      "https://static.mapetitemercerie.com/242692-large_default/boutons-pressions-15-mm-outillage-couture-loisirs.jpg"
    ]
  }

  return (
    <section className="bg-gray-50 text-firstColor py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Left content */}
        <div className="flex-1 max-w-2xl mb-12 lg:mb-0">
          <h1 className="text-5xl font-bold mb-6">
            {HeroSectionContent.title[locale as "fr" | "ar"]}
          </h1>
          <p className="text-xl mb-8 text-firstColor/80">
            {HeroSectionContent.description[locale as "fr" | "ar"]}
          </p>
          <Link
            href="/shop"
            className="bg-firstColor max-w-1/4 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:border-firstColor hover:text-firstColor border-2 flex items-center"
          >
            {HeroSectionContent.button[locale as "fr" | "ar"]}
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>

        {/* Slider (client component) */}
        <div className="flex-1 lg:ml-12 w-full max-w-lg">
          <HeroSlider images={HeroSectionContent.images} />
        </div>
      </div>
    </section>
  )
}
