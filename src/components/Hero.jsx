import * as React from "react"
import { Link } from "gatsby"

const FB_GROUP = "https://www.facebook.com/groups/470256795925800"

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-6 tracking-wide">
          🌱 Australia's #1 Indoor Plant Community
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Where Plant Lovers
          <span className="text-green-700 block">Come to Grow</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join 9,200+ Australian plant enthusiasts. Discover rare varieties, get care tips,
          buy and sell plants, and connect with a community that shares your passion.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={FB_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800 transition-colors no-underline inline-flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Join the Community</span>
          </a>
          <Link
            to="/plant-guides"
            className="bg-white text-green-700 border-2 border-green-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-colors no-underline inline-flex items-center justify-center"
          >
            Browse Plant Guides
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center space-x-1 text-gray-500 text-sm">
          <div className="flex -space-x-2">
            {["🧑", "👩", "👨", "🧑", "👩"].map((emoji, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-xs">
                {emoji}
              </div>
            ))}
          </div>
          <span className="ml-3 text-gray-600">
            <strong className="text-gray-900">9,200+</strong> plant lovers across Australia
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero
