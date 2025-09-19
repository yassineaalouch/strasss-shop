import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  locales: ["fr", "ar"],
  defaultLocale: "fr"
})

export const config = {
  matcher: ["/((?!dashboard|api|_next|.*\\..*).*)"]
}
