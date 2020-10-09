import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import Button from "../../Button/Button"
import classes from "./Hero.module.css"

export default function Hero() {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            tagline
          }
        }
      }
    `
  )

  return (
    <div
      className={`${classes.Wrapper} bg-white flex flex-col-reverse items-center p-6 md:flex-row justify-center min-h-screen overflow-hidden w-full`}
    >
      <div className="flex items-center flex-col text-center mb-6 md:p-8 md:w-1/2">
        <div className="w-1/2 md:block animated  fadeInDown">
          <img src="/img/Aventum_Red_Logo.svg" alt="Aventum Logo" />
        </div>
        <h2 className="text-3xl mb-4 animated bounceIn delay-1s">
          {`${data.site.siteMetadata.tagline}`}
        </h2>
        <div className="flex items-center">
          <Button
            wrapperClass="animated fadeInLeft delay-1s"
            to="/docs/getting-started/installation/"
          >
            Get Started
          </Button>
          <a
            className="ml-2 hover:text-brand-red animated fadeInRight delay-1s"
            href="#why"
          >
            Why Aventum?
          </a>
        </div>
      </div>

      <div className="w-3/4 md:w-1/2 md:p-8">
        <img
          className="animated fadeInRight"
          src="/img/undraw_content_vbqo.svg"
          alt="Content"
        />
      </div>
    </div>
  )
}
