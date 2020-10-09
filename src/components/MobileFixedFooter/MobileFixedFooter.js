import React from "react"
import { Link } from "gatsby"
import useActiveRoutes from "../../reactHooks/use-active-routes"
import { FaBook, FaGraduationCap, FaCogs } from "react-icons/fa"

export default function MobileFixedFooter() {
  const linksClasses =
    "px-4 lg:px-4 text-gray-500 hover:text-brand-red h-16 flex items-center text-2xl"
  const activeClassName = `font-bold text-brand-red border-b-4 border-brand-red ${linksClasses}`
  const { isDocsActive, isApiActive } = useActiveRoutes(activeClassName)
  const linksStyles = {
    lineHeight: "4rem",
  }

  return (
    <div
      className="md:hidden fixed bottom-0 w-full flex bg-white justify-evenly"
      style={{
        boxShadow:
          "0 1px 15px rgba(27,31,35,.15), 0 0 1px rgba(106,115,125,.35)",
      }}
    >
      <Link
        className={linksClasses}
        to="/docs/"
        style={linksStyles}
        getProps={isDocsActive}
        title="Docs"
      >
        <FaBook />
      </Link>
      <Link
        className={linksClasses}
        to="/tutorial/"
        style={linksStyles}
        partiallyActive={true}
        activeClassName={`${activeClassName}`}
        title="Tutorial"
      >
        <FaGraduationCap />
      </Link>
      <Link
        className={linksClasses}
        style={linksStyles}
        to="/docs/api/"
        getProps={isApiActive}
        title="API"
      >
        <FaCogs />
      </Link>
    </div>
  )
}
