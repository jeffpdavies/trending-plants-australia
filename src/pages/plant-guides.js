import * as React from "react"
import { useState } from "react"
import Layout from "../components/Layout"
import PlantCard from "../components/PlantCard"
import plants from "../data/plants"

const difficulties = ["All", "Easy", "Medium", "Hard"]

const PlantGuidesPage = () => {
  const [filter, setFilter] = useState("All")

  const filtered = filter === "All" ? plants : plants.filter(p => p.difficulty === filter)

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Indoor Plant Care Guides
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Care guides written for Australian conditions — climate notes, watering tips, and everything you need to help your plants thrive.
        </p>
      </section>

      {/* Filter */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-10 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center space-x-3">
          <span className="text-sm text-gray-500 font-medium">Filter by difficulty:</span>
          <div className="flex space-x-2">
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === d
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <span className="text-gray-400 text-sm ml-auto">{filtered.length} plant{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </section>

      {/* Plant Grid */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 py-12 px-4 text-center">
        <p className="text-green-100 text-lg mb-4">
          Have a question about your plant? Ask our community!
        </p>
        <a
          href="https://www.facebook.com/groups/470256795925800"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors no-underline"
        >
          Ask in the Group →
        </a>
      </section>
    </Layout>
  )
}

export default PlantGuidesPage

export const Head = () => (
  <>
    <title>Plant Care Guides | Trending Plants Australia</title>
    <meta name="description" content="Care guides for Australia's most popular indoor plants. Light, water, humidity and Australian climate tips for Monstera, Pothos, Peace Lily and more." />
  </>
)
