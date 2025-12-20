"use client"

import { useLocale } from "next-intl"
import { usePathname, Link } from "@/i18n/navigation"

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

// "use client"

// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import { routing } from "@/i18n/routing"

// export default function LanguageSwitcher() {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   const currentLocale = pathname?.split("/")[1] || routing.defaultLocale

//   function switchLocale(newLocale: string) {
//     if (newLocale === currentLocale) return

//     // احذف الـ locale القديم من بداية الـ pathname
//     const pathWithoutLocale = pathname?.replace(/^\/(ar|fr)/, "") || ""

//     // أعد بناء الـ URL مع locale الجديد
//     const newPath = `/${newLocale}${pathWithoutLocale}${
//       searchParams.toString() ? `?${searchParams.toString()}` : ""
//     }`

//     router.push(newPath) // ✅ يغير اللغة بدون refresh
//   }

//   return (
//     <div className="flex gap-2">
//       {routing.locales.map((locale) => (
//         <button
//           key={locale}
//           onClick={() => switchLocale(locale)}
//           className={`px-3 py-1 rounded ${
//             currentLocale === locale
//               ? "bg-yellow-500 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           {locale.toUpperCase()}
//         </button>
//       ))}
//     </div>
//   )
// }
