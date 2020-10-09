import React, { Children } from 'react'
import { Link } from "gatsby"

export default function Button({children, to, wrapperClass}) {
    return (
        <Link to={to} className={`${wrapperClass} bg-white hover:bg-brand-red hover:text-white text-brand-red border-brand-red border-2 font-bold py-2 px-4 transition-all duration-200`} style={{boxShadow: '0 1px 15px rgba(27,31,35,.15), 0 0 1px rgba(106,115,125,.35)'}}>
            {children}
        </Link>
    )
}
