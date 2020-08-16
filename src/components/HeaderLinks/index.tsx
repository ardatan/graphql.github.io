import React from "react"
import { Link } from "gatsby"

interface LinkItem {
  section: string
  text: string
  href: string
}

interface Props {
  section: string
}

const links: LinkItem[] = [
  { section: "learn", text: "Learn", href: "/learn/" },
  { section: "code", text: "Code", href: "/code/" },
  { section: "community", text: "Community", href: "/community/" },
  {
    section: "spec",
    text: "Spec",
    href: "https://graphql.github.io/graphql-spec/",
  },
  {
    section: "codeofconduct",
    text: "Code of Conduct",
    href: "/codeofconduct/",
  },
  {
    section: "foundation",
    text: "Foundation",
    href: "https://foundation.graphql.org/",
  },
  { section: "landscape", text: "Landscape", href: "https://l.graphql.org/" },
]

export default ({ section }: Props) => (
  <nav>
    {links.map(link =>
      link.href.slice(0, 4) === "http" ? (
        <a
          key={link.section}
          href={link.href}
          target="_blank"
          rel={link.href.slice(0, 4) === "http" ? "noopener noreferrer" : ""}
        >
          {link.text}
        </a>
      ) : (
        <Link to={link.href} key={link.section} activeClassName="active">
          {link.text}
        </Link>
      )
    )}
  </nav>
)
