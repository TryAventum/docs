import React from "react"
import { Link } from "gatsby"
import classes from "./Navbar.module.css"
import useActiveRoutes from "../../reactHooks/use-active-routes"
import { FaGithub, FaDiscord } from "react-icons/fa"

export default function Navbar() {
  const linksClasses =
    "block px-4 lg:px-4 text-gray-500 hover:text-brand-red h-16"
  const linksStyles = {
    lineHeight: "4rem",
  }
  const activeClassName = `font-bold text-brand-red border-b-4 border-brand-red ${linksClasses}`
  const { isDocsActive, isApiActive } = useActiveRoutes(activeClassName)

  return (
    <nav className={`${classes.Wrapper} bg-white shadow`} role="navigation">
      <div className="h-16 container mx-auto flex items-center">
        <Link to="/" rel="home" className="pl-2">
          <img
            className="h-8"
            // width="54"
            height="54"
            src="/img/Aventum_Red_Logo.svg"
            alt="Aventum"
          />
        </Link>

        <ul className="flex ml-auto">
          <li className="hidden md:inline">
            <Link
              className={linksClasses}
              to="/docs/"
              style={linksStyles}
              getProps={isDocsActive}
              title="Docs"
            >
              Docs
            </Link>
          </li>
          <li className="hidden md:inline">
            <Link
              className={linksClasses}
              to="/tutorial/"
              style={linksStyles}
              partiallyActive={true}
              activeClassName={`${activeClassName}`}
              title="Tutorial"
            >
              Tutorial
            </Link>
          </li>
          <li className="hidden md:inline">
            <Link
              className={linksClasses}
              style={linksStyles}
              to="/docs/api/"
              getProps={isApiActive}
              title="API"
            >
              API
            </Link>
          </li>
          <li className={`${linksClasses} flex items-center text-2xl`}>
            <a href="https://github.com/TryAventum">
              <FaGithub />
            </a>
          </li>
          <li className={`${linksClasses} flex items-center text-2xl`}>
            <a href="https://discord.gg/tmXT64N">
              <FaDiscord />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
