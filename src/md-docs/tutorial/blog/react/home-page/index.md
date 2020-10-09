---
title: Home Page
date: "2020-05-08"
order: 71
---

## What You Will Learn Regarding Aventum?

- To get all uploads we make a `GET` request to `http://localhost:3030/uploads/all` and to avoid garbing all the uploads you can specify what is the specifications of the uploads that you want by adding a query object to the URL like `http://localhost:3030/uploads/all?query=${encodeURIComponent( JSON.stringify(query) )}`. You can learn more about this query object [here](../../../../docs/deep-dive/query/).

- To fetch any content page/list from the Aventum server we make a `GET` request to `http://localhost:3030/:schemaPluralName?page=:pageNumber`.

---

The _Home_ page will display a paginated list of clickable posts with their featured images, title, created at, updated at, created by, and updated by.

Inside the `containers` folder create the `Home` folder and inside this one create two files `Home.js` and `Home.module.css`.

Inside the `Home.module.css` file put the following CSS:

```css title=src/containers/Home/Home.module.css
/* Post List
     ============================= */
.postList {
  list-style: none;
}

.postList img {
  max-width: 600px !important;
}

.postList li {
  margin-bottom: 2rem;
}

/* Pagination
     ============================= */
.paginationWrapper {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 3rem;
}

.paginationWrapper a {
  padding: 0.5rem;
  border: 2px solid #cecece;
  margin-right: 1rem;
  text-decoration: none;
  color: black;
}

.active {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 3rem;
  background-color: lightgray;
}
```

At the top of `Home.js` file import the required modules:

```js title=src/containers/Home/Home.js
import React, { useEffect, useState, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import classes from "./Home.module.css"
```

Next create our main `Home` function:

```js highlight=5 title=src/containers/Home/Home.js
import React, { useEffect, useState, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import classes from "./Home.module.css"

export default function Home() {}
```

We need to manage two states in this component, `posts` and `featuredImages`, we will store the current page's posts in the `posts` and the `featuredImages` we will store the posts' featured images.

```js highlight=6,7 title=src/containers/Home/Home.js
import React, { useEffect, useState, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import classes from "./Home.module.css"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [featuredImages, setFeaturedImages] = useState([])
}
```

Now we need to know the current page number:

```js highlight=9,10 title=src/containers/Home/Home.js
import React, { useEffect, useState, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import classes from "./Home.module.css"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [featuredImages, setFeaturedImages] = useState([])

  let queryString = new URLSearchParams(useLocation().search)
  const currentPage = Number(queryString.get("page")) || 1
}
```

Next define the `getUploadsInIds` function:

```js highlight=12-24 title=src/containers/Home/Home.js
import React, { useEffect, useState, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import classes from "./Home.module.css"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [featuredImages, setFeaturedImages] = useState([])

  let queryString = new URLSearchParams(useLocation().search)
  const currentPage = Number(queryString.get("page")) || 1

  //Fetch the features images
  async function getUploadsInIds(ids) {
    let query = { whereIn: { column: "id", values: ids } }

    const response = await fetch(
      `http://localhost:3030/uploads/all?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`
    )
    let data = await response.json()

    setFeaturedImages(data.uploads)
  }
}
```

The `getUploadsInIds` function will receive the uploads ids and will make a `GET` request to the server to grab the uploads objects for these ids because we want the uploads URLs to display the images. It asks the server this specific request using the query object `{ whereIn: { column: "id", values: ids } }` which is mean get the uploads where their ids in `ids` array. Finally, we store the featured image objects in the `featuredImages` state using the `setFeaturedImages` setter.

> Lean more about this query object [here](../../../../docs/deep-dive/query/).

Next, create the `getPosts` function that will be responsible to fetch the posts from the server.

```js highlight=26-33 title=src/containers/Home/Home.js
import React, { useEffect, useState, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import classes from "./Home.module.css"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [featuredImages, setFeaturedImages] = useState([])

  let queryString = new URLSearchParams(useLocation().search)
  const currentPage = Number(queryString.get("page")) || 1

  //Fetch the features images
  async function getUploadsInIds(ids) {
    let query = { whereIn: { column: "id", values: ids } }

    const response = await fetch(
      `http://localhost:3030/uploads/all?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`
    )
    let data = await response.json()

    setFeaturedImages(data.uploads)
  }

  //Fetch the posts
  const getPosts = useCallback(async _p => {
    const response = await fetch(`http://localhost:3030/posts?page=${_p}`)
    let data = await response.json()
    const allFeaturedImagesIds = data.contents.map(p => p.featuredImage)
    setPosts(data)
    getUploadsInIds(allFeaturedImagesIds)
  }, [])
}
```

The `getPosts` will take the page number(`_p`) then it will make a `GET` request to the server to get the posts page, then store the posts objects in `posts` state using `setPosts` setter and call `getUploadsInIds` with the featured images ids to get their objects that contain the featured images URLs and some other data.

Next, we will use the `useEffect` React hook to call the `getPosts` function after mount and on page number change.

```js highlight=35-37 title=src/containers/Home/Home.js
import React, { useEffect, useState, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import classes from "./Home.module.css"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [featuredImages, setFeaturedImages] = useState([])

  let queryString = new URLSearchParams(useLocation().search)
  const currentPage = Number(queryString.get("page")) || 1

  //Fetch the features images
  async function getUploadsInIds(ids) {
    let query = { whereIn: { column: "id", values: ids } }

    const response = await fetch(
      `http://localhost:3030/uploads/all?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`
    )
    let data = await response.json()

    setFeaturedImages(data.uploads)
  }

  //Fetch the posts
  const getPosts = useCallback(async _p => {
    const response = await fetch(`http://localhost:3030/posts?page=${_p}`)
    let data = await response.json()
    const allFeaturedImagesIds = data.contents.map(p => p.featuredImage)
    setPosts(data)
    getUploadsInIds(allFeaturedImagesIds)
  }, [])

  useEffect(() => {
    getPosts(currentPage)
  }, [currentPage, getPosts])
}
```

Next, we check if there is a `pagination` object Aventum server sent to us and if the `totalPages` is greater than 1, if so then we build the pagination links that we will display at the bottom of the page.

```js highlight=39-57 title=src/containers/Home/Home.js
import React, { useEffect, useState, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import classes from "./Home.module.css"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [featuredImages, setFeaturedImages] = useState([])

  let queryString = new URLSearchParams(useLocation().search)
  const currentPage = Number(queryString.get("page")) || 1

  //Fetch the features images
  async function getUploadsInIds(ids) {
    let query = { whereIn: { column: "id", values: ids } }

    const response = await fetch(
      `http://localhost:3030/uploads/all?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`
    )
    let data = await response.json()

    setFeaturedImages(data.uploads)
  }

  //Fetch the posts
  const getPosts = useCallback(async _p => {
    const response = await fetch(`http://localhost:3030/posts?page=${_p}`)
    let data = await response.json()
    const allFeaturedImagesIds = data.contents.map(p => p.featuredImage)
    setPosts(data)
    getUploadsInIds(allFeaturedImagesIds)
  }, [])

  useEffect(() => {
    getPosts(currentPage)
  }, [currentPage, getPosts])

  let paginationLinks = []

  if (posts.pagination && posts.pagination.totalPages > 1) {
    for (
      let pageNumber = 1;
      pageNumber <= posts.pagination.totalPages;
      pageNumber++
    ) {
      paginationLinks.push(
        <Link
          className={pageNumber === currentPage ? classes.active : ""}
          key={pageNumber}
          to={`/?page=${pageNumber}`}
        >
          {pageNumber}
        </Link>
      )
    }
  }
}
```

Finally, let's render what we get:

```js highlight=59-92 title=src/containers/Home/Home.js
import React, { useEffect, useState, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import classes from "./Home.module.css"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [featuredImages, setFeaturedImages] = useState([])

  let queryString = new URLSearchParams(useLocation().search)
  const currentPage = Number(queryString.get("page")) || 1

  //Fetch the features images
  async function getUploadsInIds(ids) {
    let query = { whereIn: { column: "id", values: ids } }

    const response = await fetch(
      `http://localhost:3030/uploads/all?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`
    )
    let data = await response.json()

    setFeaturedImages(data.uploads)
  }

  //Fetch the posts
  const getPosts = useCallback(async _p => {
    const response = await fetch(`http://localhost:3030/posts?page=${_p}`)
    let data = await response.json()
    const allFeaturedImagesIds = data.contents.map(p => p.featuredImage)
    setPosts(data)
    getUploadsInIds(allFeaturedImagesIds)
  }, [])

  useEffect(() => {
    getPosts(currentPage)
  }, [currentPage, getPosts])

  let paginationLinks = []

  if (posts.pagination && posts.pagination.totalPages > 1) {
    for (
      let pageNumber = 1;
      pageNumber <= posts.pagination.totalPages;
      pageNumber++
    ) {
      paginationLinks.push(
        <Link
          className={pageNumber === currentPage ? classes.active : ""}
          key={pageNumber}
          to={`/?page=${pageNumber}`}
        >
          {pageNumber}
        </Link>
      )
    }
  }

  return (
    <>
      <ul className={classes.postList}>
        {posts.contents &&
          posts.contents.map(p => {
            const postFeaturedImage = featuredImages.find(
              f => f.id === p.featuredImage
            )

            return (
              <Link key={p.id} to={`/post/${p.id}`}>
                <li>
                  {postFeaturedImage && (
                    <img
                      src={postFeaturedImage.path}
                      alt={postFeaturedImage.originalName}
                    />
                  )}
                  <h2>{p.title}</h2>
                  <div>Created By: {p.createdBy}</div>
                  <div>Updated By: {p.updatedBy}</div>
                  <div>Created At: {p.createdAt}</div>
                  <div>Updated At: {p.updatedAt}</div>
                  <div></div>
                </li>
              </Link>
            )
          })}
      </ul>
      {posts.pagination && posts.pagination.totalPages > 1 && (
        <div className={classes.paginationWrapper}>{paginationLinks}</div>
      )}
    </>
  )
}
```
