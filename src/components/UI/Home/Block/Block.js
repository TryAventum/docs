import React from "react"
import classes from "./Block.module.css";

export default function Block({ title, content, img, imageAlinement, id }) {
  return (
    <div className="p-5 md:p-16 max-w-screen-xl" id={id}>
      <div className={`p-8 flex flex-col md:flex-row ${classes.InnerWrapper}`}>
        <div className={`md:w-1/2 p-8 ${imageAlinement === 'right' ? 'order-1' : 'order-2'}`}><img src={img} alt={title} /></div>
        <div className={`md:w-1/2 p-8 flex flex-col justify-center ${imageAlinement === 'right' ? 'order-2' : 'order-1'}`}>
            <h2 className="font-bold mb-3 text-2xl text-brand-red">{title}</h2>
            <p>{content}</p>
        </div>
      </div>
    </div>
  )
}
