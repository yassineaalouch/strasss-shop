// "use client"
// import { Link } from "@/i18n/navigation"
// import { useLocale } from "next-intl"
// import { usePathname } from "next/navigation"
// export default function LanguageToggle() {
//   const locale = useLocale() // "fr" ou "ar"
//   const pathname = usePathname() // ex: "/fr/about"

//   const otherLocale = locale === "fr" ? "ar" : "fr"

//   return (
//     <Link
//       href={pathname} // même page
//       locale={otherLocale} // change la locale
//       className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors"
//     >
//       {otherLocale.toUpperCase()}
//     </Link>
//   )
// }
"use client"

import { useLocale } from "next-intl"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function LanguageToggle() {
  const locale = useLocale() // "fr" ou "ar"
  const pathname = usePathname() || "/" // ex: "/fr/about" ou "/fr"

  const otherLocale = locale === "fr" ? "ar" : "fr"

  // Découpe le chemin en segments
  const segments = pathname.split("/").filter(Boolean) // ["fr", "about"]

  // Remplace le premier segment (la langue)
  segments[0] = otherLocale

  // Reconstruit le nouveau chemin
  const newPath = "/" + segments.join("/")

  return (
    <Link
      href={newPath}
      className="px-2 py-1 text-sm rounded border border-gray-300 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
    >
      {otherLocale.toUpperCase()}
    </Link>
  )
}
