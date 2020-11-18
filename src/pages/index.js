import React from "react"
import { graphql } from "gatsby"
import Hero from "../components/UI/Home/Hero/Hero"
import Features from "../components/UI/Home/Features/Features"
import Block from "../components/UI/Home/Block/Block"
import Layout from "../components/layout/layout"
import classes from "./index.module.css"

export default ({ data }) => {
  return (
    <Layout wrapperClass={classes.Wrapper}>
      <div className={`flex flex-col items-center w-full`}>
        <Hero />
        <Block
          title="What is Aventum?"
          content="Aventum is a high-performance, fast, and open-source Headless CMS or you can call it API visual builder, backend visual builder, or Headless CMS visual builder because it is content-agnostic! create your content, no matter how complex it is, and manage it easily!"
          img="/img/undraw_feeling_proud_qne1.svg"
          id="what"
        />
        <Features />
        <Block
          title="Why Aventum?"
          imageAlinement="right"
          content="Did you suffer from creating a backend server and dashboard and set up a database schemas for each app and always one backend is slightly different from the other? are you a frontend developer that hates to work with the backend and wished if there is a magic solution for this issue? meet Aventum!"
          img="/img/undraw_a_moment_to_relax_bbpa.svg"
          id="why"
        />
      </div>
      {/* <div style={{ color: `purple` }}>
      <Link to="/contact/">Contact</Link>
      <Header headerText={`Welcome to ${data.site.siteMetadata.title}`} />
      <p>{`${data.site.siteMetadata.tagline}`}</p>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </div> */}
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        tagline
      }
    }
  }
`
