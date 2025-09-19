import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const locale = "fr"

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
