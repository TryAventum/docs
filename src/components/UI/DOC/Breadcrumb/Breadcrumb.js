import React from "react"
import { Link } from "gatsby"

export default function Breadcrumb({ crumbs, wrapperClass }) {
  return (
    <nav className={wrapperClass}>
      <ul>
        {crumbs.map((c, index) => (
          <li className="inline" key={c.pathname}>
            <Link
              className="hover:underline hover:text-brand-red"
              activeClassName="font-bold text-brand-red"
              to={c.pathname}
            >
              {c.crumbLabel}
            </Link>
            {index !== crumbs.length - 1 && <span>{c.crumbSeparator}</span>}
          </li>
        ))}
      </ul>
    </nav>
  )
}
