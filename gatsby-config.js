/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Trending Plants Australia`,
    description: `Australia's favourite indoor plant community. Discover, buy, sell and share your passion for indoor plants with 9,200+ plant lovers across Australia.`,
    siteUrl: `https://trendingplantsaustralia.com.au`,
    facebookGroup: `https://www.facebook.com/groups/470256795925800`,
    social: {
      facebook: `trendingplantsaustralia`,
      twitter: ``,
    },
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-Y5MQ05GLE6"],
        pluginConfig: { head: true },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    }
  ]
}
