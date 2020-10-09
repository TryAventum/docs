import React from "react"
import Navbar from "../navbar/Navbar"
import classes from "./Header.module.css"

export default function Header() {
  return (
    <header className={`z-10 ${classes.header} fixed w-full`}>
      <Navbar />
      {/* <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
          <h3 style={{ display: `inline` }}>
            MySweetSite {data.site.siteMetadata.title}
          </h3>
        </Link>
        <ul style={{ listStyle: `none`, float: `right` }}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about/">About</ListLink>
          <ListLink to="/contact/">Contact</ListLink>
        </ul> */}
    </header>
  )
}
