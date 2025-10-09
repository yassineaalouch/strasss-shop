"use client"

import React, { useState } from "react"
import { Save, Upload, X, Plus } from "lucide-react"
import Image from "next/image"
import { Product, ProductForm } from "@/types/type"

const AdminAddProduct: React.FC = () => {
  const [formData, setFormData] = useState<ProductForm>({
    name: { ar: "", fr: "" },
    price: 0,
    originalPrice: undefined,
    images: [],
    isNew: false,
    isOnSale: false,
    category: "",
    material: "",
    height: "",
    color: "",
    inStock: true,
    quantity: 0,
    description: { ar: "", fr: "" }
  })

  const [imageUrl, setImageUrl] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState<"fr" | "ar">("fr")
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url")

  // Liste des catégories (à remplacer par des données dynamiques)
  const categories = [
    "Tissus",
    "Fils et Aiguilles",
    "Boutons et Fermetures",
    "Accessoires de Couture",
    "Machines à Coudre",
    "Outils de Mesure"
  ]

  const materials = [
    "Coton",
    "Polyester",
    "Laine",
    "Soie",
    "Lin",
    "Synthétique",
    "Métal",
    "Plastique"
  ]
  const colors = [
    "Rouge",
    "Bleu",
    "Vert",
    "Jaune",
    "Noir",
    "Blanc",
    "Rose",
    "Violet",
    "Orange",
    "Multicolore"
  ]

  type ProductFormValue = ProductForm[keyof ProductForm]

  const handleInputChange = (
    field: keyof ProductForm,
    value: ProductFormValue
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleNameChange = (lang: "ar" | "fr", value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: { ...prev.name, [lang]: value }
    }))
  }

  const handleDescriptionChange = (lang: "ar" | "fr", value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: { ...prev.description, [lang]: value }
    }))
  }

  const addImage = () => {
    if (imageUrl.trim() && !formData.images.includes(imageUrl.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }))
      setImageUrl("")
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        // Validation du fichier
        if (!file.type.startsWith("image/")) {
          alert("Seules les images sont autorisées")
          return
        }

        if (file.size > 5 * 1024 * 1024) {
          // 5MB max
          alert("La taille de l'image ne doit pas dépasser 5MB")
          return
        }

        // Créer une URL temporaire pour l'aperçu
        const imageUrl = URL.createObjectURL(file)

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, imageUrl]
        }))
      })
    }

    // Reset input
    event.target.value = ""
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.fr.trim()) newErrors.nameFr = "Nom en français requis"
    if (!formData.name.ar.trim()) newErrors.nameAr = "Nom en arabe requis"
    if (formData.price <= 0) newErrors.price = "Prix doit être supérieur à 0"
    if (formData.images.length === 0)
      newErrors.images = "Au moins une image requise"
    if (!formData.category) newErrors.category = "Catégorie requise"
    if (!formData.material.trim()) newErrors.material = "Matériau requis"
    if (!formData.color.trim()) newErrors.color = "Couleur requise"
    if (formData.quantity < 0)
      newErrors.quantity = "Quantité ne peut pas être négative"
    if (!formData.description.fr.trim())
      newErrors.descriptionFr = "Description en français requise"
    if (!formData.description.ar.trim())
      newErrors.descriptionAr = "Description en arabe requise"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulation d'API call
      const productData: Product = {
        ...formData,
        id: `prod_${Date.now()}`,
        rating: 0,
        reviews: 0
      }

      console.log("Produit à sauvegarder:", productData)

      // Simulated API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Produit ajouté avec succès!")

      // Reset form
      setFormData({
        name: { ar: "", fr: "" },
        price: 0,
        originalPrice: undefined,
        images: [],
        isNew: false,
        isOnSale: false,
        category: "",
        material: "",
        height: "",
        color: "",
        inStock: true,
        quantity: 0,
        description: { ar: "", fr: "" }
      })
    } catch (error) {
      console.error("Erreur:", error)
      alert("Erreur lors de l'ajout du produit")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Ajouter un Produit
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Aperçu:</span>
              <button
                onClick={() => setPreviewMode("fr")}
                className={`px-3 py-1 rounded text-sm ${
                  previewMode === "fr"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setPreviewMode("ar")}
                className={`px-3 py-1 rounded text-sm ${
                  previewMode === "ar"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                AR
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations de base */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Informations de base
                </h2>

                {/* Nom du produit */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom (Français) *
                    </label>
                    <input
                      type="text"
                      value={formData.name.fr}
                      onChange={(e) => handleNameChange("fr", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.nameFr ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Nom du produit en français"
                    />
                    {errors.nameFr && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nameFr}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom (Arabe) *
                    </label>
                    <input
                      type="text"
                      value={formData.name.ar}
                      onChange={(e) => handleNameChange("ar", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.nameAr ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="اسم المنتج بالعربية"
                      dir="rtl"
                    />
                    {errors.nameAr && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nameAr}
                      </p>
                    )}
                  </div>
                </div>

                {/* Prix */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (DH) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange(
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                      min="0"
                      step="0.01"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix original (DH)
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "originalPrice",
                          e.target.value
                            ? parseFloat(e.target.value)
                            : undefined
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Catégorie et Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Sélectionner...</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantité *
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange(
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.quantity ? "border-red-500" : "border-gray-300"
                      }`}
                      min="0"
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.quantity}
                      </p>
                    )}
                  </div>
                </div>

                {/* Options booléennes */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) =>
                        handleInputChange("inStock", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      En stock
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) =>
                        handleInputChange("isNew", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Nouveau produit
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isOnSale}
                      onChange={(e) =>
                        handleInputChange("isOnSale", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      En promotion
                    </label>
                  </div>
                </div>
              </div>

              {/* Aperçu du produit */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Aperçu
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {formData.images.length > 0 && (
                      <div className="relative h-48">
                        <Image
                          src={formData.images[0]}
                          alt={formData.name[previewMode]}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 flex flex-col space-y-1">
                          {formData.isNew && (
                            <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded">
                              Nouveau
                            </span>
                          )}
                          {formData.isOnSale && (
                            <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                              Promo
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {formData.name[previewMode] ||
                          `Nom (${previewMode.toUpperCase()})`}
                      </h3>

                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-bold text-orange-600">
                          {formData.price} DH
                        </span>
                        {formData.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formData.originalPrice} DH
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        {formData.description[previewMode] ||
                          `Description (${previewMode.toUpperCase()})`}
                      </p>

                      <button
                        type="button"
                        className={`w-full py-2 rounded font-medium ${
                          formData.inStock
                            ? "bg-orange-500 text-white"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                        disabled={!formData.inStock}
                      >
                        {formData.inStock
                          ? "Ajouter au panier"
                          : "Indisponible"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Images du produit
              </h2>

              {/* Sélecteur de méthode d'upload */}
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setUploadMethod("url")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    uploadMethod === "url"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  URL de image
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod("file")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    uploadMethod === "file"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Fichier local
                </button>
              </div>

              {/* Upload par URL */}
              {uploadMethod === "url" && (
                <div className="flex space-x-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://exemple.com/image.jpg"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                  >
                    <Plus size={20} className="mr-2" />
                    Ajouter
                  </button>
                </div>
              )}

              {/* Upload de fichier */}
              {uploadMethod === "file" && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload size={48} className="text-gray-400" />
                    <div>
                      <span className="text-blue-500 font-medium">
                        Cliquez pour sélectionner
                      </span>
                      <span className="text-gray-500">
                        {" "}
                        ou glissez-déposez vos images
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF jusqu&apos;à 5MB chacune
                    </p>
                  </label>
                </div>
              )}

              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center truncate">
                      Image {index + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Détails du produit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matériau *
                </label>
                <select
                  value={formData.material}
                  onChange={(e) =>
                    handleInputChange("material", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.material ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Sélectionner...</option>
                  {materials.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
                {errors.material && (
                  <p className="text-red-500 text-sm mt-1">{errors.material}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur *
                </label>
                <select
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.color ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Sélectionner...</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                {errors.color && (
                  <p className="text-red-500 text-sm mt-1">{errors.color}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hauteur
                </label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ex: 20cm, -"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Descriptions
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Français) *
                  </label>
                  <textarea
                    value={formData.description.fr}
                    onChange={(e) =>
                      handleDescriptionChange("fr", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 ${
                      errors.descriptionFr
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Description détaillée du produit en français"
                  />
                  {errors.descriptionFr && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.descriptionFr}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Arabe) *
                  </label>
                  <textarea
                    value={formData.description.ar}
                    onChange={(e) =>
                      handleDescriptionChange("ar", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 ${
                      errors.descriptionAr
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="وصف مفصل للمنتج بالعربية"
                    dir="rtl"
                  />
                  {errors.descriptionAr && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.descriptionAr}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => window.history.back()}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save size={20} className="mr-2" />
                    Enregistrer le produit
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminAddProduct
