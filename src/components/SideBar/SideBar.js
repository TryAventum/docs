import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import classes from "./SideBar.module.css"

export default ({ wrapperClass }) => {
  const activeClassName = "font-bold text-brand-red"
  const data = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: { fields: { slug: { regex: "/^/docs|^/tutorial/" } } }
          sort: { fields: frontmatter___order }
        ) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "DD MMMM, YYYY")
                order
              }
              fields {
                slug
              }
              excerpt
            }
          }
        }
      }
    `
  )

  const allDocs = data.allMdx.edges

  let gettingStartedDocs = allDocs.filter(d =>
    d.node.fields.slug.startsWith("/docs/getting-started")
  )

  let deepDiveDocs = allDocs.filter(d =>
    d.node.fields.slug.startsWith("/docs/deep-dive")
  )

  let frontendDocs = allDocs.filter(d =>
    d.node.fields.slug.startsWith("/docs/front-end")
  )

  let tutorialDocs = allDocs.filter(
    d =>
      d.node.fields.slug.startsWith("/tutorial") &&
      !d.node.fields.slug.startsWith("/tutorial/blog")
  )

  let blogDocs = allDocs.filter(
    d =>
      d.node.fields.slug.startsWith("/tutorial/blog") &&
      !d.node.fields.slug.startsWith("/tutorial/blog/vanilla-javascript") &&
      !d.node.fields.slug.startsWith("/tutorial/blog/react")
  )

  let vanillaJavaScriptDocs = allDocs.filter(d =>
    d.node.fields.slug.startsWith("/tutorial/blog/vanilla-javascript")
  )

  let reactDocs = allDocs.filter(d =>
    d.node.fields.slug.startsWith("/tutorial/blog/react")
  )

  let apiDocs = allDocs.filter(d => d.node.fields.slug.startsWith("/docs/api"))

  return (
    <div className={`${classes.wrapper} ${wrapperClass}`}>
      <h2 className="font-bold text-gray-700 mb-4">Documentation</h2>
      <div>
        <h3>Getting Started</h3>
        <ul>
          {gettingStartedDocs.map(n => (
            <li key={n.node.fields.slug}>
              <Link
                activeClassName={`${activeClassName}`}
                to={n.node.fields.slug}
              >
                {n.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Tutorial</h3>
        <ul>
          {tutorialDocs.map(n => (
            <li key={n.node.fields.slug}>
              <Link
                activeClassName={`${activeClassName}`}
                to={n.node.fields.slug}
              >
                {n.node.frontmatter.title}
              </Link>
            </li>
          ))}
          <li>
            <h4>Blog</h4>
            <ul>
              {blogDocs.map(n => (
                <li key={n.node.fields.slug}>
                  <Link
                    activeClassName={`${activeClassName}`}
                    to={n.node.fields.slug}
                  >
                    {n.node.frontmatter.title}
                  </Link>
                </li>
              ))}
              <li>
                <h4>Vanilla JavaScript App</h4>
                <ul>
                  {vanillaJavaScriptDocs.map(n => (
                    <li key={n.node.fields.slug}>
                      <Link
                        activeClassName={`${activeClassName}`}
                        to={n.node.fields.slug}
                      >
                        {n.node.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <h4>React App</h4>
                <ul>
                  {reactDocs.map(n => (
                    <li key={n.node.fields.slug}>
                      <Link
                        activeClassName={`${activeClassName}`}
                        to={n.node.fields.slug}
                      >
                        {n.node.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <h3>Front-end</h3>
        <ul>
          {frontendDocs.map(n => (
            <li key={n.node.fields.slug}>
              <Link
                activeClassName={`${activeClassName}`}
                to={n.node.fields.slug}
              >
                {n.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Deep Dive</h3>
        <ul>
          {deepDiveDocs.map(n => (
            <li key={n.node.fields.slug}>
              <Link
                activeClassName={`${activeClassName}`}
                to={n.node.fields.slug}
              >
                {n.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>API</h3>
        <ul>
          {apiDocs.map(n => (
            <li key={n.node.fields.slug}>
              <Link
                activeClassName={`${activeClassName}`}
                to={n.node.fields.slug}
              >
                {n.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  // return (
  //     <div>
  //       {/* <h4>{data.allMdx.totalCount} Posts</h4> */}
  //       {data.allMdx.edges.map(({ node }) => (
  //           <div key={node.id} className="mb-5">
  //           <Link
  //             activeClassName="bg-pink-400 text-teal-400"
  //             to={node.fields.slug}
  //           >
  //           <h3
  //           >
  //             {node.frontmatter.title}{" "}
  //             <span
  //             >
  //               — {node.frontmatter.date}
  //             </span>
  //           </h3>
  //           <p>{node.excerpt}</p>
  //           </Link>
  //         </div>
  //       ))}
  //     </div>
  // )
}
