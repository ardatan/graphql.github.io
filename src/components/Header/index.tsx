import React from "react"
import HeaderLinks from "../HeaderLinks"
import Search from "../Search"

interface Props {
  noSearch?: boolean
}
const Header = ({ noSearch }: Props) => {
  return (
    <header>
      <section>
        <a className="nav-home" href="/">
          <img
            className="nav-logo"
            src="/img/logo.svg"
            alt="GraphQL Logo"
            width="30"
            height="30"
          />
          GraphQL
        </a>
        <HeaderLinks section={"home"} />
        {noSearch || <Search />}
      </section>
    </header>
  )
}

export default Header
