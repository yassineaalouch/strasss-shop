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
// // }




// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import createMiddleware from "next-intl/middleware"
// import { routing } from "./i18n/routing"
// import { getToken } from "next-auth/jwt"

// // Utilise le même secret que NextAuth (AUTH_SECRET ou NEXTAUTH_SECRET)
// const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET

// // 🌍 Middleware de gestion des langues
// const intlMiddleware = createMiddleware({
//   locales: routing.locales,
//   defaultLocale: routing.defaultLocale
// })

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // 🔁 1️⃣ Redirection /ar/dashboard vers /fr/dashboard
//   if (pathname.startsWith("/ar/dashboard")) {
//     const url = request.nextUrl.clone()
//     url.pathname = pathname.replace(/^\/ar/, "/fr")
//     return NextResponse.redirect(url)
//   }

//   // 🌐 2️⃣ Ajouter /fr automatiquement si pas de locale
//   if (
//     pathname.startsWith("/dashboard") &&
//     !pathname.startsWith("/fr") &&
//     !pathname.startsWith("/ar")
//   ) {
//     const url = request.nextUrl.clone()
//     url.pathname = `/fr${pathname}`
//     return NextResponse.redirect(url)
//   }

//   // 🔒 3️⃣ Protection des routes dashboard via le JWT de NextAuth
//   if (pathname.includes("/dashboard")) {
//     try {
//       const token = await getToken({ 
//         req: request as any, 
//         secret,
//         cookieName: process.env.NODE_ENV === "production" 
//           ? "__Secure-next-auth.session-token" 
//           : "next-auth.session-token"
//       })

//       // Si aucun token → rediriger vers /login
//       if (!token) {
//         const loginUrl = request.nextUrl.clone()

//         // Déterminer la locale actuelle
//         const localeMatch = pathname.match(/^\/(fr|ar)/)
//         const locale = localeMatch ? localeMatch[1] : "fr"

//         loginUrl.pathname = `/${locale}/login`
//         return NextResponse.redirect(loginUrl)
//       }
//     } catch (error) {
//       console.error("Middleware token error:", error)
//       // En cas d'erreur, rediriger vers login pour sécurité
//       const loginUrl = request.nextUrl.clone()
//       const localeMatch = pathname.match(/^\/(fr|ar)/)
//       const locale = localeMatch ? localeMatch[1] : "fr"
//       loginUrl.pathname = `/${locale}/login`
//       return NextResponse.redirect(loginUrl)
//     }
//   }

//   // ✅ 4️⃣ Si tout est bon → continuer avec next-intl
//   return intlMiddleware(request)
// }

// // ⚙️ Configuration du middleware
// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"]
// }



import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { getToken } from "next-auth/jwt"

const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET

// 🌍 next-intl DOIT être exécuté en premier
const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale
})

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // ✅ 1️⃣ Laisser next-intl gérer la locale AVANT toute chose
  const intlResponse = intlMiddleware(request)

  // 🔎 Extraire la locale depuis l’URL
  const localeMatch = pathname.match(/^\/(fr|ar)/)
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale

  // ===============================
  // 🔁 RèGLES SPÉCIALES DASHBOARD
  // ===============================

  // ❌ Interdire /ar/dashboard → forcer /fr/dashboard
  if (pathname.startsWith("/ar/dashboard")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/ar/, "/fr")
    return NextResponse.redirect(url)
  }

  // 🔒 Protection des routes dashboard
  if (pathname.includes("/dashboard")) {
    try {
      const token = await getToken({
        req: request as any,
        secret,
        cookieName:
          process.env.NODE_ENV === "production"
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token"
      })

      if (!token) {
        const loginUrl = request.nextUrl.clone()
        loginUrl.pathname = `/${locale}/login`
        return NextResponse.redirect(loginUrl)
      }
    } catch (error) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = `/${locale}/login`
      return NextResponse.redirect(loginUrl)
    }
  }

  // ✅ 3️⃣ Si aucune règle ne bloque → continuer
  return intlResponse
}

// ⚙️ Middleware matcher
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
}
