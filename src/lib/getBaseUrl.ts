/**
 * Obtient l'URL de base pour les appels API dans les Server Components
 * Fonctionne en local et sur Vercel
 */
export function getBaseUrl(): string {
  // Sur Vercel, utiliser VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Si NEXT_PUBLIC_API_URL est défini, l'utiliser
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }

  // En local, utiliser localhost
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
}

