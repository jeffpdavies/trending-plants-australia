import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

const NotFoundPage = () => {
  return (
    <Layout>
      <section className="min-h-96 flex items-center justify-center py-20 px-4 text-center bg-green-50">
        <div>
          <div className="text-6xl mb-4">🌵</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 text-lg mb-8">
            Looks like this page has gone to plant heaven. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors no-underline"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <title>Page Not Found | Trending Plants Australia</title>
