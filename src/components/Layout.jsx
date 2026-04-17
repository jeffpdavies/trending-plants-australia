import * as React from "react"
import Header from "./Header"
import Footer from "./Footer"
import FloatingPlantID from "./FloatingPlantID"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingPlantID />
    </div>
  )
}

export default Layout
