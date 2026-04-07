import * as React from "react"
import { useState } from "react"

const difficultyStyles = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
}

const PlantCard = ({ plant }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="bg-green-50 px-6 py-6 flex items-start justify-between">
        <div>
          <div className="text-4xl mb-2">{plant.emoji}</div>
          <h3 className="text-lg font-bold text-gray-900">{plant.commonName}</h3>
          <p className="text-sm text-gray-500 italic">{plant.name}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyStyles[plant.difficulty]}`}>
          {plant.difficulty}
        </span>
      </div>

      {/* Care Summary */}
      <div className="px-6 py-4 grid grid-cols-2 gap-3 border-b border-gray-50">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>☀️</span>
          <span>{plant.light}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>💧</span>
          <span>{plant.water}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>💨</span>
          <span>{plant.humidity}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>🌡️</span>
          <span>{plant.temperature}</span>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <p className="text-gray-600 text-sm leading-relaxed">{plant.description}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-green-700 font-semibold text-sm hover:text-green-900 transition-colors"
        >
          {expanded ? "Show less ↑" : "Show care tips ↓"}
        </button>

        {expanded && (
          <div className="mt-4 space-y-3">
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-2">Care Tips</h4>
              <ul className="space-y-1">
                {plant.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-amber-700 mb-1">🦘 Australian Growing Note</p>
              <p className="text-xs text-amber-800 leading-relaxed">{plant.australianNote}</p>
            </div>
            {plant.toxic && (
              <p className="text-xs text-red-500 flex items-center space-x-1">
                <span>⚠️</span>
                <span>Toxic to pets and/or humans if ingested</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PlantCard
