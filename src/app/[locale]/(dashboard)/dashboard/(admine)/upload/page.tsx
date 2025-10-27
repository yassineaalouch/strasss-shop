"use client"
import { useState } from "react"
import axios from "axios"
import Image from "next/image"

export default function ImageUploader() {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [urls, setUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // Ajouter de nouvelles images
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...newFiles])
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  // Supprimer une image avant upload
  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  // Envoyer les images vers S3
  const handleUpload = async () => {
    if (files.length === 0) return
    setLoading(true)

    const formData = new FormData()
    files.forEach((file) => formData.append("files", file))

    try {
      const response = await axios.post("/api/upload", formData)
      setUrls(response.data.urls)
      setFiles([])
      setPreviews([])
    } catch (err) {
      console.error("Erreur upload:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFilesChange}
        className="mb-4"
      />

      {/* Prévisualisation */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {previews.map((src, index) => (
          <div key={index} className="relative">
            <Image
              src={src}
              alt={`preview-${index}`}
              width={800}
              height={800}
              className="w-full h-48 object-contain border rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        disabled={loading || files.length === 0}
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Envoyer les images"}
      </button>

      {/* Images uploadées */}
      {urls.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          {urls.map((url) => (
            <Image
              key={url}
              src={url}
              width={800}
              height={800}
              alt="uploaded"
              className="w-full h-48 object-contain rounded-lg border"
            />
          ))}
        </div>
      )}
    </div>
  )
}
