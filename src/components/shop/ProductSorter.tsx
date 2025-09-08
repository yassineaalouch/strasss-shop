'use client';

import React from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { ProductSorterProps, SortOption } from '@/types/type';







const ProductSorter: React.FC<ProductSorterProps> = ({
  totalProducts,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenFilters,
  currentPage,
  totalPages,
  onPageChange
}) => {
  const sortOptions: SortOption[] = [
    { value: 'name-asc', label: 'Nom A-Z' },
    { value: 'name-desc', label: 'Nom Z-A' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating-desc', label: 'Mieux notés' },
    { value: 'newest', label: 'Plus récents' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Notre Boutique</h1>
          <p className="text-gray-600">
            {totalProducts} produit{totalProducts > 1 ? 's' : ''} trouvé{totalProducts > 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Bouton filtres mobile */}
          <button
            onClick={onOpenFilters}
            className="lg:hidden flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <SlidersHorizontal size={20} className="mr-2" />
            Filtres
          </button>

          {/* Sélecteur de tri */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Trier par:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sélecteur de vue */}
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Précédent
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`px-4 py-2 rounded ${
                      currentPage === pageNum
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSorter;