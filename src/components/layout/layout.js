import React from "react"
// import { useStaticQuery, Link, graphql } from "gatsby"
import Footer from "../Footer/Footer"
import MobileFixedFooter from "../MobileFixedFooter/MobileFixedFooter"
import Header from "../Header/Header"
// import classes from "./layout.module.css";
// const ListLink = props => (
//   <li style={{ display: `inline-block`, marginRight: `1rem` }}>
//     <Link to={props.to}>{props.children}</Link>
//   </li>
// )

export default ({ children, wrapperClass }) => {
  // const data = useStaticQuery(
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           title
  //         }
  //       }
  //     }
  //   `
  // )

  return (
    <div className={`flex flex-col min-h-screen items-center ${wrapperClass}`}>
      <Header />
      {children}
      <Footer />
      <MobileFixedFooter />
    </div>
  )
}
