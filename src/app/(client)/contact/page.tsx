import React from 'react';
import { Phone, Mail, MapPin, Scissors } from 'lucide-react';
import ContactInfoCard from '@/components/contact/ContactInfoCard';
import OpeningHours from '@/components/contact/OpeningHours';
import LocationSection from '@/components/contact/LocationSection';
import SocialMediaCard from '@/components/contact/SocialMediaCard';
import FAQSection from '@/components/contact/FAQSection';
import WhyChooseUs from '@/components/WhyCoseUs';

// Types TypeScript
interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  content: string[];
  color: string;
}

// Metadata pour SEO
export const metadata = {
  title: 'Contact - CoutureShop | Accessoires de Couture & Mercerie',
  description: 'Contactez CoutureShop pour tous vos besoins en accessoires de couture. Livraison rapide, conseils d\'experts, support 7j/7. Votre mercerie en ligne de confiance.',
  keywords: 'contact couture, accessoires couture, mercerie en ligne, fournitures couture, boutique couture maroc',
  openGraph: {
    title: 'Contact - CoutureShop',
    description: 'Contactez nos experts en accessoires de couture. Conseils personnalisés et service client dédié.',
    type: 'website',
  },
};



// Composant Hero Contact (Server-side)
const ContactHero: React.FC = () => {
  return (
    <section className=" text-orange-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
            <Scissors className='text-white' size={32} />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Contactez-nous
        </h1>
        <p className="text-xl text-black max-w-3xl mx-auto">
          Notre équipe passionnée est là pour vous accompagner dans tous vos projets de couture. 
          Conseils d&apos;experts, produits de qualité et service client exceptionnel.
        </p>
      </div>
    </section>
  );
};


// Composant Principal Contact Page (Server-side)
const ContactPage: React.FC = () => {
  const contactInfos: ContactInfo[] = [
    {
      icon: <Phone size={40} />,
      title: "Service Client",
      content: [
        "+212 670366581",
        "Lun-Ven: 09h00-18h00",
        "Sam: 10h00-17h00"
      ],
      color: "bg-orange-500 text-white"
    },
    {
      icon: <Mail size={40} />,
      title: "Email",
      content: [
        "Denon_taha@hotmail.fr",
        "Réponse sous 1h"
      ],
      color: "bg-orange-600 text-white"
    },
    {
      icon: <MapPin size={40} />,
      title: "Showroom",
      content: [
        "rue 4 numero 2 ",
        "quartier el bassatine  ",
        "Meknes"
      ],
      color: "bg-orange-700 text-white"
    }
  ];

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
  );
};

export default ContactPage;