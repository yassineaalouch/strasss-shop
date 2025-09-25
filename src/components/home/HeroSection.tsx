import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"
import HeroSlider from "./HeroSlider"

export default async function HeroSection() {
  const t = await getTranslations("HomePage")
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
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 overflow-hidden">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-firstColor/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-secondColor/15 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-yellow-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-orange-300/25 rounded-full blur-2xl animate-bounce delay-500"></div>

        {/* Motifs géométriques */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-firstColor/30 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-secondColor/40 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-yellow-400/30 rounded-full animate-ping delay-700"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 py-12 lg:py-20">
          {/* Contenu principal */}
          <div className="flex-1 max-w-3xl text-center lg:text-left order-2 lg:order-1">
            {/* Badge animé */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-firstColor/20 rounded-full text-sm font-medium text-firstColor mb-6 shadow-lg animate-fade-in">
              <span className="w-2 h-2 bg-firstColor rounded-full mr-2 animate-pulse"></span>
              {t("Badge")}
            </div>

            {/* Titre principal avec effet de gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-firstColor via-secondColor to-orange-600 bg-clip-text text-transparent animate-gradient">
                {HeroSectionContent.title[locale as "fr" | "ar"]}
              </span>
            </h1>

            {/* Description avec animation */}
            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-300">
              {HeroSectionContent.description[locale as "fr" | "ar"]}
            </p>

            {/* Statistiques rapides */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 animate-fade-in-up delay-500">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl sm:text-3xl font-bold text-firstColor">
                  500+
                </span>
                <span className="text-sm text-gray-600">
                  {t("StatistiquesRapides.Products")}
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl sm:text-3xl font-bold text-firstColor">
                  24h
                </span>
                <span className="text-sm text-gray-600">
                  {t("StatistiquesRapides.Livraison")}
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl sm:text-3xl font-bold text-firstColor">
                  100%
                </span>
                <span className="text-sm text-gray-600">
                  {t("StatistiquesRapides.Quality")}
                </span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-700">
              <Link
                href="/shop"
                className="group relative overflow-hidden bg-gradient-to-r from-firstColor to-secondColor text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {HeroSectionContent.button[locale as "fr" | "ar"]}
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    size={20}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondColor to-firstColor opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>

          {/* Section slider créative */}
          <div className="flex-1 max-w-lg lg:max-w-2xl order-1 lg:order-2 w-full">
            <div className="relative">
              {/* Cadre décoratif */}
              <div className="absolute -inset-4 bg-gradient-to-r from-firstColor/20 to-secondColor/20 rounded-3xl blur-2xl animate-pulse"></div>

              {/* Container du slider */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/50">
                <div className="relative overflow-hidden rounded-2xl">
                  <HeroSlider images={HeroSectionContent.images} />

                  {/* Overlay avec effet de dégradé */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                </div>

                {/* Éléments décoratifs autour du slider */}
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-firstColor rounded-full animate-bounce"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondColor rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-3 -left-2 w-5 h-5 bg-yellow-400 rounded-full animate-bounce delay-500"></div>
                <div className="absolute -bottom-2 -right-3 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague en bas pour transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 sm:h-20"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  )
}
