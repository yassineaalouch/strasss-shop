// import { getRequestConfig } from "next-intl/server"

// export default getRequestConfig(async () => {
//   // Static for now, we'll change this later
//   const locale = "fr"

//   return {
//     locale,
//     messages: (await import(`./messages/${locale}.json`)).default
//   }
// })
import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ requestLocale }) => {
  // force resolve: requestLocale قد يكون promise، نحوله لـ string عادي
  const locale = (await requestLocale) || "fr"

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
