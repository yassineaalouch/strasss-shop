// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import createMiddleware from "next-intl/middleware"
// import { routing } from "./i18n/routing"

// const intlMiddleware = createMiddleware({
//   locales: routing.locales,
//   defaultLocale: routing.defaultLocale
// })

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   if (pathname.startsWith("/ar/dashboard")) {
//     const url = request.nextUrl.clone()
//     url.pathname = pathname.replace(/^\/ar/, "/fr")
//     return NextResponse.redirect(url)
//   }

//   if (
//     pathname.startsWith("/dashboard") &&
//     !pathname.startsWith("/fr") &&
//     !pathname.startsWith("/ar")
//   ) {
//     const url = request.nextUrl.clone()
//     url.pathname = `/fr${pathname}`
//     return NextResponse.redirect(url)
//   }

//   return intlMiddleware(request)
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"]
// }
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { auth } from "@/auth"

// 🌍 Middleware de gestion des langues
const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale
})

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 🔁 1️⃣ Redirection /ar/dashboard vers /fr/dashboard
  if (pathname.startsWith("/ar/dashboard")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/ar/, "/fr")
    return NextResponse.redirect(url)
  }

  // 🌐 2️⃣ Ajouter /fr automatiquement si pas de locale
  if (
    pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/fr") &&
    !pathname.startsWith("/ar")
  ) {
    const url = request.nextUrl.clone()
    url.pathname = `/fr${pathname}`
    return NextResponse.redirect(url)
  }

  // 🔒 3️⃣ Protection des routes dashboard
  if (pathname.includes("/dashboard")) {
    const session = await auth()

    // Si aucune session → rediriger vers /login
    if (!session) {
      const loginUrl = request.nextUrl.clone()

      // Déterminer la locale actuelle
      const localeMatch = pathname.match(/^\/(fr|ar)/)
      const locale = localeMatch ? localeMatch[1] : "fr"

      loginUrl.pathname = `/${locale}/login`
      return NextResponse.redirect(loginUrl)
    }
  }

  // ✅ 4️⃣ Si tout est bon → continuer avec next-intl
  return intlMiddleware(request)
}

// ⚙️ Configuration du middleware
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
}
