"use client"

import { useTranslations } from "next-intl"

export function PacksHero() {
  const t = useTranslations("PacksPage.hero")
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-firstColor to-secondColor py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-10" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            {t("subtitle")}
          </p>
        </div>
      </div>
      {/* Decorative waves */}
    </section>
  )
}

