'use client';

import React, { useState } from 'react';
import { FormData, FormErrors } from '@/types/type';
import { 
  Save, 
  Upload, 
  Eye, 
  Star, 
  Package, 
  DollarSign, 
  Tag, 
  Palette, 
  Ruler, 
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

// Composant pour les champs de saisie avec icône
const InputField: React.FC<{
  label: string;
  name: string;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
  options?: string[];
  isTextArea?: boolean;
  isCheckbox?: boolean;
}> = ({ label, name, value, onChange, type = 'text', placeholder, icon, error, options, isTextArea, isCheckbox }) => {
  if (isCheckbox) {
    return (
      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value as boolean}
          onChange={onChange}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor={name} className="text-sm font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
        {icon}
        <span>{label}</span>
      </label>
      <div className="relative">
        {isTextArea ? (
          <textarea
            name={name}
            value={value as string}
            onChange={onChange}
            placeholder={placeholder}
            rows={4}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none ${
              error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          />
        ) : options ? (
          <select
            name={name}
            value={value as string}
            onChange={onChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white ${
              error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <option value="">Sélectionner {label.toLowerCase()}</option>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value as string}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          />
        )}
      </div>
      {error && (
        <p className="flex items-center space-x-1 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

// Composant de prévisualisation du produit
const ProductPreview: React.FC<{ formData: FormData }> = ({ formData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Eye className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Aperçu du produit</h3>
      </div>
      
      <div className="space-y-4">
        {/* Image */}
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
          {formData.image ? (
            <Image
              src={formData.image}
              alt={formData.name || 'Produit'}
              width={500}
              height = {500}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Package size={48} />
            </div>
          )}
        </div>
        
        {/* Informations produit */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800">{formData.name || 'Nom du produit'}</h4>
          <div className="flex items-center space-x-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Number(formData.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="text-sm text-gray-600">({formData.reviews || 0} avis)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">
              {formData.price ? `${formData.price}€` : '0€'}
            </span>
            {formData.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formData.originalPrice}€
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {formData.isNew && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Nouveau</span>
            )}
            {formData.isOnSale && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">En promo</span>
            )}
            <span className={`px-2 py-1 text-xs rounded-full ${
              formData.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {formData.inStock ? 'En stock' : 'Rupture'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant principal de la page
export default function AdminProductPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    rating: '',
    reviews: '',
    isNew: false,
    isOnSale: false,
    category: '',
    material: '',
    height: '',
    color: '',
    inStock: true,
    description: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ['Chaises', 'Tables', 'Canapés', 'Luminaires', 'Décoration', 'Rangement'];
  const colors = ['Blanc', 'Noir', 'Gris', 'Beige', 'Marron', 'Bleu', 'Vert', 'Rouge', 'Jaune'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Effacer l'erreur si le champ est maintenant rempli
    if (errors[name as keyof FormErrors] && value.trim()) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Le nom du produit est requis';
    if (!formData.price.trim()) newErrors.price = 'Le prix est requis';
    if (!formData.category.trim()) newErrors.category = 'La catégorie est requise';
    if (!formData.material.trim()) newErrors.material = 'Le matériau est requis';
    if (!formData.height.trim()) newErrors.height = 'La hauteur est requise';
    if (!formData.color.trim()) newErrors.color = 'La couleur est requise';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';

    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = 'Le prix doit être un nombre valide';
    }

    if (formData.originalPrice && isNaN(Number(formData.originalPrice))) {
      newErrors.originalPrice = 'Le prix original doit être un nombre valide';
    }

    if (formData.rating && (isNaN(Number(formData.rating)) || Number(formData.rating) < 0 || Number(formData.rating) > 5)) {
      newErrors.rating = 'La note doit être entre 0 et 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici vous pouvez ajouter votre logique d'API
      console.log('Données du produit:', formData);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        price: '',
        originalPrice: '',
        image: '',
        rating: '',
        reviews: '',
        isNew: false,
        isOnSale: false,
        category: '',
        material: '',
        height: '',
        color: '',
        inStock: true,
        description: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Administration des Produits
          </h1>
          <p className="text-gray-600">Ajoutez un nouveau produit à votre catalogue</p>
        </div>

        {/* Message de succès */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50">
            <CheckCircle size={20} />
            <span>Produit ajouté avec succès!</span>
          </div>
        )}

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations de base */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    <span>Informations de base</span>
                  </h2>
                </div>

                <InputField
                  label="Nom du produit"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Chaise moderne en bois"
                  icon={<Tag size={16} />}
                  error={errors.name}
                />

                <InputField
                  label="Catégorie"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  icon={<Package size={16} />}
                  options={categories}
                  error={errors.category}
                />

                {/* Prix */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6 flex items-center space-x-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <span>Tarification</span>
                  </h2>
                </div>

                <InputField
                  label="Prix actuel (€)"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="99.99"
                  icon={<DollarSign size={16} />}
                  error={errors.price}
                />

                <InputField
                  label="Prix original (€)"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="129.99"
                  icon={<DollarSign size={16} />}
                  error={errors.originalPrice}
                />

                {/* Caractéristiques */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6 flex items-center space-x-2">
                    <Ruler className="w-6 h-6 text-purple-600" />
                    <span>Caractéristiques</span>
                  </h2>
                </div>

                <InputField
                  label="Matériau"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  placeholder="Ex: Bois de chêne"
                  icon={<Package size={16} />}
                  error={errors.material}
                />

                <InputField
                  label="Hauteur"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Ex: 85cm"
                  icon={<Ruler size={16} />}
                  error={errors.height}
                />

                <InputField
                  label="Couleur"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  icon={<Palette size={16} />}
                  options={colors}
                  error={errors.color}
                />

                <InputField
                  label="URL de l'image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  icon={<Upload size={16} />}
                  error={errors.image}
                />

                {/* Évaluations */}
                <InputField
                  label="Note (0-5)"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="4.5"
                  icon={<Star size={16} />}
                  error={errors.rating}
                />

                <InputField
                  label="Nombre d'avis"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="127"
                  icon={<Star size={16} />}
                  error={errors.reviews}
                />

                {/* Description */}
                <div className="md:col-span-2">
                  <InputField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Décrivez votre produit en détail..."
                    icon={<FileText size={16} />}
                    isTextArea={true}
                    error={errors.description}
                  />
                </div>

                {/* Options */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Options du produit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label="Nouveau produit"
                      name="isNew"
                      value={formData.isNew}
                      onChange={handleInputChange}
                      isCheckbox={true}
                    />
                    <InputField
                      label="En promotion"
                      name="isOnSale"
                      value={formData.isOnSale}
                      onChange={handleInputChange}
                      isCheckbox={true}
                    />
                    <InputField
                      label="En stock"
                      name="inStock"
                      value={formData.inStock}
                      onChange={handleInputChange}
                      isCheckbox={true}
                    />
                  </div>
                </div>

                {/* Bouton de soumission */}
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    <Save size={20} />
                    <span>{isSubmitting ? 'Ajout en cours...' : 'Ajouter le produit'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Aperçu */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ProductPreview formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}