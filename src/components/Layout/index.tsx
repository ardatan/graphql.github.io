import React from "react"
import Footer from "../Footer"
import Header from "../Header"
import Seo from "../Seo"

import "../../assets/css/style.less"

interface Props {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
}
const IndexLayout = ({
  title,
  description,
  children,
  className,
}: Props): JSX.Element => (
  <>
    <Seo title={title} description={description} />
    <div className={className}>
      <Header />
      {children}
      <Footer />
    </div>
  </>
)

export default IndexLayout
