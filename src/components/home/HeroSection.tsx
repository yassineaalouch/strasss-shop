import { ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"
import HeroSlider from "./HeroSlider"

// Fonction pour récupérer les données Hero depuis la base de données
async function getHeroContent() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/hero-content`)

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données")
    }

    const result = await response.json()

    if (result.success) {
      return result.data
    }

    return null
  } catch (error) {
    // Erreur silencieuse pour le contenu Hero
    return null
  }
}

export default async function HeroSection() {
  const t = await getTranslations("HomePage")
  const locale = await getLocale()

  // Récupérer les données depuis la base de données
  const heroData = await getHeroContent()

  // Données par défaut (fallback)
  const HeroSectionContent = heroData || {
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
    <section className="relative min-h-[90vh] lg:min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-gradient-to-br from-amber-200/40 to-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-amber-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Content Column */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-orange-200/50 rounded-full text-sm font-semibold text-orange-600 shadow-lg w-fit mx-auto lg:mx-0 opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
              <Sparkles className="w-4 h-4" />
              <span>{t("Badge")}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                {HeroSectionContent.title[locale as "fr" | "ar"]}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
              {HeroSectionContent.description[locale as "fr" | "ar"]}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards]">
              <div className="flex flex-col items-center lg:items-start group">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    500+
                  </span>
                </div>
                <span className="text-sm sm:text-base text-gray-600 mt-1">
                  {t("StatistiquesRapides.Products")}
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start group">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    24h
                  </span>
                </div>
                <span className="text-sm sm:text-base text-gray-600 mt-1">
                  {t("StatistiquesRapides.Livraison")}
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start group">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    100%
                  </span>
                </div>
                <span className="text-sm sm:text-base text-gray-600 mt-1">
                  {t("StatistiquesRapides.Quality")}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.9s_forwards]">
              <Link
                href="/shop"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {HeroSectionContent.button[locale as "fr" | "ar"]}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
            </div>
          </div>

          {/* Slider Column */}
          <div className="relative order-1 lg:order-2 w-full opacity-0 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]">
            {/* Decorative Frame */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 via-amber-400/20 to-orange-400/20 rounded-3xl blur-2xl animate-pulse"></div>
              
              {/* Main Container */}
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-orange-100/50">
                {/* Slider */}
                <div className="relative overflow-hidden rounded-2xl">
                  <HeroSlider images={HeroSectionContent.images} />
                </div>
              </div>

              {/* Floating Decorations */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg animate-bounce [animation-delay:300ms]"></div>
              <div className="absolute -bottom-4 -left-2 w-7 h-7 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full shadow-lg animate-bounce [animation-delay:500ms]"></div>
              <div className="absolute -bottom-2 -right-4 w-5 h-5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-lg animate-bounce [animation-delay:700ms]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-20 sm:h-24 lg:h-28"
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
