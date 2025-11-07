import { getTranslations } from "next-intl/server"
import ContactInfoCard from "@/components/contact/ContactInfoCard"
import OpeningHours from "@/components/contact/OpeningHours"
import LocationSection from "@/components/contact/LocationSection"
import SocialMediaCard from "@/components/contact/SocialMediaCard"
import FAQSection from "@/components/contact/FAQSection"
import { Phone, Mail, MapPin, Scissors } from "lucide-react"
import { ContactInfo } from "@/types/type"
import { getBaseUrl } from "@/lib/getBaseUrl"

async function getSiteInfo() {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/site-info`, {
      cache: "no-store"
    })
    if (response.ok) {
      const data = await response.json()
      return data.success ? data.siteInfo : null
    }
  } catch (error) {
    // Erreur silencieuse - retourner null
  }
  return null
}

// Composant Hero Contact (Server-side)
const ContactHero = async () => {
  const t = await getTranslations("ContactPage.hero")

  return (
    <section className="text-orange-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
            <Scissors className="text-white" size={32} />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("title")}</h1>
        <p className="text-xl text-black max-w-3xl mx-auto">{t("subtitle")}</p>
      </div>
    </section>
  )
}

// Composant Principal Contact Page (Server-side)
const ContactPage = async () => {
  const t = await getTranslations("ContactPage.contactInfos")
  const siteInfo = await getSiteInfo()

  const contactInfos: ContactInfo[] = [
    {
      icon: <Phone size={40} />,
      title: t("customerService.title"),
      content: [
        siteInfo?.phone || t("customerService.phone"),
        t("customerService.schedule1"),
        t("customerService.schedule2")
      ],
      color: "bg-orange-500 text-white"
    },
    {
      icon: <Mail size={40} />,
      title: t("email.title"),
      content: [
        siteInfo?.email || t("email.address"),
        t("email.responseTime")
      ],
      color: "bg-orange-600 text-white"
    },
    {
      icon: <MapPin size={40} />,
      title: t("showroom.title"),
      content: siteInfo?.location
        ? [
            siteInfo.location.fr,
            siteInfo.location.ar
          ]
        : [
            t("showroom.address1"),
            t("showroom.address2"),
            t("showroom.customerAddress")
          ],
      color: "bg-orange-700 text-white"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <ContactHero />

      <div className="container mx-auto px-4 py-16">
        {/* Section principale des informations de contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfos.map((info, index) => (
            <ContactInfoCard key={index} contactInfo={info} />
          ))}
        </div>

        {/* Section détaillée */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          <OpeningHours />
          <LocationSection />
          <SocialMediaCard />
        </div>

        {/* Section FAQ */}
        <FAQSection />
      </div>
    </div>
  )
}

export default ContactPage
