import * as React from "react"

const MOCK_TIPS = [
  "Bright indirect light",
  "Water every 1–2 weeks",
  "Wipe leaves to keep them glossy",
]

const PlantFinderSection = () => {
  const handleTry = () => {
    window.dispatchEvent(new CustomEvent("open-plant-id"))
  }

  return (
    <section className="bg-gradient-to-br from-green-700 to-emerald-800 py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — copy and CTA */}
        <div>
          <span className="inline-block bg-green-600 text-green-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🌿 AI-Powered
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Identify Any Plant<br />Instantly
          </h2>
          <p className="text-green-200 text-lg leading-relaxed mb-8">
            Not sure what plant you're looking at? Snap a photo and our AI will identify it in seconds — giving you the common name, scientific name, and personalised care tips.
          </p>

          {/* Steps */}
          <ol className="space-y-4 mb-10">
            {[
              { n: "1", label: "Snap or upload a photo" },
              { n: "2", label: "AI identifies the plant" },
              { n: "3", label: "Get instant care tips" },
            ].map(({ n, label }) => (
              <li key={n} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {n}
                </span>
                <span className="text-green-100 font-medium">{label}</span>
              </li>
            ))}
          </ol>

          <button
            onClick={handleTry}
            className="inline-block bg-white text-green-700 font-bold px-8 py-4 rounded-full text-lg hover:bg-green-50 transition-colors shadow-lg"
          >
            Try it now — it's free →
          </button>
        </div>

        {/* Right — mock result card */}
        <div className="lg:flex lg:justify-center">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            {/* Mock image area */}
            <div className="bg-gradient-to-br from-green-100 to-emerald-200 h-44 flex items-center justify-center">
              <span className="text-7xl">🌿</span>
            </div>

            {/* Mock result */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-lg leading-tight">Monstera Deliciosa</h3>
                <span className="shrink-0 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                  High confidence
                </span>
              </div>
              <p className="text-green-700 text-sm italic mb-4">Monstera deliciosa</p>

              <p className="text-gray-800 text-xs font-semibold uppercase tracking-wide mb-2">Care Tips</p>
              <ul className="space-y-1.5 mb-4">
                {MOCK_TIPS.map(tip => (
                  <li key={tip} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="mt-0.5 shrink-0">🌱</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleTry}
                className="w-full bg-green-700 hover:bg-green-800 text-white rounded-full py-2.5 text-sm font-semibold transition-colors"
              >
                Identify your plant →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PlantFinderSection
