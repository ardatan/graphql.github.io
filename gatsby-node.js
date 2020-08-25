const path = require("path")
const { accessSync } = require("fs")

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
                  parent {
                    ... on File {
                      relativeDirectory
                      sourceInstanceName
                    }
                  }
                  frontmatter {
                    title
                    permalink
                    next
                    category
                    sublinks
                    sidebarTitle
                  }
                  id
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

        let sideBardata = {}
        let pagesGroupedByFolder = {}
        const allPages = []
        edges.forEach(({ node }) => {
          const {
            frontmatter: { permalink, next,sidebarTitle },
            parent: { relativeDirectory, sourceInstanceName },
          } = node

          if (sourceInstanceName !== "content") {
            return
          }

          if (!pagesGroupedByFolder[relativeDirectory]) {
            pagesGroupedByFolder = {
              ...pagesGroupedByFolder,
              [relativeDirectory]: [node],
            }
          } else {
            pagesGroupedByFolder = {
              ...pagesGroupedByFolder,
              [relativeDirectory]: [
                ...pagesGroupedByFolder[relativeDirectory],
                node,
              ],
            }
          }
          allPages.push({
            permalink,
            relativeDirectory,
            sidebarTitle,
            nextPermalink: next,
          })
        })

        Object.keys(pagesGroupedByFolder).forEach(folder => {
          const pages = pagesGroupedByFolder[folder]

          let pagesByUrl = {}
          let previousPagesMap = {}

          for (let i = 0; i < pages.length; ++i) {
            const page = pages[i]
            const {
              frontmatter: { permalink, next },
            } = page
            if (next) {
              previousPagesMap[next] = permalink
            }
            pagesByUrl[permalink] = page
          }

          let firstPage = null

          for (let i = 0; i < pages.length; ++i) {
            const page = pages[i]
            const {
              frontmatter: { permalink },
            } = page

            if (!previousPagesMap[permalink]) {
              firstPage = page
              break
            }
          }

          if (!firstPage) {
            throw new Error(`First page not found in ${folder}`)
          }

          let categories = []
          let currentCategory = null

          let page = firstPage
          let i = 0
          while (page && i++ < 1000) {
            const {
              frontmatter: { category, next },
            } = page
            if (!currentCategory || category !== currentCategory.name) {
              currentCategory && categories.push(currentCategory)
              currentCategory = {
                name: category,
                links: [],
              }
            }
            currentCategory.links.push(page)
            page = pagesByUrl[next]
          }

          categories.push(currentCategory)

          sideBardata[folder] = categories
        })

        allPages.forEach(page => {
          createPage({
            path: `${page.permalink}`,
            component: docTemplate,
            context: {
              permalink: page.permalink,
              nextPermalink: page.nextPermalink,
              sideBarData: sideBardata[page.relativeDirectory],
            },
          })
        })
      })
    )
  })
}
