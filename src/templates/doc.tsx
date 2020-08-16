import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import DocsLayout from "../components/DocsLayout"

interface Props {
  data: any
}

const Blog = ({ data }: Props) => {
  const {
    doc: {
      frontmatter: { title },
      html,
    },
    nextDoc
  } = data
  return (
    <Layout>
      <DocsLayout title={title} html={html} nextDoc={nextDoc} />
    </Layout>
  )
}

export const query = graphql`
  query LearnQuery($permalink: String!,$nextPermalink:String) {
    doc: markdownRemark(frontmatter: { permalink: { eq: $permalink } }) {
      frontmatter {
        title
        permalink
      }
      id
      html
    }
    nextDoc: markdownRemark(frontmatter: { permalink: { eq: $nextPermalink } }) {
      frontmatter {
        title
        permalink
      }
    }
  }
`

export default Blog
