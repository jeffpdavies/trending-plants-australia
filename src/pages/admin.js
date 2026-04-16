import * as React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import Layout from "../components/Layout"
import { categories, plantNames, imageMap as existingImageMap } from "../data/gallery"

// ─── helpers ──────────────────────────────────────────────────────────────────

const toSlug = name =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

const suggestedFilename = upload => {
  if (!upload.selectedName) return "(select a plant first)"
  const parts = upload.file.name.split(".")
  const ext = parts.length > 1 ? parts.pop().toLowerCase() : "jpg"
  return `${toSlug(upload.selectedName)}.${ext}`
}

// Resize to max 1200px on longest edge and encode as base64 JPEG.
// Keeps payloads small (~150–350 KB per image) without needing a package.
const resizeAndEncode = objectUrl =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const MAX = 1200
      const ratio = Math.min(1, MAX / img.width, MAX / img.height)
      const canvas = document.createElement("canvas")
      canvas.width = Math.round(img.width * ratio)
      canvas.height = Math.round(img.height * ratio)
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        blob => {
          const reader = new FileReader()
          reader.onload = e => resolve(e.target.result.split(",")[1])
          reader.onerror = reject
          reader.readAsDataURL(blob)
        },
        "image/jpeg",
        0.85
      )
    }
    img.onerror = reject
    img.src = objectUrl
  })

let nextId = 1
const makeId = () => nextId++

// ─── AdminPage ─────────────────────────────────────────────────────────────────

const AdminPage = () => {
  const [uploads, setUploads] = useState([])
  const [uploadStatus, setUploadStatus] = useState("idle") // idle | uploading | done | error
  const [uploadError, setUploadError] = useState(null)
  const [skippedCount, setSkippedCount] = useState(0)
  const fileInputRef = useRef(null)

  // Reset upload status whenever the list changes
  useEffect(() => {
    setUploadStatus("idle")
    setUploadError(null)
  }, [uploads])

  // Revoke object URLs on cleanup
  useEffect(() => {
    return () => {
      uploads.forEach(u => URL.revokeObjectURL(u.objectUrl))
    }
  }, [uploads])

  // ── file ingestion ──────────────────────────────────────────────────────────

  const addFiles = useCallback(fileList => {
    const files = Array.from(fileList)
    const images = files.filter(f => f.type.startsWith("image/"))
    const skipped = files.length - images.length
    if (skipped > 0) setSkippedCount(s => s + skipped)

    const newEntries = images.map(file => ({
      id: makeId(),
      file,
      objectUrl: URL.createObjectURL(file),
      selectedCategory: "",
      selectedName: "",
    }))
    setUploads(prev => [...prev, ...newEntries])
  }, [])

  const handleDrop = e => {
    e.preventDefault()
    addFiles(e.dataTransfer.files)
  }

  const handleFileInput = e => {
    addFiles(e.target.files)
    e.target.value = ""
  }

  // ── per-row updates ─────────────────────────────────────────────────────────

  const updateCategory = (id, cat) => {
    setUploads(prev =>
      prev.map(u => u.id === id ? { ...u, selectedCategory: cat, selectedName: "" } : u)
    )
  }

  const updateName = (id, name) => {
    setUploads(prev =>
      prev.map(u => u.id === id ? { ...u, selectedName: name } : u)
    )
  }

  const removeUpload = upload => {
    URL.revokeObjectURL(upload.objectUrl)
    setUploads(prev => prev.filter(u => u.id !== upload.id))
  }

  const handleClear = () => {
    uploads.forEach(u => URL.revokeObjectURL(u.objectUrl))
    setUploads([])
    setUploadStatus("idle")
    setUploadError(null)
    setSkippedCount(0)
  }

  // ── upload ──────────────────────────────────────────────────────────────────

  const canUpload = uploads.length > 0 && uploads.every(u => u.selectedName)

  const handleUpload = async () => {
    setUploadStatus("uploading")
    setUploadError(null)
    try {
      const images = await Promise.all(
        uploads.map(async u => ({
          plantName: u.selectedName,
          fileName: suggestedFilename(u),
          fileData: await resizeAndEncode(u.objectUrl),
        }))
      )

      const res = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Server error ${res.status}`)

      setUploadStatus("done")
      // Clear the list so the user can start a new batch
      uploads.forEach(u => URL.revokeObjectURL(u.objectUrl))
      setUploads([])
    } catch (err) {
      setUploadStatus("error")
      setUploadError(err.message)
    }
  }

  // ── duplicate detection ─────────────────────────────────────────────────────

  const nameCounts = uploads.reduce((acc, u) => {
    if (u.selectedName) acc[u.selectedName] = (acc[u.selectedName] || 0) + 1
    return acc
  }, {})

  // ── render ──────────────────────────────────────────────────────────────────

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Image Upload Tool
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Assign photos to gallery plant entries and upload them directly — no manual steps.
        </p>
      </section>

      {/* Dev-tool disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center">
        <p className="text-amber-800 text-sm">
          <strong>Developer tool</strong> — uploading writes files directly to your local project.
          Run <code className="bg-amber-100 px-1 rounded">npm run develop</code> before using this page.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* Step 1 — drop zone */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">1. Select images</h2>
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-green-300 rounded-2xl p-12 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <div className="text-5xl mb-3">📁</div>
            <p className="text-gray-600 font-medium">Drag images here, or click to select</p>
            <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP accepted — multiple files OK</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileInput}
          />
          {skippedCount > 0 && (
            <p className="text-xs text-amber-600 mt-2">
              {skippedCount} file{skippedCount !== 1 ? "s were" : " was"} skipped (not an image).
            </p>
          )}
        </div>

        {/* Step 2 — assign plants */}
        {uploads.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">2. Assign each image to a plant</h2>
            <div className="space-y-3">
              {uploads.map(upload => {
                const isDuplicate = upload.selectedName && nameCounts[upload.selectedName] > 1
                const alreadyMapped = upload.selectedName && !!existingImageMap[upload.selectedName]

                return (
                  <div
                    key={upload.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    {/* Thumbnail */}
                    <img
                      src={upload.objectUrl}
                      alt={upload.file.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-100"
                    />

                    {/* Info + selects */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <p className="text-xs text-gray-500 truncate">{upload.file.name}</p>

                      <div className="flex flex-col sm:flex-row gap-2">
                        {/* Category dropdown */}
                        <select
                          value={upload.selectedCategory}
                          onChange={e => updateCategory(upload.id, e.target.value)}
                          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        >
                          <option value="">Select genus…</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>

                        {/* Plant dropdown */}
                        <select
                          value={upload.selectedName}
                          onChange={e => updateName(upload.id, e.target.value)}
                          disabled={!upload.selectedCategory}
                          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <option value="">Select plant…</option>
                          {upload.selectedCategory &&
                            plantNames[upload.selectedCategory].map(name => (
                              <option key={name} value={name}>{name}</option>
                            ))
                          }
                        </select>
                      </div>

                      {/* Suggested filename */}
                      <p className="text-xs text-gray-500">
                        Saves as:{" "}
                        <span className="font-mono text-gray-700">{suggestedFilename(upload)}</span>
                      </p>

                      {/* Warnings */}
                      {alreadyMapped && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                          Already has an image — will overwrite
                        </span>
                      )}
                      {isDuplicate && (
                        <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full ml-1">
                          Duplicate assignment
                        </span>
                      )}
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeUpload(upload)}
                      className="self-start sm:self-center text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                      aria-label="Remove"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3 — upload */}
        {uploads.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleUpload}
                disabled={!canUpload || uploadStatus === "uploading"}
                title={canUpload ? undefined : "Assign all plants before uploading"}
                className="bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                {uploadStatus === "uploading" ? "Uploading…" : "Upload to gallery"}
              </button>
              <button
                onClick={handleClear}
                disabled={uploadStatus === "uploading"}
                className="text-sm text-gray-500 hover:text-red-500 disabled:opacity-40 transition-colors"
              >
                Clear all
              </button>
              {!canUpload && uploadStatus === "idle" && (
                <p className="text-sm text-gray-400">Assign all plants first</p>
              )}
            </div>

            {/* Error */}
            {uploadStatus === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm font-medium">Upload failed: {uploadError}</p>
                <p className="text-red-500 text-xs mt-1">
                  Make sure you are running <code className="bg-red-100 px-1 rounded">npm run develop</code>.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Success */}
        {uploadStatus === "done" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-bold text-gray-900 text-lg">Gallery updated!</h3>
            <p className="text-gray-600 text-sm mt-1">
              Images saved and gallery.js updated. The gallery page will refresh automatically.
            </p>
            <p className="text-amber-700 text-xs mt-3 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 inline-block">
              Remember to commit <code className="font-mono">src/data/gallery.js</code> and{" "}
              <code className="font-mono">static/gallery/</code> before deploying.
            </p>
            <div className="mt-4">
              <button
                onClick={() => setUploadStatus("idle")}
                className="text-sm text-green-700 hover:text-green-900 font-semibold"
              >
                Upload more images →
              </button>
            </div>
          </div>
        )}

      </div>
    </Layout>
  )
}

export default AdminPage

export const Head = () => (
  <>
    <title>Admin — Image Upload Tool | Trending Plants Australia</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
)
