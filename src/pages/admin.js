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

let nextId = 1
const makeId = () => nextId++

// ─── AdminPage ─────────────────────────────────────────────────────────────────

const AdminPage = () => {
  const [uploads, setUploads] = useState([])
  const [outputGenerated, setOutputGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [skippedCount, setSkippedCount] = useState(0)
  const fileInputRef = useRef(null)

  // Reset output whenever the upload list changes
  useEffect(() => {
    setOutputGenerated(false)
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
    // reset so the same file can be re-selected if removed
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

  // ── output generation ───────────────────────────────────────────────────────

  const canGenerate = uploads.length > 0 && uploads.every(u => u.selectedName)

  const generatedCode = (() => {
    if (!outputGenerated) return ""
    const lines = uploads.map(u => `  "${u.selectedName}": "/gallery/${suggestedFilename(u)}",`)
    return `export const imageMap = {\n${lines.join("\n")}\n}`
  })()

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleClear = () => {
    uploads.forEach(u => URL.revokeObjectURL(u.objectUrl))
    setUploads([])
    setOutputGenerated(false)
    setSkippedCount(0)
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
          Assign photos to gallery plant entries and generate the code needed to publish them.
        </p>
      </section>

      {/* Dev-tool disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center">
        <p className="text-amber-800 text-sm">
          <strong>Developer tool</strong> — changes made here are not saved automatically.
          Follow the output instructions below to commit images to the repository.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* Drop zone */}
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

        {/* Upload rows */}
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
                        Filename:{" "}
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

        {/* Generate button */}
        {uploads.length > 0 && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOutputGenerated(true)}
              disabled={!canGenerate}
              title={canGenerate ? undefined : "Assign all plants before generating"}
              className="bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Generate output
            </button>
            <button
              onClick={handleClear}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear all
            </button>
            {!canGenerate && (
              <p className="text-sm text-gray-400">Assign all plants before generating</p>
            )}
          </div>
        )}

        {/* Output panel */}
        {outputGenerated && (
          <div className="space-y-8">
            <h2 className="text-lg font-bold text-gray-800">3. Follow these steps to publish</h2>

            {/* Step 1 — download images */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-gray-900">Step 1 — Download renamed images</h3>
              <div className="flex flex-wrap gap-3">
                {uploads.map(u => (
                  <a
                    key={u.id}
                    href={u.objectUrl}
                    download={suggestedFilename(u)}
                    className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors no-underline"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {suggestedFilename(u)}
                  </a>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Move these files into <code className="bg-gray-100 px-1 rounded">static/gallery/</code> in the project root
                (create the folder if it doesn't exist).
              </p>
            </div>

            {/* Step 2 — imageMap code */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Step 2 — Update <code className="bg-gray-100 px-1 rounded text-sm">src/data/gallery.js</code></h3>
                <button
                  onClick={handleCopy}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  {copied ? "Copied!" : "Copy to clipboard"}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Replace the <code className="bg-gray-100 px-1 rounded">imageMap</code> block at the top of the file with this:
              </p>
              <pre className="bg-gray-900 text-green-400 rounded-xl p-5 text-sm overflow-x-auto font-mono leading-relaxed">
                {generatedCode}
              </pre>
            </div>

            {/* Step 3 — verify & commit */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
              <h3 className="font-bold text-gray-900">Step 3 — Preview and commit</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Run <code className="bg-gray-100 px-1 rounded">npm run develop</code> and visit <code className="bg-gray-100 px-1 rounded">/gallery</code> to verify the images appear.</li>
                <li>Commit both <code className="bg-gray-100 px-1 rounded">src/data/gallery.js</code> and the files in <code className="bg-gray-100 px-1 rounded">static/gallery/</code>.</li>
                <li>Push and deploy — Netlify will pick up the changes automatically.</li>
              </ol>
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
