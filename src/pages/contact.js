import * as React from "react"
import { useState } from "react"
import Layout from "../components/Layout"

const FB_GROUP = "https://www.facebook.com/groups/470256795925800"

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

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
      .catch(() => alert("Something went wrong. Please try again."))
  }

  return (
    <Layout>
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Have a question, suggestion, or want to collaborate? We'd love to hear from you.
        </p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Facebook Community</h3>
                  <p className="text-gray-600 text-sm mt-1">The fastest way to get a response. Post in the group or send us a message.</p>
                  <a
                    href={FB_GROUP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 font-medium text-sm hover:text-green-900 no-underline"
                  >
                    Visit the Group →
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🌿</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">About the Community</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Trending Plants Australia is a community of passionate plant lovers. We've grown to 9,200+ members in 18 months through shared love of indoor plants.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-green-800 text-sm font-medium">⏱ Response Time</p>
                <p className="text-green-700 text-sm mt-1">We typically respond within 24–48 hours on weekdays.</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thanks for reaching out. We'll get back to you within 24–48 hours.</p>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>Don't fill this out: <input name="bot-field" onChange={handleChange} /></label>
                </p>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ContactPage

export const Head = () => (
  <>
    <title>Contact | Trending Plants Australia</title>
    <meta name="description" content="Get in touch with Trending Plants Australia. We'd love to hear from you." />
  </>
)
