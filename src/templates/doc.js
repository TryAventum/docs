import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import AutoLinkedHeading from "../components/AutoLinkedHeading/AutoLinkedHeading"
import CodeBlock from "../components/CodeBlock/CodeBlock"
import Layout from "../components/layout/layout"
import DocsList from "../components/SideBar/SideBar"
import classes from "./doc.module.css"
import { FiSidebar, FiX } from "react-icons/fi"
// import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import { useBreadcrumb } from "gatsby-plugin-breadcrumb"
import TableOfContents from "../components/TableOfContents/TableOfContents"
import NextAndPrev from "../components/UI/DOC/NextAndPrev/NextAndPrev"
import Breadcrumb from "../components/UI/DOC/Breadcrumb/Breadcrumb"
var GithubSlugger = require("github-slugger")

export default ({ data, pageContext, location }) => {
  var slugger = new GithubSlugger()
  // slugger.reset()
  const post = data.mdx

  // if(!data.mdx || !data.mdx.tableOfContents){
  //   return null
  // }

  let pageLinks = data.mdx.tableOfContents.items

  const components = {
    h1: props => (
      <AutoLinkedHeading
        size="h1"
        pageLinks={pageLinks}
        slugger={slugger}
        {...props}
      />
    ),
    h2: props => (
      <AutoLinkedHeading
        size="h2"
        pageLinks={pageLinks}
        slugger={slugger}
        {...props}
      />
    ),
    h3: props => (
      <AutoLinkedHeading
        size="h3"
        pageLinks={pageLinks}
        slugger={slugger}
        {...props}
      />
    ),
    h4: props => (
      <AutoLinkedHeading
        size="h4"
        pageLinks={pageLinks}
        slugger={slugger}
        {...props}
      />
    ),
    h5: props => (
      <AutoLinkedHeading
        size="h5"
        pageLinks={pageLinks}
        slugger={slugger}
        {...props}
      />
    ),
    h6: props => (
      <AutoLinkedHeading
        size="h6"
        pageLinks={pageLinks}
        slugger={slugger}
        {...props}
      />
    ),
    pre: props => <CodeBlock {...props} />,
  }

  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)
  const { crumbs } = useBreadcrumb({
    location,
    crumbLabel: post.frontmatter.title,
    crumbSeparator: " / ",
  })

  useEffect(() => {
    let el = document.getElementById(location.hash.replace("#", ""))
    if (el) {
      el.scrollIntoView(true)
    }
  }, [location.hash])

  const { next, prev, slug } = pageContext

  return (
    <Layout>
      <div className="flex flex-col md:flex-row p-4 my-16 w-full max-w-screen-xl">
        <div className="hidden md:block md:w-1/5 border-r border-gray-200">
          <DocsList
            wrapperClass={`md:sticky ${classes.Top5Rem +
              " " +
              classes.hScreen80} overflow-auto`}
          />
        </div>
        <div
          className={`order-2 md:order-1 md:px-16 px-0 ${classes.markShell}`}
        >
          <Breadcrumb wrapperClass="mb-8" crumbs={crumbs} />

          <h1 className="mb-4 md:block font-bold text-4xl">
            {post.frontmatter.title}
          </h1>
          <div className={`${classes.MarkDownWrapper} markdown-body`}>
            <MDXProvider components={components}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
          </div>
          <NextAndPrev next={next} prev={prev} />
        </div>
        <div className="order-1 mb-8 md:order-2 md:w-1/5">
          <TableOfContents
            wrapperClass={`md:sticky ${classes.Top5Rem +
              " " +
              classes.responsiveHScreen80} overflow-auto`}
            pageLinks={pageLinks}
            slug={slug}
          />
        </div>
      </div>
      <div
        className={`${
          isVisibleSidebar ? classes.Visible : classes.Hidden
        } sidebar fixed h-screen left-0 top-0 bg-white z-20`}
        style={{ minWidth: "300px" }}
      >
        <div className="overflow-auto p-4 h-full">
          <DocsList />
        </div>
      </div>
      <button
        className="fixed bg-brand-red text-white md:hidden text-xl rounded-full p-3 z-30"
        style={{ right: "1rem", bottom: "5rem" }}
        onClick={e => setIsVisibleSidebar(!isVisibleSidebar)}
      >
        {isVisibleSidebar ? <FiX /> : <FiSidebar />}
      </button>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      tableOfContents
      frontmatter {
        title
      }
    }
  }
`
