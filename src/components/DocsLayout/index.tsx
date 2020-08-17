import React from "react"
import { Link } from "gatsby"
import DocsSidebar from "../DocsSidebar"

interface Props {
  html: string
  title: string
  nextDoc: any
  permalink: string
  sideBarData: any
}

const index = ({ html, title, nextDoc, sideBarData }: Props) => {
  return (
    <section>
      <div className="documentationContent">
        <div className="inner-content">
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          {nextDoc && (
            <Link className="read-next" to={nextDoc.frontmatter.permalink}>
              <span className="read-next-continue">
                Continue Reading &rarr;
              </span>
              <span className="read-next-title">
                {nextDoc.frontmatter.title}
              </span>
            </Link>
          )}
        </div>
        <DocsSidebar sideBarData={sideBarData} />
      </div>
    </section>
  )
}

export default index
