const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  //This query will fetch all docs in /docs folder and will sort them according to the order field
  //of the frontmatter section.
  const docs = await graphql(`
    query {
      allMdx(filter: {fields: {slug: {regex: "/^/docs|^/tutorial/"}}}, sort: {fields: frontmatter___order}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  // const blog = await graphql(`
  //   {
  //     allMdx(filter: { fields: { slug: { regex: "/^/blog/" } } }) {
  //       edges {
  //         node {
  //           fields {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

  // blog.data.allMdx.edges.forEach(({ node }) => {
    
  // })

  const justDocs = docs.data.allMdx.edges

  justDocs.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/doc.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        prev: index === 0 ? null : justDocs[index-1].node,
        next: index === (justDocs.length - 1) ? null : justDocs[index+1].node
      },
    })
  })
}
