import * as React from "react"
import { Link } from "gatsby"

const features = [
  {
    icon: "🛒",
    title: "Buy & Sell Plants",
    description: "Find rare varieties, offsets, cuttings and established plants from fellow enthusiasts across Australia. Our marketplace makes it easy to grow your collection.",
    link: "/marketplace",
    linkLabel: "Browse Marketplace",
  },
  {
    icon: "📚",
    title: "Plant Care Guides",
    description: "Get expert care advice for popular indoor plants. From watering schedules to light requirements, our guides help you keep your plants thriving.",
    link: "/plant-guides",
    linkLabel: "View Guides",
  },
  {
    icon: "💬",
    title: "Community Discussion",
    description: "Ask questions, share your wins, troubleshoot problems, and celebrate your plant journey with thousands of like-minded Australians.",
    link: "https://www.facebook.com/groups/470256795925800",
    linkLabel: "Join the Chat",
    external: true,
  },
  {
    icon: "🌏",
    title: "Australia-Wide",
    description: "Connect with plant lovers in your city or state. Our community spans every corner of Australia, from tropical QLD to the cooler southern states.",
    link: "https://www.facebook.com/groups/470256795925800",
    linkLabel: "Find Your People",
    external: true,
  },
]

const Features = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything for the Plant-Obsessed
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Whether you're a seasoned collector or just starting your indoor jungle, we have something for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map(({ icon, title, description, link, linkLabel, external }) => (
            <div key={title} className="bg-green-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed mb-5">{description}</p>
              {external ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 font-semibold hover:text-green-900 transition-colors no-underline inline-flex items-center space-x-1"
                >
                  <span>{linkLabel}</span>
                  <span>→</span>
                </a>
              ) : (
                <Link
                  to={link}
                  className="text-green-700 font-semibold hover:text-green-900 transition-colors no-underline inline-flex items-center space-x-1"
                >
                  <span>{linkLabel}</span>
                  <span>→</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
