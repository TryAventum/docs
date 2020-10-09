import React from "react"
import { Link } from "gatsby"
import classes from "./Footer.module.css"

export default function Footer() {
  const colClasses = "flex flex-col mb-4 p-2 md:w-1/2 lg:w-1/3"
  const colHeadingClasses = "mb-3 font-bold"
  const linkClasses = "mb-2 hover:underline hover:text-brand-red"

  return (
    <footer
      className={`w-full ${classes.Wrapper} p-8 flex flex-col items-center footer pb-32 md:pb-8`}
    >
      <div className="flex flex-wrap flex-col md:flex-row w-full md:w-3/4 max-w-screen-xl">
        <div className={colClasses}>
          <h5 className={colHeadingClasses}>Docs</h5>
          <Link className={linkClasses} to="/docs/getting-started/">
            Getting Started
          </Link>
          <Link className={linkClasses} to="/tutorial/">
            Tutorial
          </Link>
          <Link className={linkClasses} to="/docs/front-end/">
            Frontend
          </Link>
          <Link className={linkClasses} to="/docs/api/">
            Deep Dive
          </Link>
          <Link className={linkClasses} to="/docs/deep-dive/">
            API
          </Link>
        </div>
        <div className={colClasses}>
          <h5 className={colHeadingClasses}>Ecosystem</h5>
          <a
            href="https://github.com/TryAventum/server"
            className={linkClasses}
          >
            Server
          </a>
          <a
            href="https://github.com/TryAventum/dashboard"
            className={linkClasses}
          >
            Dashboard
          </a>
          <a
            href="https://github.com/TryAventum/Docsator"
            className={linkClasses}
          >
            Docsator
          </a>
          <a className={linkClasses} href="https://github.com/TryAventum/hooks">
            Hooks
          </a>
        </div>
        <div className={colClasses}>
          <h5 className={colHeadingClasses}>Links</h5>
          <a className={linkClasses} href="https://discord.gg/tmXT64N">
            Discord
          </a>
          <a className={linkClasses} href="https://github.com/TryAventum">
            GitHub
          </a>
          <a className={linkClasses} href="https://www.npmjs.com/org/aventum">
            npm
          </a>
        </div>
      </div>

      <Link to="/" className="mb-2">
        <img
          src="/img/Aventum_Red_Logo.svg"
          alt="Aventum"
          width="170"
          height="45"
        />
      </Link>
      <div className="">© 2020</div>
    </footer>
  )
}
