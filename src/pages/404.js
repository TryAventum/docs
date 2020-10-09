import React from "react"
import Layout from "../components/layout/layout"

export default () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center min-h-screen text-center p-4">
        <h1 className="font-bold text-6xl mb-3">
          That page doesn't exist!
        </h1>
        <p className="text-xl">
          Sorry, the page you were looking for could not be found.
        </p>
      </div>
    </Layout>
  )
}
