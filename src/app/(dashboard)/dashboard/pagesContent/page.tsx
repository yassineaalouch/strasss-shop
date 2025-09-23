"use client"

import React, { useState } from "react"
import {
  Save,
  Trash2,
  Plus,
  Eye,
  Globe,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Github,
  ArrowUp,
  ArrowDown,
  Edit,
  Image as ImageIcon,
  Type,
  MousePointer
} from "lucide-react"
import Image from "next/image"

// Types
interface HeroContent {
  title: {
    ar: string
    fr: string
  }
  description: {
    ar: string
    fr: string
  }
  button: {
    ar: string
    fr: string
  }
  images: string[]
}

interface SocialMediaLink {
  id: string
  url: string
  icon: string
  className: string
  name: string
  isActive: boolean
  order: number
}

const HeroContentAdmin: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<"fr" | "ar">("fr")
  const [activeTab, setActiveTab] = useState<"content" | "images" | "social">(
    "content"
  )

  // État du contenu Hero
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: {
      ar: "اكتشف إكسسوارات الخياطة عالية الجودة لدينا",
      fr: "Découvrez nos accessoires de couture de qualité"
    },
    description: {
      ar: "خيوط، إبر، مقصات وكل ما تحتاجه لمشاريع الخياطة. توصيل سريع وموثوق.",
      fr: "Fils, aiguilles, ciseaux et tout le nécessaire pour vos projets de couture. Livraison rapide et fiable."
    },
    button: {
      ar: "شاهد منتجاتنا",
      fr: "Voir nos produits"
    },
    images: [
      "https://static.mapetitemercerie.com/56855-large_default/mannequin-de-couture-prymadonna-multi-taille-s.jpg",
      "https://static.mapetitemercerie.com/200778-large_default/fil-macaroni-coton-recycle-cachou-100m.jpg",
      "https://static.mapetitemercerie.com/191023-large_default/aiguille-circulaire-bois-d-erable-80-cm-n15.jpg",
      "https://static.mapetitemercerie.com/242692-large_default/boutons-pressions-15-mm-outillage-couture-loisirs.jpg"
    ]
  })

  // État des réseaux sociaux
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([
    {
      id: "1",
      url: "https://facebook.com/strassshop",
      icon: "Facebook",
      className: "text-blue-600 hover:text-blue-800",
      name: "Facebook",
      isActive: true,
      order: 1
    },
    {
      id: "2",
      url: "https://twitter.com/strassshop",
      icon: "Twitter",
      className: "text-black hover:text-gray-700",
      name: "Twitter",
      isActive: true,
      order: 2
    },
    {
      id: "3",
      url: "https://instagram.com/strassshop",
      icon: "Instagram",
      className: "text-pink-500 hover:text-pink-700",
      name: "Instagram",
      isActive: true,
      order: 3
    },
    {
      id: "4",
      url: "https://youtube.com/strassshop",
      icon: "Youtube",
      className: "text-red-600 hover:text-red-800",
      name: "YouTube",
      isActive: true,
      order: 4
    },
    {
      id: "5",
      url: "https://linkedin.com/company/strassshop",
      icon: "Linkedin",
      className: "text-blue-700 hover:text-blue-900",
      name: "LinkedIn",
      isActive: false,
      order: 5
    }
  ])

  // Icônes disponibles
  const availableIcons = {
    Facebook: <Facebook className="w-5 h-5" />,
    Twitter: <Twitter className="w-5 h-5" />,
    Instagram: <Instagram className="w-5 h-5" />,
    Youtube: <Youtube className="w-5 h-5" />,
    Linkedin: <Linkedin className="w-5 h-5" />,
    Github: <Github className="w-5 h-5" />,
    ExternalLink: <ExternalLink className="w-5 h-5" />
  }

  // Handlers pour le contenu
  const updateHeroField = (
    field: keyof HeroContent,
    language: "fr" | "ar",
    value: string
  ) => {
    setHeroContent((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [language]: value
      }
    }))
  }

  const addImage = () => {
    const url = prompt("Entrez l'URL de l'image :")
    if (url) {
      setHeroContent((prev) => ({
        ...prev,
        images: [...prev.images, url]
      }))
    }
  }

  const removeImage = (index: number) => {
    setHeroContent((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const moveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...heroContent.images]
    if (direction === "up" && index > 0) {
      ;[newImages[index], newImages[index - 1]] = [
        newImages[index - 1],
        newImages[index]
      ]
    } else if (direction === "down" && index < newImages.length - 1) {
      ;[newImages[index], newImages[index + 1]] = [
        newImages[index + 1],
        newImages[index]
      ]
    }
    setHeroContent((prev) => ({ ...prev, images: newImages }))
  }

  // Handlers pour les réseaux sociaux
  const addSocialLink = () => {
    const newLink: SocialMediaLink = {
      id: Date.now().toString(),
      url: "",
      icon: "Facebook",
      className: "text-blue-600 hover:text-blue-800",
      name: "Nouveau réseau",
      isActive: false,
      order: socialLinks.length + 1
    }
    setSocialLinks((prev) => [...prev, newLink])
  }

  const updateSocialLink = (
    id: string,
    field: keyof SocialMediaLink,
    value: string | boolean | number
  ) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    )
  }

  const removeSocialLink = (id: string) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id))
  }

  const moveSocialLink = (id: string, direction: "up" | "down") => {
    const currentIndex = socialLinks.findIndex((link) => link.id === id)
    if (currentIndex === -1) return

    const newLinks = [...socialLinks]
    if (direction === "up" && currentIndex > 0) {
      ;[newLinks[currentIndex], newLinks[currentIndex - 1]] = [
        newLinks[currentIndex - 1],
        newLinks[currentIndex]
      ]
    } else if (direction === "down" && currentIndex < newLinks.length - 1) {
      ;[newLinks[currentIndex], newLinks[currentIndex + 1]] = [
        newLinks[currentIndex + 1],
        newLinks[currentIndex]
      ]
    }
    setSocialLinks(newLinks)
  }

  const handleSave = () => {
    // Ici vous enverriez les données à votre API
    console.log("Contenu Hero:", heroContent)
    console.log("Réseaux sociaux:", socialLinks)
    alert("Contenu sauvegardé avec succès !")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <Edit className="mr-3" size={32} />
                Gestion du Contenu Hero Section
              </h1>
              <p className="text-gray-600 mt-2">
                Modifiez le contenu principal, les images et les réseaux sociaux
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-lg border">
                <button
                  onClick={() => setCurrentLanguage("fr")}
                  className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                    currentLanguage === "fr"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setCurrentLanguage("ar")}
                  className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                    currentLanguage === "ar"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  AR
                </button>
              </div>

              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Save className="mr-2" size={20} />
                Sauvegarder
              </button>
            </div>
          </div>
        </div>

        {/* Navigation onglets */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              {
                id: "content",
                label: "Contenu Texte",
                icon: <Type className="w-4 h-4" />
              },
              {
                id: "images",
                label: "Images",
                icon: <ImageIcon className="w-4 h-4" />
              },
              {
                id: "social",
                label: "Réseaux Sociaux",
                icon: <Globe className="w-4 h-4" />
              }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panneau d'édition */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {activeTab === "content" && "Édition du Contenu"}
              {activeTab === "images" && "Gestion des Images"}
              {activeTab === "social" && "Réseaux Sociaux"}
            </h2>

            {/* Onglet Contenu */}
            {activeTab === "content" && (
              <div className="space-y-6">
                {/* Titre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Titre de la section
                  </label>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Français
                      </label>
                      <input
                        type="text"
                        value={heroContent.title.fr}
                        onChange={(e) =>
                          updateHeroField("title", "fr", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Titre en français"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        العربية
                      </label>
                      <input
                        type="text"
                        value={heroContent.title.ar}
                        onChange={(e) =>
                          updateHeroField("title", "ar", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="العنوان بالعربية"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Description
                  </label>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Français
                      </label>
                      <textarea
                        value={heroContent.description.fr}
                        onChange={(e) =>
                          updateHeroField("description", "fr", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description en français"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        العربية
                      </label>
                      <textarea
                        value={heroContent.description.ar}
                        onChange={(e) =>
                          updateHeroField("description", "ar", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="الوصف بالعربية"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>

                {/* Bouton */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Texte du bouton
                  </label>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Français
                      </label>
                      <input
                        type="text"
                        value={heroContent.button.fr}
                        onChange={(e) =>
                          updateHeroField("button", "fr", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Texte du bouton en français"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        العربية
                      </label>
                      <input
                        type="text"
                        value={heroContent.button.ar}
                        onChange={(e) =>
                          updateHeroField("button", "ar", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="نص الزر بالعربية"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Images */}
            {activeTab === "images" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    Images Hero ({heroContent.images.length})
                  </h3>
                  <button
                    onClick={addImage}
                    className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Plus className="mr-2" size={16} />
                    Ajouter
                  </button>
                </div>

                <div className="space-y-4">
                  {heroContent.images.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={image}
                          width={150}
                          height={150}
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => {
                            const newImages = [...heroContent.images]
                            newImages[index] = e.target.value
                            setHeroContent((prev) => ({
                              ...prev,
                              images: newImages
                            }))
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          placeholder="URL de l'image"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => moveImage(index, "up")}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          onClick={() => moveImage(index, "down")}
                          disabled={index === heroContent.images.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          <ArrowDown size={16} />
                        </button>
                        <button
                          onClick={() => removeImage(index)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Onglet Réseaux Sociaux */}
            {activeTab === "social" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    Liens Réseaux Sociaux
                  </h3>
                  <button
                    onClick={addSocialLink}
                    className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Plus className="mr-2" size={16} />
                    Ajouter
                  </button>
                </div>

                <div className="space-y-4">
                  {socialLinks.map((link) => (
                    <div
                      key={link.id}
                      className="p-4 border border-gray-200 rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={link.className}>
                            {
                              availableIcons[
                                link.icon as keyof typeof availableIcons
                              ]
                            }
                          </div>
                          <span className="font-medium">{link.name}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateSocialLink(
                                link.id,
                                "isActive",
                                !link.isActive
                              )
                            }
                            className={`px-3 py-1 text-xs rounded-full ${
                              link.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {link.isActive ? "Actif" : "Inactif"}
                          </button>

                          <button
                            onClick={() => moveSocialLink(link.id, "up")}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <ArrowUp size={16} />
                          </button>
                          <button
                            onClick={() => moveSocialLink(link.id, "down")}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <ArrowDown size={16} />
                          </button>
                          <button
                            onClick={() => removeSocialLink(link.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Nom
                          </label>
                          <input
                            type="text"
                            value={link.name}
                            onChange={(e) =>
                              updateSocialLink(link.id, "name", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Icône
                          </label>
                          <select
                            value={link.icon}
                            onChange={(e) =>
                              updateSocialLink(link.id, "icon", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            {Object.keys(availableIcons).map((iconName) => (
                              <option key={iconName} value={iconName}>
                                {iconName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          URL
                        </label>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) =>
                            updateSocialLink(link.id, "url", e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Panneau d'aperçu */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Eye className="mr-2" size={20} />
              Aperçu ({currentLanguage.toUpperCase()})
            </h2>

            {/* Aperçu Hero Section */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="text-center space-y-4">
                <h1
                  className={`text-2xl md:text-3xl font-bold text-gray-800 ${
                    currentLanguage === "ar" ? "font-arabic" : ""
                  }`}
                  dir={currentLanguage === "ar" ? "rtl" : "ltr"}
                >
                  {heroContent.title[currentLanguage]}
                </h1>

                <p
                  className={`text-gray-600 ${
                    currentLanguage === "ar" ? "font-arabic" : ""
                  }`}
                  dir={currentLanguage === "ar" ? "rtl" : "ltr"}
                >
                  {heroContent.description[currentLanguage]}
                </p>

                <button className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <MousePointer className="mr-2" size={16} />
                  {heroContent.button[currentLanguage]}
                </button>
              </div>

              {/* Aperçu des images */}
              {activeTab === "images" && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Images Hero
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {heroContent.images.slice(0, 4).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image}
                          width={150}
                          height={150}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Aperçu des réseaux sociaux */}
              {activeTab === "social" && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Réseaux Sociaux
                  </h3>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {socialLinks
                      .filter((link) => link.isActive)
                      .map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-lg border transition-colors ${link.className}`}
                          title={link.name}
                        >
                          {
                            availableIcons[
                              link.icon as keyof typeof availableIcons
                            ]
                          }
                        </a>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroContentAdmin
