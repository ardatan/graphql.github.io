import React from "react"
import Layout from "../components/Layout"
import PageMarkdown from "../components/PageMarkdown"

export default () => {
  return (
    <Layout title="Code">
      <section>
        <div className="documentationContent">
          <div className="inner-content">
            <h1>Code</h1>
            <PageMarkdown page={"code"} />
          </div>
        </div>
      </section>
    </Layout>
  )
}
