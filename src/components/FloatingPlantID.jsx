import * as React from "react"
import { useState, useRef, useEffect } from "react"

const FloatingPlantID = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [imageDataUrl, setImageDataUrl] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  // Allow external buttons (e.g. PlantFinderSection) to open the modal
  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener("open-plant-id", handler)
    return () => window.removeEventListener("open-plant-id", handler)
  }, [])

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageDataUrl(reader.result)
      setResult(null)
      setError(null)
    }
    reader.readAsDataURL(file)
  }

  const handleIdentify = async () => {
    if (!imageDataUrl) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/identify-plant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl }),
      })
      let data
      try {
        data = await response.json()
      } catch {
        throw new Error("Server returned an unexpected response. Please try again.")
      }
      if (!response.ok) throw new Error(data.error || "Identification failed")
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setImageDataUrl(null)
    setResult(null)
    setError(null)
  }

  const handleClose = () => {
    setIsOpen(false)
    handleReset()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-700 hover:bg-green-800 text-white rounded-full w-16 h-16 shadow-xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Identify a plant"
        title="Identify a Plant"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="absolute -top-1 -right-1 text-base leading-none">🌿</span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl shadow-2xl w-full max-w-md">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🌿</span>
                <h2 className="text-lg font-bold text-gray-900">Identify a Plant</h2>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {!imageDataUrl ? (
                /* ── Upload State ── */
                <div>
                  {/* Drag & drop zone */}
                  <div
                    className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <svg className="w-10 h-10 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-700 font-medium mb-1">Drop a photo here or click to upload</p>
                    <p className="text-gray-400 text-sm">JPG, PNG, WEBP supported</p>
                  </div>

                  <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-gray-200" />
                    <span className="px-3 text-gray-400 text-sm">or</span>
                    <div className="flex-1 border-t border-gray-200" />
                  </div>

                  {/* Camera button */}
                  <button
                    onClick={() => cameraInputRef.current.click()}
                    className="w-full flex items-center justify-center space-x-2 border-2 border-green-700 text-green-700 rounded-full py-3 font-semibold hover:bg-green-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Take a Photo</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files[0])}
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files[0])}
                  />
                </div>
              ) : (
                /* ── Preview + Result State ── */
                <div>
                  {/* Image preview */}
                  <div className="relative mb-4">
                    <img
                      src={imageDataUrl}
                      alt="Plant to identify"
                      className="w-full h-52 object-cover rounded-xl"
                    />
                    {!loading && (
                      <button
                        onClick={handleReset}
                        className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Remove image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Identify button */}
                  {!result && !loading && (
                    <button
                      onClick={handleIdentify}
                      className="w-full bg-green-700 hover:bg-green-800 text-white rounded-full py-3 font-semibold transition-colors"
                    >
                      Identify Plant
                    </button>
                  )}

                  {/* Loading */}
                  {loading && (
                    <div className="text-center py-4">
                      <div className="inline-block w-8 h-8 border-4 border-green-100 border-t-green-700 rounded-full animate-spin mb-3" />
                      <p className="text-gray-500 text-sm">Identifying your plant...</p>
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm mt-2">
                      {error}
                    </div>
                  )}

                  {/* Result */}
                  {result && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-green-900 text-lg leading-tight">{result.commonName}</h3>
                        <span className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${
                          result.confidence === "High"
                            ? "bg-green-100 text-green-700"
                            : result.confidence === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-600"
                        }`}>
                          {result.confidence} confidence
                        </span>
                      </div>
                      {result.scientificName && (
                        <p className="text-green-700 text-sm italic mb-3">{result.scientificName}</p>
                      )}
                      {result.careTips && result.careTips.length > 0 && (
                        <div className="mb-3">
                          <p className="text-green-900 text-xs font-semibold uppercase tracking-wide mb-1.5">Care Tips</p>
                          <ul className="space-y-1">
                            {result.careTips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-green-800 text-sm">
                                <span className="mt-0.5 shrink-0">🌱</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <button
                        onClick={handleReset}
                        className="mt-2 w-full border-2 border-green-700 text-green-700 rounded-full py-2 text-sm font-semibold hover:bg-green-100 transition-colors"
                      >
                        Identify Another Plant
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingPlantID
