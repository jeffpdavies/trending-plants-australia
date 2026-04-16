import * as React from "react"
import { useState, useMemo } from "react"
import Layout from "../components/Layout"
import gallery, { categories } from "../data/gallery"

const FB_GROUP = "https://www.facebook.com/groups/470256795925800"

const filterOptions = ["All", ...categories]

const categoryColourMap = {
  Philodendron: "bg-green-100 text-green-700 border-green-200",
  Monstera: "bg-teal-100 text-teal-700 border-teal-200",
  Anthurium: "bg-pink-100 text-pink-700 border-pink-200",
  Syngonium: "bg-orange-100 text-orange-700 border-orange-200",
  Epipremnum: "bg-lime-100 text-lime-700 border-lime-200",
  Alocasia: "bg-purple-100 text-purple-700 border-purple-200",
}

const filterButtonStyles = {
  All: "bg-green-700 text-white",
  Philodendron: "bg-green-600 text-white",
  Monstera: "bg-teal-600 text-white",
  Anthurium: "bg-pink-600 text-white",
  Syngonium: "bg-orange-500 text-white",
  Epipremnum: "bg-lime-600 text-white",
  Alocasia: "bg-purple-600 text-white",
}

const inactiveStyle = "bg-gray-100 text-gray-600 hover:bg-gray-200"

const PlantTile = ({ plant, onOpen }) => (
  <button
    onClick={() => onOpen(plant)}
    className="group text-left rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
  >
    {/* Image / Placeholder */}
    <div
      className="w-full aspect-square flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: plant.placeholderColour }}
    >
      {plant.hasImage && plant.imageUrl ? (
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="text-center p-3">
          <div className="text-4xl mb-1">🌿</div>
          <p className="text-xs font-medium text-gray-600 opacity-70">Add photo</p>
        </div>
      )}
      {/* Category badge */}
      <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full border ${categoryColourMap[plant.category]}`}>
        {plant.category}
      </span>
    </div>

    {/* Name */}
    <div className="p-3">
      <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">
        {plant.name}
      </p>
    </div>
  </button>
)

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All")
  const [lightbox, setLightbox] = useState(null)

  const filtered = useMemo(
    () => activeFilter === "All" ? gallery : gallery.filter(p => p.category === activeFilter),
    [activeFilter]
  )

  const grouped = useMemo(
    () => categories.map(cat => ({ category: cat, plants: gallery.filter(p => p.category === cat) })),
    []
  )

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Plant Gallery
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Browse our community's favourite indoor plants. Filter by genus to find exactly what you're looking for.
        </p>
        <p className="text-green-600 font-medium mt-3">{gallery.length} plants in the collection</p>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-10 px-4 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500 font-medium mr-1">Filter:</span>
            {filterOptions.map(option => (
              <button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === option ? filterButtonStyles[option] : inactiveStyle
                }`}
              >
                {option}
                {option !== "All" && (
                  <span className="ml-1.5 opacity-75 text-xs">
                    ({gallery.filter(p => p.category === option).length})
                  </span>
                )}
              </button>
            ))}
            <span className="ml-auto text-gray-400 text-sm">
              Showing {filtered.length} plant{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {activeFilter === "All" ? (
            // Grouped by category
            <div className="space-y-12">
              {grouped.map(({ category, plants }) => (
                <div key={category}>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColourMap[category]}`}>
                      {plants.length} plants
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {plants.map(plant => (
                      <PlantTile key={plant.id} plant={plant} onOpen={setLightbox} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Flat filtered view
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map(plant => (
                <PlantTile key={plant.id} plant={plant} onOpen={setLightbox} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Image area */}
            <div
              className="w-full aspect-square flex items-center justify-center"
              style={{ backgroundColor: lightbox.placeholderColour }}
            >
              {lightbox.hasImage && lightbox.imageUrl ? (
                <img
                  src={lightbox.imageUrl}
                  alt={lightbox.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="text-8xl mb-3">🌿</div>
                  <p className="text-gray-500 text-sm">No photo yet</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColourMap[lightbox.category]}`}>
                {lightbox.category}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-3 mb-2">{lightbox.name}</h2>
              <p className="text-gray-500 text-sm mb-5">
                Looking for {lightbox.name}? Ask in our community — members buy and sell plants like this every day.
              </p>
              <div className="flex gap-3">
                <a
                  href={FB_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl text-sm text-center transition-colors no-underline"
                >
                  Find in Community
                </a>
                <button
                  onClick={() => setLightbox(null)}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Photos CTA */}
      <section className="bg-green-700 py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Share Your Plants</h2>
        <p className="text-green-200 mb-6 max-w-xl mx-auto">
          Post your plant photos in the group and we'll feature the best ones in our gallery.
        </p>
        <a
          href={FB_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors no-underline"
        >
          Share in the Group →
        </a>
      </section>
    </Layout>
  )
}

export default GalleryPage

export const Head = () => (
  <>
    <title>Plant Gallery | Trending Plants Australia</title>
    <meta name="description" content="Browse 100+ indoor plants by genus — Philodendron, Monstera, Anthurium, Syngonium, Epipremnum and Alocasia. Trending Plants Australia community gallery." />
  </>
)
