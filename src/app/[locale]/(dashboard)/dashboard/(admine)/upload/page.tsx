"use client"
import { useState } from "react"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    setImageUrl(data.url)
  }

  const handleDelete = async () => {
    if (!imageUrl) return

    const fileName = imageUrl.split("/").pop()

    await fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({ fileName }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    setImageUrl("")
  }

  return (
    <div className="p-6">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload
      </button>

      {imageUrl && (
        <div className="mt-4">
          {/* <img src={imageUrl} alt="Uploaded" width={300} /> */}
          <button
            onClick={handleDelete}
            className="px-4 py-2 mt-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
