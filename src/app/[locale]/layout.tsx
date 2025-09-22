import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/app/globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import SocialMediaCard from "@/components/contact/SocialMediaCard"
import { NextIntlClientProvider } from "next-intl"
import { CartProvider } from "../context/CartContext"
import { routing } from "@/i18n/routing"
import { getMessages } from "next-intl/server"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Strass Shop",
  description:
    "Votre spécialiste en accessoires de couture au Maroc. Fils, aiguilles, ciseaux, machines à coudre et fournitures de qualité. Livraison rapide, conseils d'experts et service client 7j/7.",
  keywords: [
    "accessoires couture",
    "fournitures couture Maroc",
    "fils à coudre",
    "aiguilles couture",
    "ciseaux couture",
    "machines à coudre",
    "mercerie en ligne",
    "couture Maroc",
    "DIY couture",
    "matériel couture"
  ]
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  const messages = await getMessages({ locale })
  const direction = locale === "ar" ? "rtl" : "ltr"

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            <Header />
            <div className="min-h-screen">{children}</div>
            <SocialMediaCard />
            <WhatsAppButton />
            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
