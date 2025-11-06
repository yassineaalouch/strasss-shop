"use client"

import React, { useState, useEffect } from "react"
import {
  Save,
  Loader2,
  LayoutDashboard,
  Layers,
  Package,
  Settings,
  X,
  Plus,
  Trash2,
  Upload,
  ArrowUp,
  ArrowDown,
  Edit,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Search,
  Image as ImageIcon,
  Megaphone,
  ExternalLink
} from "lucide-react"
import { useToast } from "@/components/ui/Toast"
import Image from "next/image"
import axios from "axios"
import { Product } from "@/types/product"
import { Category } from "@/types/category"
import { SiteInfo } from "@/types/site-info"

type TabType = "hero" | "categories" | "featured-products" | "promo-banner" | "site-info"

interface HeroContent {
  title: { ar: string; fr: string }
  description: { ar: string; fr: string }
  button: { ar: string; fr: string }
  images: string[]
  socialLinks: Array<{
    id: string
    url: string
    icon: string
    className: string
    name: string
    isActive: boolean
    order: number
  }>
}

export default function HomePageContentPage() {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<TabType>("hero")
  const [currentLanguage, setCurrentLanguage] = useState<"fr" | "ar">("fr")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Hero Section States
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: { ar: "", fr: "" },
    description: { ar: "", fr: "" },
    button: { ar: "", fr: "" },
    images: [],
    socialLinks: []
  })
  const [heroImageFiles, setHeroImageFiles] = useState<File[]>([])
  const [heroImagePreviews, setHeroImagePreviews] = useState<string[]>([])
  const [uploadingHeroImages, setUploadingHeroImages] = useState(false)
  const [initialHeroImages, setInitialHeroImages] = useState<string[]>([])

  // Categories States
  const [homepageCategories, setHomepageCategories] = useState<Array<{
    _id: string
    name: { fr: string; ar: string }
    image: string
    productCount: number
    url: string
    order: number
    isActive: boolean
  }>>([])
  const [availableCategories, setAvailableCategories] = useState<Category[]>([])
  const [categoryFormData, setCategoryFormData] = useState({
    name: { fr: "", ar: "" },
    image: "",
    productCount: 0,
    url: "/shop",
    order: 0,
    isActive: true
  })
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [categorySearch, setCategorySearch] = useState("")
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null)
  const [categoryImagePreview, setCategoryImagePreview] = useState("")

  // Featured Products States
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [featuredProductIds, setFeaturedProductIds] = useState<string[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [productSearch, setProductSearch] = useState("")

  // Promo Banner States
  const [promoBanner, setPromoBanner] = useState({
    image: "",
    link: "",
    linkType: "custom" as "product" | "pack" | "custom",
    linkId: "",
    isActive: true
  })
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null)
  const [bannerImagePreview, setBannerImagePreview] = useState("")
  const [allPacks, setAllPacks] = useState<Array<{
    _id: string
    name: { fr?: string; ar?: string } | string
    images?: string[]
    price?: number
  }>>([])
  const [bannerLinkSearch, setBannerLinkSearch] = useState("")
  const [bannerLinkType, setBannerLinkType] = useState<"product" | "pack" | "custom">("custom")

  // Site Info States
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    email: "",
    phone: "",
    location: { fr: "", ar: "" }
  })

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        fetchHeroContent(),
        fetchHomepageCategories(),
        fetchAvailableCategories(),
        fetchFeaturedProducts(),
        fetchAllProducts(),
        fetchSiteInfo(),
        fetchPromoBanner(),
        fetchAllPacks()
      ])
    } catch (error) {
      showToast("Erreur lors du chargement des données", "error")
    } finally {
      setLoading(false)
    }
  }

  // ============ HERO SECTION ============
  const fetchHeroContent = async () => {
    try {
      const response = await axios.get("/api/hero-content")
      if (response.data.success) {
        const data = response.data.data
        setHeroContent({
          title: data.title,
          description: data.description,
          button: data.button,
          images: data.images || [],
          socialLinks: data.socialLinks || []
        })
        setInitialHeroImages(data.images || [])
      } else {
        showToast(response.data.message || "Erreur lors du chargement du contenu Hero", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement du contenu Hero", "error")
    }
  }

  const handleHeroFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        showToast("Seules les images sont autorisées", "warning")
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast("La taille de l'image ne doit pas dépasser 5MB", "warning")
        return false
      }
      return true
    })
    setHeroImageFiles((prev) => [...prev, ...newFiles])
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
    setHeroImagePreviews((prev) => [...prev, ...newPreviews])
  }

  const removeHeroImage = (index: number) => {
    setHeroImageFiles((prev) => prev.filter((_, i) => i !== index))
    setHeroImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const removeExistingHeroImage = (index: number) => {
    setHeroContent((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const uploadHeroImagesToS3 = async (): Promise<string[]> => {
    if (heroImageFiles.length === 0) return []
    setUploadingHeroImages(true)
    try {
      const formData = new FormData()
      heroImageFiles.forEach((file) => formData.append("files", file))
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      return response.data.urls
    } finally {
      setUploadingHeroImages(false)
    }
  }

  const saveHeroContent = async () => {
    setSaving(true)
    try {
      let imageUrls = [...heroContent.images]
      if (heroImageFiles.length > 0) {
        const uploadedUrls = await uploadHeroImagesToS3()
        imageUrls = [...imageUrls, ...uploadedUrls]
      }
      const response = await axios.put("/api/hero-content", {
        title: heroContent.title,
        description: heroContent.description,
        button: heroContent.button,
        images: imageUrls,
        socialLinks: heroContent.socialLinks
      })
      if (response.data.success) {
        showToast("Contenu Hero mis à jour avec succès", "success")
        setHeroImageFiles([])
        setHeroImagePreviews([])
        fetchHeroContent()
      }
    } catch (error) {
      showToast("Erreur lors de la sauvegarde", "error")
    } finally {
      setSaving(false)
    }
  }

  // ============ CATEGORIES ============
  const fetchHomepageCategories = async () => {
    try {
      const response = await fetch("/api/homepage-categories")
      const data = await response.json()
      if (data.success) {
        setHomepageCategories(data.categories || [])
      } else {
        showToast(data.message || "Erreur lors du chargement des catégories", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement des catégories", "error")
    }
  }

  const fetchAvailableCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      if (data.success) {
        setAvailableCategories(data.categories || [])
      } else {
        showToast(data.message || "Erreur lors du chargement des catégories disponibles", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement des catégories disponibles", "error")
    }
  }

  const handleCategorySelect = async (categoryId: string) => {
    if (!categoryId) {
      setSelectedCategoryId("")
      setCategoryFormData((prev) => ({
        ...prev,
        name: { fr: "", ar: "" },
        productCount: 0
      }))
      return
    }
    const selectedCategory = availableCategories.find((cat) => cat._id === categoryId)
    if (selectedCategory) {
      setSelectedCategoryId(categoryId)
      setCategoryFormData((prev) => ({
        ...prev,
        name: {
          fr: selectedCategory.name.fr,
          ar: selectedCategory.name.ar
        }
      }))
      try {
        const countResponse = await fetch(`/api/categories/${categoryId}/products-count`)
        const countData = await countResponse.json()
        if (countData.success) {
          setCategoryFormData((prev) => ({
            ...prev,
            productCount: countData.count
          }))
        } else {
          showToast(countData.message || "Erreur lors du comptage des produits", "error")
        }
      } catch (error) {
        showToast("Erreur lors du comptage des produits", "error")
      }
    }
  }

  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      showToast("Seules les images sont autorisées", "warning")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("La taille de l'image ne doit pas dépasser 5MB", "warning")
      return
    }
    setCategoryImageFile(file)
    const previewUrl = URL.createObjectURL(file)
    setCategoryImagePreview(previewUrl)
  }

  const uploadCategoryImageToS3 = async (): Promise<string> => {
    if (!categoryImageFile) throw new Error("Aucune image à télécharger")
    const formData = new FormData()
    formData.append("files", categoryImageFile)
    const response = await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    if (response.data.success && response.data.urls?.length > 0) {
      return response.data.urls[0]
    }
    throw new Error("Erreur lors de l'upload")
  }

  const saveCategory = async () => {
    if (!categoryFormData.name.fr || !categoryFormData.name.ar) {
      showToast("Veuillez remplir le nom", "warning")
      return
    }
    if (!categoryFormData.image && !categoryImageFile) {
      showToast("Veuillez ajouter une image", "warning")
      return
    }
    setSaving(true)
    try {
      let imageUrl = categoryFormData.image
      if (categoryImageFile) {
        imageUrl = await uploadCategoryImageToS3()
      }
      const url = editingCategoryId
        ? `/api/homepage-categories/${editingCategoryId}`
        : "/api/homepage-categories"
      const method = editingCategoryId ? "PUT" : "POST"
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...categoryFormData, image: imageUrl })
      })
      const data = await response.json()
      if (data.success) {
        showToast(
          editingCategoryId ? "Catégorie mise à jour" : "Catégorie créée",
          "success"
        )
        setShowCategoryForm(false)
        setEditingCategoryId(null)
        setCategoryFormData({
          name: { fr: "", ar: "" },
          image: "",
          productCount: 0,
          url: "/shop",
          order: homepageCategories.length,
          isActive: true
        })
        setSelectedCategoryId("")
        setCategoryImageFile(null)
        setCategoryImagePreview("")
        fetchHomepageCategories()
      } else {
        showToast(data.message || "Erreur", "error")
      }
    } catch (error) {
      showToast("Erreur lors de l'enregistrement", "error")
    } finally {
      setSaving(false)
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm("Supprimer cette catégorie ?")) return
    try {
      const response = await fetch(`/api/homepage-categories/${id}`, {
        method: "DELETE"
      })
      const data = await response.json()
      if (data.success) {
        showToast("Catégorie supprimée", "success")
        fetchHomepageCategories()
      }
    } catch (error) {
      showToast("Erreur lors de la suppression", "error")
    }
  }

  // ============ FEATURED PRODUCTS ============
  const fetchAllProducts = async () => {
    try {
      const response = await fetch("/api/products?limit=1000")
      const data = await response.json()
      if (data.success) {
        setAllProducts(data.products || [])
      } else {
        showToast(data.message || "Erreur lors du chargement des produits", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement des produits", "error")
    }
  }

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch("/api/featured-products")
      const data = await response.json()
      if (data.success) {
        setFeaturedProductIds(data.productIds || [])
        setFeaturedProducts(data.products || [])
      } else {
        showToast(data.message || "Erreur lors du chargement des produits en vedette", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement des produits en vedette", "error")
    }
  }

  const toggleFeaturedProduct = (productId: string) => {
    setFeaturedProductIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        if (prev.length >= 10) {
          showToast("Maximum 10 produits en vedette", "warning")
          return prev
        }
        return [...prev, productId]
      }
    })
  }

  const saveFeaturedProducts = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/featured-products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: featuredProductIds, isActive: true })
      })
      const data = await response.json()
      if (data.success) {
        showToast("Produits en vedette mis à jour", "success")
        fetchFeaturedProducts()
      } else {
        showToast(data.message || "Erreur", "error")
      }
    } catch (error) {
      showToast("Erreur lors de la sauvegarde", "error")
    } finally {
      setSaving(false)
    }
  }

  // ============ PROMO BANNER ============
  const fetchAllPacks = async () => {
    try {
      const response = await fetch("/api/product-packs?limit=1000")
      const data = await response.json()
      if (data.success) {
        setAllPacks(data.packs || [])
      } else {
        showToast(data.message || "Erreur lors du chargement des packs", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement des packs", "error")
    }
  }

  const fetchPromoBanner = async () => {
    try {
      const response = await fetch("/api/promo-banner")
      const data = await response.json()
      if (data.success && data.banner) {
        setPromoBanner({
          image: data.banner.image || "",
          link: data.banner.link || "",
          linkType: data.banner.linkType || "custom",
          linkId: data.banner.linkId || "",
          isActive: data.banner.isActive !== undefined ? data.banner.isActive : true
        })
        setBannerImagePreview(data.banner.image || "")
        setBannerLinkType(data.banner.linkType || "custom")
      } else {
        showToast(data.message || "Erreur lors du chargement de la bannière", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement de la bannière", "error")
    }
  }

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      showToast("Seules les images sont autorisées", "warning")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("La taille de l'image ne doit pas dépasser 5MB", "warning")
      return
    }
    setBannerImageFile(file)
    const previewUrl = URL.createObjectURL(file)
    setBannerImagePreview(previewUrl)
  }

  const uploadBannerImageToS3 = async (): Promise<string> => {
    if (!bannerImageFile) throw new Error("Aucune image à télécharger")
    const formData = new FormData()
    formData.append("files", bannerImageFile)
    const response = await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    if (response.data.success && response.data.urls?.length > 0) {
      return response.data.urls[0]
    }
    throw new Error("Erreur lors de l'upload")
  }

  const handleBannerLinkTypeChange = (type: "product" | "pack" | "custom") => {
    setBannerLinkType(type)
    setPromoBanner((prev) => ({
      ...prev,
      linkType: type,
      link: "",
      linkId: ""
    }))
  }

  const handleBannerLinkSelect = (itemId: string) => {
    if (bannerLinkType === "product") {
      const product = allProducts.find((p) => p._id === itemId)
      if (product) {
        setPromoBanner((prev) => ({
          ...prev,
          link: `/shop/${itemId}`,
          linkId: itemId
        }))
      }
    } else if (bannerLinkType === "pack") {
      const pack = allPacks.find((p) => p._id === itemId)
      if (pack) {
        setPromoBanner((prev) => ({
          ...prev,
          link: `/packs/${itemId}`,
          linkId: itemId
        }))
      }
    }
  }

  const savePromoBanner = async () => {
    if (!promoBanner.image && !bannerImageFile) {
      showToast("Veuillez ajouter une image", "warning")
      return
    }
    if (!promoBanner.link) {
      showToast("Veuillez ajouter un lien", "warning")
      return
    }
    setSaving(true)
    try {
      let imageUrl = promoBanner.image
      if (bannerImageFile) {
        imageUrl = await uploadBannerImageToS3()
      }
      const response = await fetch("/api/promo-banner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...promoBanner,
          image: imageUrl,
          linkType: bannerLinkType
        })
      })
      const data = await response.json()
      if (data.success) {
        showToast("Bannière mise à jour avec succès", "success")
        setBannerImageFile(null)
        fetchPromoBanner()
      } else {
        showToast(data.message || "Erreur", "error")
      }
    } catch (error) {
      showToast("Erreur lors de la sauvegarde", "error")
    } finally {
      setSaving(false)
    }
  }

  // ============ SITE INFO ============
  const fetchSiteInfo = async () => {
    try {
      const response = await fetch("/api/site-info")
      const data = await response.json()
      if (data.success && data.siteInfo) {
        setSiteInfo(data.siteInfo)
      } else {
        showToast(data.message || "Erreur lors du chargement des informations du site", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement des informations du site", "error")
    }
  }

  const saveSiteInfo = async () => {
    if (!siteInfo.email || !siteInfo.phone || !siteInfo.location.fr || !siteInfo.location.ar) {
      showToast("Veuillez remplir tous les champs", "warning")
      return
    }
    setSaving(true)
    try {
      const response = await fetch("/api/site-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteInfo)
      })
      const data = await response.json()
      if (data.success) {
        showToast("Informations mises à jour", "success")
      } else {
        showToast(data.message || "Erreur", "error")
      }
    } catch (error) {
      showToast("Erreur lors de la mise à jour", "error")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    )
  }

  const filteredCategories = availableCategories.filter((cat) => {
    const searchLower = categorySearch.toLowerCase()
    return (
      cat.name.fr.toLowerCase().includes(searchLower) ||
      cat.name.ar.toLowerCase().includes(searchLower)
    )
  })

  const filteredProducts = allProducts.filter((product) => {
    const searchLower = productSearch.toLowerCase()
    return (
      product.name.fr.toLowerCase().includes(searchLower) ||
      product.name.ar.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Home Page Content</h1>
        <p className="text-gray-600 mt-1">
          Gérez le contenu de la page d&apos;accueil
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("hero")}
              className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === "hero"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" />
                Hero Section
              </div>
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === "categories"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Catégories
              </div>
            </button>
            <button
              onClick={() => setActiveTab("featured-products")}
              className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === "featured-products"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Produits en Vedette
              </div>
            </button>
            <button
              onClick={() => setActiveTab("promo-banner")}
              className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === "promo-banner"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5" />
                Bannière Publicitaire
              </div>
            </button>
            <button
              onClick={() => setActiveTab("site-info")}
              className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === "site-info"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Informations du Site
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* HERO TAB */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Hero Section</h2>
                <button
                  onClick={saveHeroContent}
                  disabled={saving || uploadingHeroImages}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </>
                  )}
                </button>
              </div>

              {/* Language Toggle */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => setCurrentLanguage("fr")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    currentLanguage === "fr"
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  Français
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentLanguage("ar")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    currentLanguage === "ar"
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  العربية
                </button>
              </div>

              {/* Hero Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Titre ({currentLanguage === "fr" ? "Français" : "العربية"}) *
                  </label>
                  <input
                    type="text"
                    value={heroContent.title[currentLanguage]}
                    onChange={(e) =>
                      setHeroContent({
                        ...heroContent,
                        title: {
                          ...heroContent.title,
                          [currentLanguage]: e.target.value
                        }
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                    dir={currentLanguage === "ar" ? "rtl" : "ltr"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description ({currentLanguage === "fr" ? "Français" : "العربية"}) *
                  </label>
                  <textarea
                    value={heroContent.description[currentLanguage]}
                    onChange={(e) =>
                      setHeroContent({
                        ...heroContent,
                        description: {
                          ...heroContent.description,
                          [currentLanguage]: e.target.value
                        }
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                    dir={currentLanguage === "ar" ? "rtl" : "ltr"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Texte du bouton ({currentLanguage === "fr" ? "Français" : "العربية"}) *
                  </label>
                  <input
                    type="text"
                    value={heroContent.button[currentLanguage]}
                    onChange={(e) =>
                      setHeroContent({
                        ...heroContent,
                        button: {
                          ...heroContent.button,
                          [currentLanguage]: e.target.value
                        }
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                    dir={currentLanguage === "ar" ? "rtl" : "ltr"}
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Images *
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleHeroFilesChange}
                      className="hidden"
                      disabled={uploadingHeroImages}
                    />
                    <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Cliquez pour télécharger des images
                      </span>
                    </div>
                  </label>

                  {/* Existing Images */}
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {heroContent.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                          <Image
                            src={img}
                            alt={`Hero ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExistingHeroImage(index)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* New Uploads */}
                    {heroImagePreviews.map((preview, index) => (
                      <div key={`preview-${index}`} className="relative group">
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                          <Image
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeHeroImage(index)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Catégories Page d&apos;Accueil</h2>
                <button
                  onClick={() => {
                    setShowCategoryForm(true)
                    setEditingCategoryId(null)
                    setCategoryFormData({
                      name: { fr: "", ar: "" },
                      image: "",
                      productCount: 0,
                      url: "/shop",
                      order: homepageCategories.length,
                      isActive: true
                    })
                    setSelectedCategoryId("")
                    setCategoryImageFile(null)
                    setCategoryImagePreview("")
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  <Plus className="w-5 h-5" />
                  Ajouter
                </button>
              </div>

              {/* Categories List */}
              <div className="space-y-2">
                {homepageCategories
                  .sort((a, b) => a.order - b.order)
                  .map((cat) => (
                    <div
                      key={cat._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={cat.image}
                            alt={cat.name.fr}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{cat.name.fr}</div>
                          <div className="text-sm text-gray-500">{cat.name.ar}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingCategoryId(cat._id)
                            setCategoryFormData({
                              name: cat.name,
                              image: cat.image,
                              productCount: cat.productCount,
                              url: cat.url,
                              order: cat.order,
                              isActive: cat.isActive
                            })
                            setCategoryImagePreview(cat.image)
                            setShowCategoryForm(true)
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCategory(cat._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Category Form Modal */}
              {showCategoryForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        {editingCategoryId ? "Modifier" : "Nouvelle"} catégorie
                      </h3>
                      <button
                        onClick={() => {
                          setShowCategoryForm(false)
                          setEditingCategoryId(null)
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      {!editingCategoryId && (
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Sélectionner une catégorie existante
                          </label>
                          <input
                            type="text"
                            placeholder="Rechercher..."
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg mb-2"
                          />
                          <select
                            value={selectedCategoryId}
                            onChange={(e) => handleCategorySelect(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                          >
                            <option value="">-- Sélectionner --</option>
                            {filteredCategories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name.fr} / {cat.name.ar}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                        <button
                          type="button"
                          onClick={() => setCurrentLanguage("fr")}
                          className={`px-4 py-2 rounded-md font-medium ${
                            currentLanguage === "fr"
                              ? "bg-white text-orange-600 shadow-sm"
                              : "text-gray-600"
                          }`}
                        >
                          Français
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentLanguage("ar")}
                          className={`px-4 py-2 rounded-md font-medium ${
                            currentLanguage === "ar"
                              ? "bg-white text-orange-600 shadow-sm"
                              : "text-gray-600"
                          }`}
                        >
                          العربية
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nom ({currentLanguage === "fr" ? "Français" : "العربية"}) *
                        </label>
                        <input
                          type="text"
                          value={categoryFormData.name[currentLanguage]}
                          onChange={(e) =>
                            setCategoryFormData({
                              ...categoryFormData,
                              name: {
                                ...categoryFormData.name,
                                [currentLanguage]: e.target.value
                              }
                            })
                          }
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                          dir={currentLanguage === "ar" ? "rtl" : "ltr"}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Image *
                        </label>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCategoryImageUpload}
                            className="hidden"
                          />
                          <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500">
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Télécharger une image
                            </span>
                          </div>
                        </label>
                        {categoryImagePreview && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 mt-4">
                            <Image
                              src={categoryImagePreview}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setCategoryImageFile(null)
                                setCategoryImagePreview("")
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nombre de produits *
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={categoryFormData.productCount}
                          onChange={(e) =>
                            setCategoryFormData({
                              ...categoryFormData,
                              productCount: parseInt(e.target.value) || 0
                            })
                          }
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          URL de destination *
                        </label>
                        <input
                          type="text"
                          value={categoryFormData.url}
                          onChange={(e) =>
                            setCategoryFormData({
                              ...categoryFormData,
                              url: e.target.value
                            })
                          }
                          placeholder="/shop"
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>

                      <div className="flex justify-end gap-4 pt-4 border-t">
                        <button
                          type="button"
                          onClick={() => {
                            setShowCategoryForm(false)
                            setEditingCategoryId(null)
                          }}
                          className="px-6 py-2 border-2 border-gray-300 rounded-lg font-medium"
                        >
                          Annuler
                        </button>
                        <button
                          type="button"
                          onClick={saveCategory}
                          disabled={saving}
                          className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50"
                        >
                          {saving ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Enregistrement...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Enregistrer
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FEATURED PRODUCTS TAB */}
          {activeTab === "featured-products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Produits en Vedette</h2>
                <button
                  onClick={saveFeaturedProducts}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </>
                  )}
                </button>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                Sélectionnez jusqu&apos;à 10 produits à afficher sur la page d&apos;accueil.
                Actuellement : {featuredProductIds.length} / 10
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                />
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
                {filteredProducts.map((product) => {
                  const isSelected = featuredProductIds.includes(product._id)
                  return (
                    <div
                      key={product._id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleFeaturedProduct(product._id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images[0] || "/No_Image_Available.jpg"}
                            alt={product.name.fr}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {product.name.fr}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {product.name.ar}
                          </div>
                          <div className="text-sm font-bold text-orange-600 mt-1">
                            {product.price} MAD
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-orange-500 bg-orange-500"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Selected Products */}
              {featuredProductIds.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-4">
                    Produits sélectionnés ({featuredProductIds.length})
                  </h3>
                  <div className="space-y-2">
                    {featuredProductIds.map((productId, index) => {
                      const product = allProducts.find((p) => p._id === productId)
                      if (!product) return null
                      return (
                        <div
                          key={productId}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500 w-8">
                              #{index + 1}
                            </span>
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <Image
                                src={product.images[0] || "/No_Image_Available.jpg"}
                                alt={product.name.fr}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{product.name.fr}</div>
                              <div className="text-xs text-gray-500">{product.price} MAD</div>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleFeaturedProduct(productId)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROMO BANNER TAB */}
          {activeTab === "promo-banner" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Bannière Publicitaire</h2>
                <button
                  onClick={savePromoBanner}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </>
                  )}
                </button>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                Ajoutez une bannière publicitaire qui sera affichée sur la page d&apos;accueil.
                Les clients pourront cliquer dessus pour être redirigés vers un produit, un pack ou une page personnalisée.
              </div>

              {/* Banner Preview */}
              {bannerImagePreview && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <label className="block text-sm font-medium mb-2">Aperçu de la bannière</label>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                    <Image
                      src={bannerImagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Image de la bannière *
                </label>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerImageUpload}
                    className="hidden"
                    disabled={saving}
                  />
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-colors">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Cliquez pour télécharger une image
                    </span>
                  </div>
                </label>
                {bannerImagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setBannerImageFile(null)
                      setBannerImagePreview("")
                      setPromoBanner((prev) => ({ ...prev, image: "" }))
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Supprimer l&apos;image
                  </button>
                )}
              </div>

              {/* Link Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Type de lien *
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleBannerLinkTypeChange("custom")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      bannerLinkType === "custom"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Lien personnalisé
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBannerLinkTypeChange("product")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      bannerLinkType === "product"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Produit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBannerLinkTypeChange("pack")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      bannerLinkType === "pack"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Pack
                  </button>
                </div>
              </div>

              {/* Link Input/Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {bannerLinkType === "custom"
                    ? "Lien de destination *"
                    : bannerLinkType === "product"
                      ? "Sélectionner un produit *"
                      : "Sélectionner un pack *"}
                </label>

                {bannerLinkType === "custom" ? (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={promoBanner.link}
                      onChange={(e) =>
                        setPromoBanner((prev) => ({ ...prev, link: e.target.value }))
                      }
                      placeholder="/shop, /packs, /contact, etc."
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder={`Rechercher un ${bannerLinkType === "product" ? "produit" : "pack"}...`}
                        value={bannerLinkSearch}
                        onChange={(e) => setBannerLinkSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto border-2 border-gray-200 rounded-lg">
                      {(bannerLinkType === "product" ? allProducts : allPacks)
                        .filter((item) => {
                          const searchLower = bannerLinkSearch.toLowerCase()
                          const name = item.name?.fr || item.name || ""
                          return name.toLowerCase().includes(searchLower)
                        })
                        .map((item) => {
                          const isSelected = promoBanner.linkId === item._id
                          return (
                            <div
                              key={item._id}
                              onClick={() => handleBannerLinkSelect(item._id)}
                              className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                                isSelected ? "bg-orange-50 border-orange-200" : ""
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={
                                      (item.images && item.images[0]) ||
                                      "/No_Image_Available.jpg"
                                    }
                                    alt={item.name?.fr || item.name || ""}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm truncate">
                                    {item.name?.fr || item.name || ""}
                                  </div>
                                  {item.price && (
                                    <div className="text-xs text-gray-500">
                                      {item.price} MAD
                                    </div>
                                  )}
                                </div>
                                {isSelected && (
                                  <div className="w-5 h-5 rounded-full bg-orange-600 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                    {promoBanner.linkId && (
                      <div className="text-sm text-green-600 mt-2">
                        ✓ Lien sélectionné : {promoBanner.link}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={promoBanner.isActive}
                    onChange={(e) =>
                      setPromoBanner((prev) => ({ ...prev, isActive: e.target.checked }))
                    }
                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Bannière active (affichée sur la page d&apos;accueil)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* SITE INFO TAB */}
          {activeTab === "site-info" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Informations du Site</h2>
                <button
                  onClick={saveSiteInfo}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-6">
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Mail className="w-5 h-5 text-orange-600" />
                    Email de contact
                  </label>
                  <input
                    type="email"
                    value={siteInfo.email}
                    onChange={(e) =>
                      setSiteInfo({ ...siteInfo, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                    placeholder="contact@example.com"
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Phone className="w-5 h-5 text-orange-600" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={siteInfo.phone}
                    onChange={(e) =>
                      setSiteInfo({ ...siteInfo, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    Adresse (Localisation)
                  </label>
                  <div className="space-y-4">
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                      <button
                        type="button"
                        onClick={() => setCurrentLanguage("fr")}
                        className={`px-4 py-2 rounded-md font-medium ${
                          currentLanguage === "fr"
                            ? "bg-white text-orange-600 shadow-sm"
                            : "text-gray-600"
                        }`}
                      >
                        Français
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentLanguage("ar")}
                        className={`px-4 py-2 rounded-md font-medium ${
                          currentLanguage === "ar"
                            ? "bg-white text-orange-600 shadow-sm"
                            : "text-gray-600"
                        }`}
                      >
                        العربية
                      </button>
                    </div>
                    <textarea
                      value={siteInfo.location[currentLanguage]}
                      onChange={(e) =>
                        setSiteInfo({
                          ...siteInfo,
                          location: {
                            ...siteInfo.location,
                            [currentLanguage]: e.target.value
                          }
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                      placeholder={
                        currentLanguage === "fr"
                          ? "Adresse complète..."
                          : "العنوان الكامل..."
                      }
                      dir={currentLanguage === "ar" ? "rtl" : "ltr"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

