import React from "react"
import { getTranslations } from "next-intl/server"
import { Phone, Mail, MapPin, Scissors } from "lucide-react"
import ContactInfoCard from "@/components/contact/ContactInfoCard"
import OpeningHours from "@/components/contact/OpeningHours"
import LocationSection from "@/components/contact/LocationSection"
import SocialMediaCard from "@/components/contact/SocialMediaCard"
import FAQSection from "@/components/contact/FAQSection"
import WhyChooseUs from "@/components/WhyCoseUs"
import { Metadata } from "next"

// Types TypeScript
interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: string[]
  color: string
}

// Metadata pour SEO avec i18n
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ContactPage.metadata")

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: "Contact - CoutureShop",
      description: t("description"),
      type: "website"
    }
  }
}

// Composant Hero Contact (Server-side)
const ContactHero = async () => {
  const t = await getTranslations("ContactPage.hero")

  return (
    <section className=" text-orange-600 py-16">
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

  const contactInfos: ContactInfo[] = [
    {
      icon: <Phone size={40} />,
      title: t("customerService.title"),
      content: [
        t("customerService.phone"),
        t("customerService.schedule1"),
        t("customerService.schedule2")
      ],
      color: "bg-orange-500 text-white"
    },
    {
      icon: <Mail size={40} />,
      title: t("email.title"),
      content: [t("email.address"), t("email.responseTime")],
      color: "bg-orange-600 text-white"
    },
    {
      icon: <MapPin size={40} />,
      title: t("showroom.title"),
      content: [
        t("showroom.address1"),
        t("showroom.address2"),
        t("showroom.city")
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

        {/* Section informative */}
        <div className="mt-16">
          <WhyChooseUs />
        </div>
      </div>
    </div>
  )
}

export default ContactPage
