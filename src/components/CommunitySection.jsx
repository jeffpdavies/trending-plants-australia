import * as React from "react"

const FB_GROUP = "https://www.facebook.com/groups/470256795925800"

const testimonials = [
  {
    quote: "Found my dream Monstera Thai Constellation through the group for a fraction of the nursery price. This community is incredible!",
    author: "Melbourne, VIC",
    emoji: "👩",
  },
  {
    quote: "I was a total beginner and the advice I got from group members saved my Peace Lily. So much knowledge in one place.",
    author: "Brisbane, QLD",
    emoji: "🧑",
  },
  {
    quote: "Sold out my entire batch of Pothos cuttings in under an hour. The buyers in this group are genuinely passionate.",
    author: "Sydney, NSW",
    emoji: "👩",
  },
]

const CommunitySection = () => {
  return (
    <section className="py-20 px-4 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Plant Family Says
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Real stories from real plant lovers in our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {testimonials.map(({ quote, author, emoji }) => (
            <div key={author} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="text-gray-700 leading-relaxed mb-4 italic">"{quote}"</p>
              <p className="text-green-700 font-semibold text-sm">— Plant lover, {author}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6 text-lg">
            Ready to join Australia's fastest-growing plant community?
          </p>
          <a
            href={FB_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-full text-lg font-semibold transition-colors no-underline"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Join Trending Plants Buy & Sell Australia</span>
          </a>
          <p className="text-gray-400 text-sm mt-3">Free to join · 9,200+ members · Active daily</p>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection
