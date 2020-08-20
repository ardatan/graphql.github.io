import React from "react"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  page: string
}
const PageMarkdown = ({ page }: Props) => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              page
            }
            html
          }
        }
      }
    }
  `)

  const requiredPage = edges.filter(
    (markdown: any) => markdown.node.frontmatter.page === page
  )[0]
  

  return <div dangerouslySetInnerHTML={{__html:requiredPage.node.html}}></div>
}
export default PageMarkdown
