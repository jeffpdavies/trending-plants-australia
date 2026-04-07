import * as React from "react"
import { useState } from "react"

const EmailCapture = () => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": form.getAttribute("name"),
        ...formData,
      }).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert("Something went wrong. Please try again."))
  }

  return (
    <section className="bg-gradient-to-br from-green-800 to-emerald-900 py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-4xl block mb-4">🌿</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get Our Free Plant Care Guide
        </h2>
        <p className="text-green-200 text-lg mb-8 leading-relaxed">
          Download our free guide covering Australia's top 10 indoor plants — care tips, watering schedules, common problems, and how to help them thrive in Australian conditions.
        </p>

        {submitted ? (
          <div className="bg-green-700 border border-green-500 rounded-2xl p-8">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-white text-xl font-bold mb-2">You're on the list!</h3>
            <p className="text-green-200">
              We'll send your free Plant Care Guide shortly. Welcome to the Trending Plants Australia community!
            </p>
          </div>
        ) : (
          <form
            name="newsletter"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 text-left shadow-xl"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <p className="hidden">
              <label>
                Don't fill this out: <input name="bot-field" onChange={handleChange} />
              </label>
            </p>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Sarah"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition-colors text-lg"
            >
              Send Me the Free Guide →
            </button>

            <p className="text-center text-gray-400 text-xs mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

export default EmailCapture
