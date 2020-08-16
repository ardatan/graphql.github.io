const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const docTemplate = path.resolve("./src/templates/doc.tsx")

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    title
                    permalink
                    next
                  }
                  id
                  html
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          // eslint-disable-next-line no-console
          console.log(result.errors)
          reject(result.errors)
        }
        const { edges } = result.data.allMarkdownRemark

        let navigationData = {}
        const mdPages = []
        edges.forEach(({ node }) => {
          const {
            frontmatter: { permalink, next },
          } = node

          // TODO DOCS_SIDEBAR_DATA
          // let data
          //   if (!navigationData[section]) {
          //     data = { title, permalink }
          //     navigationData = { ...navigationData, [section]: [data] }
          //   } else {
          //     data = { title, permalink }
          //     navigationData = {
          //       ...navigationData,
          //       [section]: [...navigationData[section], data],
          //     }
          //   }
          mdPages.push({
            permalink,
            nextPermalink: next,
          })
        })

        mdPages.forEach(page => {
          createPage({
            path: `${page.permalink}`,
            component: docTemplate,
            context: {
              permalink: page.permalink,
              nextPermalink: page.nextPermalink,
              navigationData,
            },
          })
        })
      })
    )
  })
}
