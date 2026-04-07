import * as React from "react"
import { Link } from "gatsby"

const FB_GROUP = "https://www.facebook.com/groups/470256795925800"

const Footer = () => {
  return (
    <footer className="bg-green-900 text-green-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🌿</span>
              <div>
                <div className="font-bold text-white text-lg leading-tight">Trending Plants</div>
                <div className="text-xs text-green-400 tracking-widest">AUSTRALIA</div>
              </div>
            </div>
            <p className="text-green-300 text-sm leading-relaxed">
              Australia's favourite indoor plant community. 9,200+ plant lovers sharing, buying and selling across the country.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/plant-guides", label: "Plant Guides" },
                { to: "/gallery", label: "Gallery" },
                { to: "/marketplace", label: "Marketplace" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-green-300 hover:text-white transition-colors text-sm no-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <p className="text-green-300 text-sm mb-4">
              Join our Facebook group to connect with plant lovers, share your collection, and find great deals.
            </p>
            <a
              href={FB_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors no-underline"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Join the Group</span>
            </a>
          </div>
        </div>

        <div className="border-t border-green-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-green-400 text-xs">
          <p>© {new Date().getFullYear()} Trending Plants Australia. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with 🌱 for plant lovers across Australia</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
