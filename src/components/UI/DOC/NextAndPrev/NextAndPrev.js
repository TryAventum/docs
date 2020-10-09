import React from 'react'
import { Link } from "gatsby"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export default function NextAndPrev({next, prev}) {
    return (
        <div className="flex flex-col md:flex-row justify-between mt-16">
            <div>
              {prev && (
                <Link className="flex flex-col" to={prev.fields.slug}>
                  <span className="ml-8">Previous</span>
                  <span className="text-xl text-brand-red flex items-center">
                    <FaArrowLeft />
                    <span className="font-bold ml-2">
                      {prev.frontmatter.title}
                    </span>
                  </span>
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link
                  className="flex flex-col items-end"
                  to={next.fields.slug}
                >
                  <span className="mr-8">Next</span>
                  <span className="text-xl text-brand-red flex items-center">
                    <span className="font-bold mr-2">
                      {next.frontmatter.title}
                    </span>
                    <FaArrowRight />
                  </span>
                </Link>
              )}
            </div>
          </div>
    )
}
