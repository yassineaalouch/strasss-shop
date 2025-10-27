"use client"

import React, { useState, useEffect } from "react"
import { Save, Upload, X, Plus, Loader2 } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ProductFormData } from "@/types/product"
import { Category } from "@/types/category"
import { Discount } from "@/types/discount"
import {
  ICharacteristic,
  ICharacteristicValue,
  LocalizedName
} from "@/types/characteristic"

const AdminAddProduct: React.FC = () => {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingDiscounts, setLoadingDiscounts] = useState(true)

  const [formData, setFormData] = useState<ProductFormData>({
    name: { ar: "", fr: "" },
    description: { ar: "", fr: "" },
    price: 0,
    originalPrice: undefined,
    images: [],
    isNewProduct: false,
    isOnSale: false,
    category: "",
    discount: "",
    Characteristic: [],
    inStock: true,
    quantity: 0
  })

  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState<"fr" | "ar">("fr")
  const [uploadingImages, setUploadingImages] = useState(false)
  // Ajoutez ces interfaces
  interface SelectedCharacteristic {
    characteristicId: string
    characteristicName: LocalizedName
    selectedValues: ICharacteristicValue[]
  }

  // Ajoutez cet état dans votre composant
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    SelectedCharacteristic[]
  >([])
  const [characteristics, setCharacteristics] = useState<ICharacteristic[]>([])
  const [loadingCharacteristics, setLoadingCharacteristics] = useState(false)
  // Charger les catégories
  // Ajoutez cette fonction dans useEffect
  const fetchCharacteristics = async () => {
    try {
      setLoadingCharacteristics(true)
      const response = await axios.get("/api/characteristics")
      setCharacteristics(response.data)
    } catch (error) {
      console.error("Erreur lors du chargement des caractéristiques:", error)
      alert("Erreur lors du chargement des caractéristiques")
    } finally {
      setLoadingCharacteristics(false)
    }
  }

  // Modifiez votre useEffect
  useEffect(() => {
    fetchCategories()
    fetchDiscounts()
    fetchCharacteristics()
  }, [])
  // Ajoutez ces fonctions
  const addCharacteristic = () => {
    setSelectedCharacteristics((prev) => [
      ...prev,
      {
        characteristicId: "",
        characteristicName: { ar: "", fr: "" },
        selectedValues: []
      }
    ])
  }

  const removeCharacteristic = (index: number) => {
    setSelectedCharacteristics((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCharacteristicChange = (
    index: number,
    characteristicId: string
  ) => {
    const selectedChar = characteristics.find((c) => c._id === characteristicId)
    if (!selectedChar) return

    setSelectedCharacteristics((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              characteristicId,
              characteristicName: selectedChar.name,
              selectedValues: []
            }
          : item
      )
    )
  }

  const handleValueChange = (
    charIndex: number,
    valueId: string,
    isChecked: boolean
  ) => {
    const characteristic = characteristics.find(
      (c) => c._id === selectedCharacteristics[charIndex].characteristicId
    )

    if (!characteristic) return

    const value = characteristic.values.find((v) => v?._id === valueId)
    if (!value) return

    setSelectedCharacteristics((prev) =>
      prev.map((item, i) => {
        if (i !== charIndex) return item

        if (isChecked) {
          return {
            ...item,
            selectedValues: [...item.selectedValues, value]
          }
        } else {
          return {
            ...item,
            selectedValues: item.selectedValues.filter((v) => v._id !== valueId)
          }
        }
      })
    )
  }

  // Fonction pour transformer les données avant soumission
  const transformCharacteristicsForSubmit = () => {
    const characteristicList = selectedCharacteristics.map((char) => ({
      name: char.characteristicId,
      values: char.selectedValues.map((val) => val.name)
    }))
    console.log("characteristicList", characteristicList)
    return characteristicList
  }
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true)
      const response = await axios.get("/api/categories")
      if (response.data.success) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error)
      alert("Erreur lors du chargement des catégories")
    } finally {
      setLoadingCategories(false)
    }
  }

  const fetchDiscounts = async () => {
    try {
      setLoadingDiscounts(true)
      const response = await axios.get("/api/discounts?excludeCoupon=true")

      if (response.data.success) {
        setDiscounts(response.data.discounts)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error)
      alert("Erreur lors du chargement des discounts")
    } finally {
      setLoadingDiscounts(false)
    }
  }

  type ProductFormValue = ProductFormData[keyof ProductFormData]

  const handleInputChange = (
    field: keyof ProductFormData,
    value: ProductFormValue
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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

  // Gestion des fichiers images
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const newFiles = Array.from(e.target.files)

    // Validation des fichiers
    const validFiles = newFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Seules les images sont autorisées")
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 5MB")
        return false
      }
      return true
    })

    setImageFiles((prev) => [...prev, ...validFiles])

    // Créer les prévisualisations
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file))
    setImagePreviews((prev) => [...prev, ...newPreviews])
  }

  // Supprimer une image avant upload
  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))

    // Libérer l'URL de prévisualisation
    URL.revokeObjectURL(imagePreviews[index])
  }

  // Upload des images vers S3
  const uploadImagesToS3 = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return []

    setUploadingImages(true)

    try {
      const formData = new FormData()
      imageFiles.forEach((file) => formData.append("files", file))

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      return response.data.urls
    } catch (err) {
      console.error("Erreur upload:", err)
      throw new Error("Erreur lors de l'upload des images")
    } finally {
      setUploadingImages(false)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.fr.trim()) newErrors.nameFr = "Nom en français requis"
    if (!formData.name.ar.trim()) newErrors.nameAr = "Nom en arabe requis"
    if (formData.price <= 0) newErrors.price = "Prix doit être supérieur à 0"
    if (formData.images.length === 0 && imageFiles.length === 0)
      newErrors.images = "Au moins une image requise"
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
      let imageUrls: string[] = [...formData.images]

      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImagesToS3()
        imageUrls = [...imageUrls, ...uploadedUrls]
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        originalPrice: formData.originalPrice,
        images: imageUrls,
        category: formData.category,
        discount: formData.discount,
        Characteristic: transformCharacteristicsForSubmit(),
        inStock: formData.inStock,
        quantity: formData.quantity,
        isNewProduct: formData.isNewProduct,
        isOnSale: formData.isOnSale
      }

      const response = await axios.post("/api/products", productData)

      if (response.data.success) {
        alert("Produit ajouté avec succès!")
        router.push("/dashboard/productList")
      }
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      Prix (MAD) *
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
                      disabled={isSubmitting}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix original (MAD)
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
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Catégorie et Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie *
                    </label>
                    {loadingCategories ? (
                      <div className="flex items-center justify-center py-2">
                        <Loader2 className="animate-spin" size={20} />
                      </div>
                    ) : (
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.category ? "border-red-500" : "border-gray-300"
                        }`}
                        disabled={isSubmitting}
                      >
                        <option value="">Sélectionner...</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name.fr}
                          </option>
                        ))}
                      </select>
                    )}
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>
                  {/* //Solde */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Solde
                    </label>
                    {loadingDiscounts ? (
                      <div className="flex items-center justify-center py-2">
                        <Loader2 className="animate-spin" size={20} />
                      </div>
                    ) : (
                      <select
                        value={formData.discount}
                        onChange={(e) =>
                          handleInputChange("discount", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.category ? "border-red-500" : "border-gray-300"
                        }`}
                        disabled={isSubmitting}
                      >
                        <option value="">Sélectionner...</option>
                        {discounts.map((dis) => (
                          <option key={dis._id} value={dis._id}>
                            {dis.name.fr}
                          </option>
                        ))}
                      </select>
                    )}
                    {errors.discount && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.discount}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      En stock
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isNewProduct}
                      onChange={(e) =>
                        handleInputChange("isNewProduct", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                    {(formData.images.length > 0 ||
                      imagePreviews.length > 0) && (
                      <div className="relative h-48">
                        <Image
                          src={imagePreviews[0] || formData.images[0]}
                          alt={formData.name[previewMode]}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 flex flex-col space-y-1">
                          {formData.isNewProduct && (
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
                          {formData.price} MAD
                        </span>
                        {formData.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formData.originalPrice} MAD
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

              {/* Upload vers S3 */}

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFilesChange}
                    className="hidden"
                    id="file-upload"
                    disabled={isSubmitting || uploadingImages}
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

                {/* Prévisualisation des fichiers */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={src}
                            alt={`preview-${index}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={isSubmitting || uploadingImages}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center truncate">
                          {imageFiles[index]?.name || `Image ${index + 1}`}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
              )}
            </div>

            {/* Caractéristiques du produit */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Caractéristiques
                </h2>
                <button
                  type="button"
                  onClick={addCharacteristic}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                  disabled={isSubmitting || loadingCharacteristics}
                >
                  <Plus size={20} className="mr-2" />
                  Ajouter une caractéristique
                </button>
              </div>

              {loadingCharacteristics ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin mr-2" size={24} />
                  <span>Chargement des caractéristiques...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedCharacteristics.map((char, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-700">
                          Caractéristique {index + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeCharacteristic(index)}
                          className="text-red-500 hover:text-red-700"
                          disabled={isSubmitting}
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Sélection de la caractéristique */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom de la caractéristique *
                        </label>
                        <select
                          value={char.characteristicId}
                          onChange={(e) =>
                            handleCharacteristicChange(index, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={isSubmitting}
                        >
                          <option value="">
                            Sélectionner une caractéristique...
                          </option>
                          {characteristics.map((characteristic) => (
                            <option
                              key={characteristic._id}
                              value={characteristic._id}
                            >
                              {characteristic.name.fr} /{" "}
                              {characteristic.name.ar}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Sélection des valeurs */}
                      {char.characteristicId && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valeurs disponibles *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {characteristics
                              .find((c) => c._id === char.characteristicId)
                              ?.values.map((value) => (
                                <div
                                  key={value._id}
                                  className="flex items-center"
                                >
                                  <input
                                    type="checkbox"
                                    id={`value-${index}-${value._id}`}
                                    checked={char.selectedValues.some(
                                      (v) => v._id === value._id
                                    )}
                                    onChange={(e) =>
                                      handleValueChange(
                                        index,
                                        value._id!,
                                        e.target.checked
                                      )
                                    }
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    disabled={isSubmitting}
                                  />
                                  <label
                                    htmlFor={`value-${index}-${value._id}`}
                                    className="ml-2 text-sm text-gray-700"
                                  >
                                    {value.name.fr} / {value.name.ar}
                                  </label>
                                </div>
                              ))}
                          </div>
                          {char.selectedValues.length === 0 && (
                            <p className="text-yellow-600 text-sm mt-2">
                              Veuillez sélectionner au moins une valeur
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {selectedCharacteristics.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune caractéristique ajoutée. Cliquez sur &apos;Ajouter
                      une caractéristique&apos; pour commencer.
                    </div>
                  )}
                </div>
              )}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                onClick={() => router.back()}
                disabled={isSubmitting || uploadingImages}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting || uploadingImages}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting || uploadingImages ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    {uploadingImages
                      ? "Upload des images..."
                      : "Enregistrement..."}
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
