import * as React from "react"
import { useState } from "react"
import { Link } from "gatsby"

const FB_GROUP = "https://www.facebook.com/groups/470256795925800"

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/plant-guides", label: "Plant Guides" },
  { to: "/gallery", label: "Gallery" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/contact", label: "Contact" },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 no-underline">
          <span className="text-3xl">🌿</span>
          <div>
            <div className="font-bold text-green-700 text-lg leading-tight">Trending Plants</div>
            <div className="text-xs text-green-500 tracking-widest font-medium">AUSTRALIA</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-gray-600 hover:text-green-700 transition-colors text-sm font-medium no-underline"
              activeClassName="text-green-700 font-semibold"
            >
              {label}
            </Link>
          ))}
          <a
            href={FB_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-800 transition-colors no-underline"
          >
            Join Community
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-600 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block text-gray-600 hover:text-green-700 font-medium no-underline py-1"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href={FB_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold text-center no-underline mt-2"
          >
            Join Community
          </a>
        </div>
      )}
    </header>
  )
}

export default Header
