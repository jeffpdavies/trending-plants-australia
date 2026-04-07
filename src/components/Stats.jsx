import * as React from "react"

const stats = [
  { value: "9,200+", label: "Community Members" },
  { value: "18", label: "Months & Growing" },
  { value: "100%", label: "Plant Lovers" },
  { value: "Australia", label: "Wide Community" },
]

const Stats = () => {
  return (
    <section className="bg-green-700 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map(({ value, label }) => (
          <div key={label}>
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
            <div className="text-green-200 text-sm font-medium">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
