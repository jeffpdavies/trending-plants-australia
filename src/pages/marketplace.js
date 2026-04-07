import * as React from "react"
import Layout from "../components/Layout"

const FB_GROUP = "https://www.facebook.com/groups/470256795925800"

const categories = [
  { emoji: "🌿", label: "Rare & Exotic" },
  { emoji: "🍃", label: "Propagations & Cuttings" },
  { emoji: "🪴", label: "Established Plants" },
  { emoji: "🌱", label: "Starter Plants" },
  { emoji: "🏺", label: "Pots & Planters" },
  { emoji: "🌍", label: "Soil & Supplies" },
]

const howItWorks = [
  {
    step: "1",
    title: "Join the Group",
    description: "Join our free Facebook group — Trending Plants Buy & Sell Australia. It's free and takes 30 seconds.",
  },
  {
    step: "2",
    title: "Browse or Post",
    description: "Browse listings from sellers across Australia, or post your own plants for sale with photos and a price.",
  },
  {
    step: "3",
    title: "Connect & Transact",
    description: "Message sellers directly, arrange payment, and sort shipping or local pickup. Simple and community-driven.",
  },
]

const MarketplacePage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4 text-center">
        <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          🛒 Community Marketplace
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Buy & Sell Plants<br />
          <span className="text-green-700">Across Australia</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Find rare varieties, cuttings, propagations and established plants from fellow enthusiasts. No middlemen — just plant lovers helping plant lovers.
        </p>
        <a
          href={FB_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800 transition-colors no-underline"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Browse the Marketplace</span>
        </a>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">What You'll Find</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(({ emoji, label }) => (
              <a
                key={label}
                href={FB_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-green-50 hover:bg-green-100 rounded-xl p-4 transition-colors no-underline group"
              >
                <span className="text-3xl">{emoji}</span>
                <span className="font-medium text-gray-800 group-hover:text-green-700">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="bg-amber-50 border-t border-b border-amber-200 py-8 px-4 text-center">
        <p className="text-amber-800 font-medium">
          🚧 <strong>Coming Soon:</strong> A dedicated listings platform is in development — seller profiles, plant photos, ratings, and more. Join the email list to be first to know.
        </p>
      </section>

      {/* Final CTA */}
      <section className="bg-green-700 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Trading?</h2>
        <p className="text-green-200 mb-8 max-w-xl mx-auto">
          Join 9,200+ plant lovers in our Facebook group and start buying or selling today. It's free, friendly, and full of amazing plants.
        </p>
        <a
          href={FB_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-green-700 font-bold px-10 py-4 rounded-full text-lg hover:bg-green-50 transition-colors no-underline"
        >
          Join the Group — It's Free
        </a>
      </section>
    </Layout>
  )
}

export default MarketplacePage

export const Head = () => (
  <>
    <title>Plant Marketplace | Trending Plants Australia</title>
    <meta name="description" content="Buy and sell indoor plants across Australia. Find rare varieties, cuttings, propagations and more in the Trending Plants Australia community marketplace." />
  </>
)
