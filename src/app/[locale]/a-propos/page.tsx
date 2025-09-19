import { Metadata } from 'next'
import AboutHero from '@/components/a-propos/AboutHero'
import AboutStats from '@/components/a-propos/AboutStats'
import AboutStory from '@/components/a-propos/AboutStory'
import AboutTeam from '@/components/a-propos/AboutTeam'
import AboutValues from '@/components/a-propos/AboutValues'
import AboutCTA from '@/components/a-propos/AboutCTA'

export const metadata: Metadata = {
  title: 'À Propos de Nous | Accessoires de Couture Premium',
  description: 'Découvrez notre passion pour la couture depuis plus de 20 ans. Spécialistes en accessoires de couture de qualité professionnelle pour créateurs et passionnés.',
  keywords: 'accessoires couture, matériel couture, fournitures couture, équipement couture professionnel',
  openGraph: {
    title: 'À Propos de Nous | Accessoires de Couture Premium',
    description: 'Notre histoire, nos valeurs et notre expertise en accessoires de couture',
    type: 'website',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: '/a-propos'
  }
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Accessoires Couture Premium",
    "description": "Spécialiste en accessoires de couture depuis plus de 20 ans",
    "foundingDate": "2003",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    },
    "sameAs": [
      "https://www.facebook.com/accessoires-couture",
      "https://www.instagram.com/accessoires-couture"
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <AboutHero />
        <AboutStats />
        <AboutStory />
        <AboutValues />
        <AboutTeam />
        <AboutCTA />
      </main>
    </>
  )
}
