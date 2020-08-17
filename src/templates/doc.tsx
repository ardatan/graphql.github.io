import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import DocsLayout from "../components/DocsLayout"

interface Props {
  data: any
  pageContext: any
}

const Blog = ({ data, pageContext }: Props) => {
  const {
    doc: {
      frontmatter: { title,permalink },
      html,
    },
    nextDoc,
  } = data
  return (
    <Layout>
      <DocsLayout title={title} permalink={permalink} html={html} nextDoc={nextDoc} sideBarData={pageContext.sideBarData} />
    </Layout>
  )
}

export const query = graphql`
  query LearnQuery($permalink: String!, $nextPermalink: String) {
    doc: markdownRemark(frontmatter: { permalink: { eq: $permalink } }) {
      frontmatter {
        title
        permalink
        sublinks
      }
      id
      html
    }
    nextDoc: markdownRemark(
      frontmatter: { permalink: { eq: $nextPermalink } }
    ) {
      frontmatter {
        title
        permalink
      }
    }
  }
`

export default Blog
