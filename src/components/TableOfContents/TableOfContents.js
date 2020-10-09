import React from "react"
import { Link } from "gatsby"
import { useActiveHash } from "../../reactHooks/use-active-hash"

import classes from "./TableOfContents.module.css"

/**
 * My stackoverflow question https://stackoverflow.com/q/60833907/3263601
 */
export default function TableOfContents({ pageLinks, wrapperClass, slug }) {
  const getAllIds = (_items)=>{
    if(!_items || !_items.length){
      return []
    }
    let ids = _items.reduce((prev, curr)=>{
      let tmp = [...prev, curr.url.replace("#", "")]
      if(curr.items){
        tmp = [...tmp, ...getAllIds(curr.items)]
      }
      return tmp
    }, [])
    return ids
  }

  const activeHash = useActiveHash(getAllIds(pageLinks))

  function createItems(items, activeHash) {
    return (
      items &&
      items.map((item, index) => {
        const isActive = item.url === `#${activeHash}`
        return (
          <li
            key={slug + item.url}
          >
            {item.url && (
              <Link
                to={slug + item.url}
                className={isActive ? classes.activeSection : ''}
              >
                {item.title}
              </Link>
            )}
            {item.items && (
              <ul>
                {createItems(
                  item.items,
                  activeHash
                )}
              </ul>
            )}
          </li>
        )
      })
    )
  }

  // useEffect(() => {
  //   const ToClinks = document.querySelectorAll(`.${classes.innerWrapper} a`)

  //   ToClinks.forEach(a => {
  //     a.classList.remove(classes.activeSection)
  //   })

  //   const activeLink = document.querySelectorAll(
  //     `.${classes.innerWrapper} a[href$="${"/#" + activeHash}"]`
  //   )

  //   if (activeLink.length) {
  //     activeLink[0].classList.add(classes.activeSection)
  //   }
  // }, [activeHash])

  let TOCJSX = (
    <div className={`${wrapperClass}`}>
      <h2 className="font-bold text-gray-700 mb-4">
        Table Of Contents
      </h2>
      <ul className={classes.innerWrapper}>
      {createItems(pageLinks, activeHash)}
      </ul>
    </div>
  )

  return pageLinks && pageLinks.length ? TOCJSX : null
}
