import * as React from "react"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Stats from "../components/Stats"
import Features from "../components/Features"
import PlantFinderSection from "../components/PlantFinderSection"
import EmailCapture from "../components/EmailCapture"
import CommunitySection from "../components/CommunitySection"

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <Stats />
      <Features />
      <PlantFinderSection />
      <EmailCapture />
      <CommunitySection />
    </Layout>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>Trending Plants Australia | Indoor Plant Community</title>
    <meta name="description" content="Australia's favourite indoor plant community. Join 9,200+ plant lovers to discover, buy, sell and share indoor plants across Australia." />
  </>
)
