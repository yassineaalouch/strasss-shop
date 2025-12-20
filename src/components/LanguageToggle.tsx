"use client"

import { useLocale } from "next-intl"
import { usePathname } from "@/i18n/navigation"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function LanguageToggle() {
  const locale = useLocale() // "fr" ou "ar"
  const pathname = usePathname() || "/" // pathname sans locale: "/" ou "/packs"
  const router = useRouter() // Router de Next.js standard
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  const otherLocale = locale === "fr" ? "ar" : "fr"

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLocaleChange = () => {
    if (!mounted) return

    // Obtient le pathname complet avec le locale depuis window.location
    const fullPathname = window.location.pathname
    
    // Remplace le locale dans le pathname
    // Ex: "/ar" -> "/fr", "/ar/packs" -> "/fr/packs"
    const newPathname = fullPathname.replace(/^\/(fr|ar)/, `/${otherLocale}`)
    
    // Ajoute les query params s'ils existent
    const queryString = searchParams.toString()
    const fullPath = queryString ? `${newPathname}?${queryString}` : newPathname
    
    // Navigue vers le nouveau chemin sans refresh complet
    router.push(fullPath)
  }

  return (
    <button
      onClick={handleLocaleChange}
      className="px-2 py-1 text-sm rounded border border-gray-300 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
    >
      {otherLocale.toUpperCase()}
    </button>
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
