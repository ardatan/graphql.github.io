module.exports = {
  siteMetadata: {
    title: "A query language for your API",
    description:
      "GraphQL provides a complete description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.",
    siteUrl: "http://graphql.org/",
  },

  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "learn",
        path: `${__dirname}/src/content`,
        include: ["**/*.md"], // ignore files starting with a dot
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `130`,
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: { js: "javascript" },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Rubik`,
            variants: [`300`],
          },
          {
            family: `Roboto`,
            variants: [`300`],
          },
          {
            family: `Roboto Mono`,
            variants: [`400`, `400i`, `600`],
          },
        ],
      },
    },
    `gatsby-plugin-less`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-44373548-16",
      }
    } 
  ],
}
