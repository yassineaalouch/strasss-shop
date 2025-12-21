"use client"
import React, { useState, useEffect } from "react"
import { Save, Upload, X, Loader2, Plus } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { ProductFormData } from "@/types/product"
import { Category } from "@/types/category"
import { Discount } from "@/types/discount"
import mongoose from "mongoose"
import {
  ICharacteristic,
  ICharacteristicValue,
  LocalizedName,
  ProductCharacteristic,
  SelectedCharacteristic
} from "@/types/characteristic"
import { useToast } from "@/components/ui/Toast"

const AdminEditProduct: React.FC = () => {
  const { productId } = useParams()
  const router = useRouter()
  const { showToast } = useToast()
  const [categories, setCategories] = useState<Category[]>([])
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [characteristics, setCharacteristics] = useState<ICharacteristic[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingDiscounts, setLoadingDiscounts] = useState(true)
  const [loadingCharacteristics, setLoadingCharacteristics] = useState(false)
  const [initialImages, setInitialImages] = useState<string[]>([])

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

  const [loading, setLoading] = useState(true)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState<"fr" | "ar">("fr")
  const [uploadingImages, setUploadingImages] = useState(false)
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    SelectedCharacteristic[]
  >([])

  // Fonction pour mapper les caractéristiques du produit vers le format selectedCharacteristics
  const mapProductCharacteristicsToSelected = (
    productChars: ProductCharacteristic[],
    allCharacteristics: ICharacteristic[]
  ): SelectedCharacteristic[] => {
    console.log("productChars", productChars)
    return productChars.map((productChar) => {
      const characteristic = allCharacteristics.find(
        (c) => c._id === productChar.name._id
      )

      if (!characteristic) {
        return {
          characteristicId: productChar.name._id,
          characteristicName: { ar: "Non trouvé", fr: "Non trouvé" },
          selectedValues: []
        }
      }

      // Trouver les valeurs correspondantes dans la caractéristique
      const selectedValues = productChar.values.map((productValue) => {
        const foundValue = characteristic.values.find(
          (charValue) =>
            charValue._id === productValue._id ||
            (charValue.name.fr === productValue.fr &&
              charValue.name.ar === productValue.ar)
        )

        return (
          foundValue || {
            _id: productValue._id,
            name: {
              fr: productValue.fr,
              ar: productValue.ar
            }
          }
        )
      })

      return {
        characteristicId: productChar.name._id,
        characteristicName: characteristic.name,
        selectedValues
      }
    })
  }

  // Charger le produit par ID dès que le composant est monté
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)
        await Promise.all([
          fetchCharacteristics(),
          fetchCategories(),
          fetchDiscounts()
        ])

        // Une fois que toutes les données sont chargées, fetch le produit
        if (productId) {
          await fetchProduct()
        }
      } catch (error) {
        showToast("Erreur lors du chargement des données", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [productId])

  const fetchCharacteristics = async () => {
    try {
      setLoadingCharacteristics(true)
      const response = await axios.get("/api/characteristics")
      setCharacteristics(response.data)
    } catch (error) {
      showToast("Erreur lors du chargement des caractéristiques", "error")
    } finally {
      setLoadingCharacteristics(false)
    }
  }

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${productId}?forDashboard=true`)
      console.log("response", response)
      if (response.data.success) {
        const product = response.data.product
        setInitialImages(product.images || [])
        setFormData({
          name: {
            ar: product.name?.ar || "",
            fr: product.name?.fr || ""
          },
          description: {
            ar: product.description?.ar || "",
            fr: product.description?.fr || ""
          },
          price: product.price || 0,
          originalPrice: product.originalPrice || undefined,
          images: product.images || [],
          isNewProduct: product.isNewProduct || false,
          isOnSale: product.isOnSale || false,
          category: product.category?._id || "",
          discount: product.discount?._id || "",
          Characteristic: product.Characteristic || [],
          inStock: product.inStock ?? true,
          quantity: product.quantity || 0
        })
        // Mapper les caractéristiques du produit vers selectedCharacteristics
        if (product.Characteristic && product.Characteristic.length > 0) {
          const mappedCharacteristics = mapProductCharacteristicsToSelected(
            product.Characteristic,
            characteristics
          )
          setSelectedCharacteristics(mappedCharacteristics)
        }
      } else {
        showToast(response.data.message || "Erreur lors du chargement du produit", "error")
      }
    } catch (error) {
      console.error("Erreur lors du chargement du produit:", error)
      showToast("Erreur lors du chargement du produit", "error")
    }
  }

  // Re-mapper les caractéristiques quand les données des caractéristiques sont chargées
  useEffect(() => {
    if (
      formData.Characteristic &&
      formData.Characteristic.length > 0 &&
      characteristics.length > 0
    ) {
      console.log("formData.Characteristic", formData.Characteristic)
      const mappedCharacteristics = mapProductCharacteristicsToSelected(
        formData.Characteristic,
        characteristics
      )
      setSelectedCharacteristics(mappedCharacteristics)
    }
  }, [characteristics, formData.Characteristic])

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

    const value = characteristic.values.find((v) => v._id === valueId)
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
    return selectedCharacteristics.map((char) => ({
      name: char.characteristicId,
      values: char.selectedValues.map((val) => ({
        fr: val.name.fr,
        ar: val.name.ar,
        _id: val._id
      }))
    }))
  }

  // Charger les catégories
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true)
      const response = await axios.get("/api/categories")
      if (response.data.success) {
        setCategories(response.data.categories)
      } else {
        showToast(response.data.message || "Erreur lors du chargement des catégories", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement des catégories", "error")
    } finally {
      setLoadingCategories(false)
    }
  }

  // Charger les discounts
  const fetchDiscounts = async () => {
    try {
      setLoadingDiscounts(true)
      const response = await axios.get("/api/discounts?excludeCoupon=true")
      if (response.data.success) {
        setDiscounts(response.data.discounts)
      } else {
        showToast(response.data.message || "Erreur lors du chargement des promotions", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement des promotions", "error")
    } finally {
      setLoadingDiscounts(false)
    }
  }

  type ProductFormValue = ProductFormData[keyof ProductFormData]

  const handleInputChange = (
    field: keyof ProductFormData,
    value: ProductFormValue
  ) => {
    setFormData((prev) => {
      const updated: typeof prev = { ...prev, [field]: value }
      
      // Calcul automatique du prix original quand un discount PERCENTAGE est sélectionné
      if (field === "discount" || field === "price") {
        const discountId = field === "discount" ? (value as string) : prev.discount
        const currentPrice = field === "price" ? (value as number) : prev.price
        
        if (discountId && currentPrice > 0) {
          const selectedDiscount = discounts.find((d) => d._id === discountId)
          
          if (selectedDiscount && selectedDiscount.type === "PERCENTAGE" && selectedDiscount.value) {
            // Calculer le prix original : originalPrice = price / (1 - discount.value / 100)
            const discountPercentage = selectedDiscount.value
            const calculatedOriginalPrice = currentPrice / (1 - discountPercentage / 100)
            updated.originalPrice = Math.round(calculatedOriginalPrice * 100) / 100 // Arrondir à 2 décimales
          } else if (field === "discount" && !discountId) {
            // Si le discount est supprimé, réinitialiser le prix original
            updated.originalPrice = undefined
          }
        } else if (field === "discount" && !discountId) {
          // Si le discount est supprimé, réinitialiser le prix original
          updated.originalPrice = undefined
        }
      }
      
      return updated
    })
    
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

  // Gestion des fichiers images pour S3
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
  const handleRemoveNewImage = (index: number) => {
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
      showToast("Erreur lors de l'upload des images", "error")
      throw new Error("Erreur lors de l'upload des images")
    } finally {
      setUploadingImages(false)
    }
  }

  // Supprimer une image de S3
  const deleteImageFromS3 = async (imageUrl: string) => {
    try {
      // Extraire le nom du fichier de l'URL
      const fileName = imageUrl.split("/").pop()
      if (fileName) {
        await axios.delete("/api/delete", {
          data: { fileName }
        })
        console.log(`Image ${fileName} supprimée de S3`)
      }
    } catch (error) {
      // Erreur silencieuse - ne pas bloquer le processus si la suppression échoue
    }
  }

  // Supprimer une image existante
  const removeExistingImage = async (index: number) => {
    const imageToRemove = formData.images[index]

    // Vérifier si l'image fait partie des images initiales (stockées dans S3)
    if (initialImages.includes(imageToRemove)) {
      // Supprimer l'image de S3
      await deleteImageFromS3(imageToRemove)
    }

    // Supprimer l'image du formulaire
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

      // Upload des nouveaux fichiers vers S3
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImagesToS3()
        imageUrls = [...imageUrls, ...uploadedUrls]
      }

      // Identifier les images supprimées (présentes dans initialImages mais pas dans imageUrls)
      const deletedImages = initialImages.filter(
        (initialImage) => !imageUrls.includes(initialImage)
      )

      // Supprimer les images de S3
      for (const deletedImage of deletedImages) {
        await deleteImageFromS3(deletedImage)
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

      console.log("Données envoyées:", productData)

      const response = await axios.put(
        `/api/products/${productId}`,
        productData
      )

      if (response.data.success) {
        showToast("Produit modifié avec succès!", "success")
        router.push("/dashboard/productList")
      } else {
        showToast(response.data.message || "Erreur lors de la modification du produit", "error")
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        showToast(error.response.data.message, "error")
      } else {
        showToast("Erreur lors de la modification du produit", "error")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={32} />
          <p>Chargement du produit...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Modifier le Produit
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
                      {formData.discount && discounts.find((d) => d._id === formData.discount)?.type === "PERCENTAGE" && (
                        <span className="ml-2 text-xs text-blue-600 font-normal">
                          (Calculé automatiquement)
                        </span>
                      )}
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
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formData.discount && discounts.find((d) => d._id === formData.discount)?.type === "PERCENTAGE"
                          ? "bg-gray-50 cursor-not-allowed"
                          : ""
                      }`}
                      min="0"
                      step="0.01"
                      disabled={
                        isSubmitting ||
                        (formData.discount !== "" &&
                          discounts.find((d) => d._id === formData.discount)?.type === "PERCENTAGE")
                      }
                      readOnly={
                        formData.discount !== "" &&
                        discounts.find((d) => d._id === formData.discount)?.type === "PERCENTAGE"
                      }
                    />
                  </div>
                </div>

                {/* Catégorie et Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
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
                        <option value={""}>Sélectionner...</option>
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
                  {/* Solde */}
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
                          src={
                            imagePreviews[0] ||
                            formData.images[0] ||
                            "/No_Image_Available.jpg"
                          }
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

                {/* Affichage de TOUTES les images */}
                {(formData.images.length > 0 || imagePreviews.length > 0) && (
                  <div className="space-y-4">
                    {/* Images existantes */}
                    {formData.images.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                          Images existantes ({formData.images.length})
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {formData.images.map((image, index) => (
                            <div
                              key={`existing-${index}`}
                              className="relative group"
                            >
                              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 border-2 border-green-200">
                                <Image
                                  src={image || "/No_Image_Available.jpg"}
                                  alt={`Image existante ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeExistingImage(index)}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  disabled={isSubmitting}
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
                    )}

                    {/* Nouvelles images (prévisualisations) */}
                    {imagePreviews.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                          Nouvelles images à uploader ({imagePreviews.length})
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {imagePreviews.map((src, index) => (
                            <div
                              key={`new-${index}`}
                              className="relative group"
                            >
                              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-200">
                                <Image
                                  src={src}
                                  alt={`Nouvelle image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveNewImage(index)}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  disabled={isSubmitting || uploadingImages}
                                >
                                  <X size={16} />
                                </button>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 text-center truncate">
                                {imageFiles[index]?.name ||
                                  `Nouvelle ${index + 1}`}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {errors.images && (
                  <p className="text-red-500 text-sm">{errors.images}</p>
                )}
              </div>
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
                          value={char.characteristicId.toString()}
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
                    Modifier le produit
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

export default AdminEditProduct
