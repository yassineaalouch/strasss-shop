'use client';

import React, { useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { ProductFilterProps } from '@/types/type';

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  filters,
  onFiltersChange,
  isOpen,
  onClose
}) => {
  // Extraire les options uniques des produits
  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const materials = useMemo(() => [...new Set(products.map(p => p.material))], [products]);
  const heights = useMemo(() => [...new Set(products.map(p => p.height))], [products]);
  const colors = useMemo(() => [...new Set(products.map(p => p.color))], [products]);

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    onFiltersChange({ ...filters, category: newCategories });
  };

  const handleMaterialChange = (material: string) => {
    const newMaterials = filters.material.includes(material)
      ? filters.material.filter(m => m !== material)
      : [...filters.material, material];
    onFiltersChange({ ...filters, material: newMaterials });
  };

  const handleHeightChange = (height: string) => {
    const newHeights = filters.height.includes(height)
      ? filters.height.filter(h => h !== height)
      : [...filters.height, height];
    onFiltersChange({ ...filters, height: newHeights });
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.color.includes(color)
      ? filters.color.filter(c => c !== color)
      : [...filters.color, color];
    onFiltersChange({ ...filters, color: newColors });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: [],
      priceRange: [0, 5000],
      material: [],
      height: [],
      color: [],
      inStock: false,
      onSale: false,
      rating: 0
    });
  };

  const sidebarClasses = `fixed lg:relative inset-y-0 z-100 lg:z-40 left-0 w-80 bg-white shadow-lg lg:shadow-none transform ${
    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  } transition-transform duration-300 ease-in-out lg:block`;

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = filters.category.length > 0 || 
    filters.material.length > 0 || 
    filters.height.length > 0 || 
    filters.color.length > 0 || 
    filters.inStock || 
    filters.onSale || 
    filters.rating > 0;

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <div className={sidebarClasses}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header des filtres */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Filter className="mr-2" size={20} />
              Filtres
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearAllFilters}
                className="text-sm text-green-600 hover:text-green-800"
              >
                Réinitialiser
              </button>
              <button
                onClick={onClose}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Prix */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Prix (DH)</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0] || ''}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1] || ''}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value) || 9999]
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>

          {/* Catégories */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Catégories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Matériau */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Matériau</h3>
            <div className="space-y-2">
              {materials.map((material) => (
                <label key={material} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.material.includes(material)}
                    onChange={() => handleMaterialChange(material)}
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{material}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Hauteur */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Hauteur</h3>
            <div className="space-y-2">
              {heights.map((height) => (
                <label key={height} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.height.includes(height)}
                    onChange={() => handleHeightChange(height)}
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{height}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Couleur */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Couleur</h3>
            <div className="space-y-2">
              {colors.map((color) => (
                <label key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.color.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Options supplémentaires */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Options</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => onFiltersChange({ ...filters, inStock: e.target.checked })}
                  className="mr-2 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">En stock uniquement</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.onSale}
                  onChange={(e) => onFiltersChange({ ...filters, onSale: e.target.checked })}
                  className="mr-2 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">En promotion</span>
              </label>
            </div>
          </div>

          {/* Note minimale */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Note minimale</h3>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onFiltersChange({ ...filters, rating: star })}
                  className={`${filters.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.564-.955L10 0l3.436 5.955L20 6.91l-5.245 4.635L15.878 18z"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Filtres actifs */}
          {hasActiveFilters && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Filtres actifs:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.category.map(category => (
                  <span key={category} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center">
                    {category}
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className="ml-1 hover:text-green-600"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                
                {filters.material.map(material => (
                  <span key={material} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center">
                    {material}
                    <button
                      onClick={() => handleMaterialChange(material)}
                      className="ml-1 hover:text-blue-600"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductFilter;