import { PackageX } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  searchQuery?: string
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-lg">
      <div className="mb-6 rounded-full bg-orange-100 p-6">
        <PackageX className="h-16 w-16 text-orange-600" />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-gray-900">
        Aucun pack trouvé
      </h3>
      <p className="mb-6 max-w-md text-gray-600">
        {searchQuery ? (
          <>
            Aucun pack ne correspond à votre recherche{" "}
            <span className="font-semibold">&apos;{searchQuery}&apos;</span>.
            Essayez avec d&pos;autres mots-clés.
          </>
        ) : (
          "Aucun pack ne correspond à vos critères de recherche. Essayez de modifier vos filtres."
        )}
      </p>
      <Link
        href="/packs"
        className="rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700"
      >
        Réinitialiser les filtres
      </Link>
    </div>
  )
}
