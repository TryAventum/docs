---
title: Home Page
date: "2020-05-02"
order: 57
---

## What You Will Learn Regarding Aventum?

- To fetch any content page/list from Aventum's server we make a `GET` request to `http://localhost:3030/:schemaPluralName?page=:pageNumber`

- To get all uploads we make a `GET` request to `http://localhost:3030/uploads/all` and to avoid garbing all the uploads you can specify what is the specifications of the uploads that you want by adding a query object to the URL like `http://localhost:3030/uploads/all?query=${encodeURIComponent( JSON.stringify(query) )}`

- You can lean more about this query object [here](../../../../docs/deep-dive/query/).

---

The _Home_ page will display a paginated list of clickable posts with their featured images, title, created at, updated at, created by, and updated by.

Create index.html and put the following within it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog</title>
    <link rel="stylesheet" href="lib/normalize.css" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>The Awesome Blog</h1>
    <h2>Posts</h2>
    <script src="auth.js"></script>
    <script src="index.js"></script>
    <script src="header.js"></script>
  </body>
</html>
```

We discussed earlier `auth.js` and `header.js` files in the [introduction](../) section, now lets explain what `index.js` file do.

Create an `index.js` file with a self-invoking anonymous function inside it.

```js
;(async function() {})()
```

We first need to grab the page number from the URL so go ahead and add the following code to our function:

```js highlight=2-4
;(async function() {
  //Get the current page number from the url
  const urlParams = new URLSearchParams(window.location.search)
  const currentPage = Number(urlParams.get("page")) || 1
})()
```

Next create `getPosts` function.

```js highlight=6-12
;(async function() {
  //Get the current page number from the url
  const urlParams = new URLSearchParams(window.location.search)
  const currentPage = Number(urlParams.get("page")) || 1

  //Fetch the posts
  async function getPosts() {
    const response = await fetch(
      `http://localhost:3030/posts?page=${currentPage}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }
})()
```

The work of the `getPosts` function is very simple which is just making a `GET` request to the Aventum server and grab the required posts page.

In the post object we will get only the featured image id which is the upload id, Aventum adds a record for each file get uploaded to the `uploads` table/collection contains the upload info, so we need a function to grab the featured images objects which will contains the path/URL of the image in order to display them, create `getUploadsInIds` function as the following:

```js highlight=14-24
;(async function() {
  //Get the current page number from the url
  const urlParams = new URLSearchParams(window.location.search)
  const currentPage = Number(urlParams.get("page")) || 1

  //Fetch the posts
  async function getPosts() {
    const response = await fetch(
      `http://localhost:3030/posts?page=${currentPage}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  //Fetch the features images
  async function getUploadsInIds(ids) {
    let query = { whereIn: { column: "id", values: ids } }

    const response = await fetch(
      `http://localhost:3030/uploads/all?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }
})()
```

The `getUploadsInIds` function receives the uploads ids(in our case the featured images ids) and adds them to the query object `{ whereIn: { column: "id", values: ids } }` what this query object means is to tell the Aventum server to grab only the uploads where their ids in the given ids array.

> Lean more about this query object [here](../../../../docs/deep-dive/query/).

Next, fetch the posts using the `getPosts` function.

```js highlight=26
;(async function() {
  //Get the current page number from the url
  const urlParams = new URLSearchParams(window.location.search)
  const currentPage = Number(urlParams.get("page")) || 1

  //Fetch the posts
  async function getPosts() {
    const response = await fetch(
      `http://localhost:3030/posts?page=${currentPage}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  //Fetch the features images
  async function getUploadsInIds(ids) {
    let query = { whereIn: { column: "id", values: ids } }

    const response = await fetch(
      `http://localhost:3030/uploads/all?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  const posts = await getPosts()
})()
```

Now grab the featured image ids and get their data by getting the uploads that these featured image ids belong to.

```js highlight=28-31
;(async function() {
  //Get the current page number from the url
  const urlParams = new URLSearchParams(window.location.search)
  const currentPage = Number(urlParams.get("page")) || 1

  //Fetch the posts
  async function getPosts() {
    const response = await fetch(
      `http://localhost:3030/posts?page=${currentPage}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  //Fetch the features images
  async function getUploadsInIds(ids) {
    let query = { whereIn: { column: "id", values: ids } }

    const response = await fetch(
      `http://localhost:3030/uploads/all?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  const posts = await getPosts()

  const allFeaturedImagesIds = posts.contents.map(p => p.featuredImage)

  const uploads = await getUploadsInIds(allFeaturedImagesIds)
  const featuredImages = uploads.uploads
})()
```

Now render the post list.

```js highlight=33-70
;(async function() {
  //Get the current page number from the url
  const urlParams = new URLSearchParams(window.location.search)
  const currentPage = Number(urlParams.get("page")) || 1

  //Fetch the posts
  async function getPosts() {
    const response = await fetch(
      `http://localhost:3030/posts?page=${currentPage}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  //Fetch the features images
  async function getUploadsInIds(ids) {
    let query = { whereIn: { column: "id", values: ids } }

    const response = await fetch(
      `http://localhost:3030/uploads/all?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  const posts = await getPosts()

  const allFeaturedImagesIds = posts.contents.map(p => p.featuredImage)

  const uploads = await getUploadsInIds(allFeaturedImagesIds)
  const featuredImages = uploads.uploads

  //render the posts list
  var ul = document.createElement("ul")
  ul.setAttribute("id", "post-list")

  for (const post of posts.contents) {
    const postFeaturedImage = featuredImages.find(
      f => f.id === post.featuredImage
    )
    const link = document.createElement("a")
    link.href = `${window.location.pathname.replace(
      "index.html",
      "post.html"
    )}?id=${post.id}`
    ul.appendChild(link)

    const li = document.createElement("li")
    link.appendChild(li)
    const title = document.createElement("h2")
    title.innerHTML = post.title
    const createdAt = document.createElement("div")
    createdAt.innerHTML = `Created At: ${post.createdAt}`
    const createdBy = document.createElement("div")
    createdBy.innerHTML = `Created By: ${post.createdBy}`
    const updatedAt = document.createElement("div")
    updatedAt.innerHTML = `Updated At: ${post.updatedAt}`
    const updatedBy = document.createElement("div")
    updatedBy.innerHTML = `Updated By: ${post.updatedBy}`
    const featuredImage = document.createElement("img")
    featuredImage.src = postFeaturedImage.path
    featuredImage.alt = postFeaturedImage.originalName
    li.appendChild(featuredImage)
    li.appendChild(title)
    li.appendChild(createdAt)
    li.appendChild(updatedAt)
    li.appendChild(createdBy)
    li.appendChild(updatedBy)
  }
  document.body.appendChild(ul)
})()
```

Finally, render the pagination.

```js highlight=72-96
;(async function() {
  //Get the current page number from the url
  const urlParams = new URLSearchParams(window.location.search)
  const currentPage = Number(urlParams.get("page")) || 1

  //Fetch the posts
  async function getPosts() {
    const response = await fetch(
      `http://localhost:3030/posts?page=${currentPage}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  //Fetch the features images
  async function getUploadsInIds(ids) {
    let query = { whereIn: { column: "id", values: ids } }

    const response = await fetch(
      `http://localhost:3030/uploads/all?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  const posts = await getPosts()

  const allFeaturedImagesIds = posts.contents.map(p => p.featuredImage)

  const uploads = await getUploadsInIds(allFeaturedImagesIds)
  const featuredImages = uploads.uploads

  //render the posts list
  var ul = document.createElement("ul")
  ul.setAttribute("id", "post-list")

  for (const post of posts.contents) {
    const postFeaturedImage = featuredImages.find(
      f => f.id === post.featuredImage
    )
    const link = document.createElement("a")
    link.href = `${window.location.pathname.replace(
      "index.html",
      "post.html"
    )}?id=${post.id}`
    ul.appendChild(link)

    const li = document.createElement("li")
    link.appendChild(li)
    const title = document.createElement("h2")
    title.innerHTML = post.title
    const createdAt = document.createElement("div")
    createdAt.innerHTML = `Created At: ${post.createdAt}`
    const createdBy = document.createElement("div")
    createdBy.innerHTML = `Created By: ${post.createdBy}`
    const updatedAt = document.createElement("div")
    updatedAt.innerHTML = `Updated At: ${post.updatedAt}`
    const updatedBy = document.createElement("div")
    updatedBy.innerHTML = `Updated By: ${post.updatedBy}`
    const featuredImage = document.createElement("img")
    featuredImage.src = postFeaturedImage.path
    featuredImage.alt = postFeaturedImage.originalName
    li.appendChild(featuredImage)
    li.appendChild(title)
    li.appendChild(createdAt)
    li.appendChild(updatedAt)
    li.appendChild(createdBy)
    li.appendChild(updatedBy)
  }
  document.body.appendChild(ul)

  /**
   * Render the pagination
   */
  //We will only render the pagination if we have more than one page
  if (posts.pagination.totalPages > 1) {
    const paginationWrapper = document.createElement("div")
    paginationWrapper.setAttribute("id", "pagination-wrapper")
    for (
      let pageNumber = 1;
      pageNumber <= posts.pagination.totalPages;
      pageNumber++
    ) {
      const link = document.createElement("a")

      // Add active class to the current page link
      if (pageNumber === currentPage) {
        link.setAttribute("class", "active")
      }
      link.href = `${window.location.pathname}?page=${pageNumber}`
      link.innerHTML = pageNumber
      paginationWrapper.appendChild(link)
    }

    document.body.appendChild(paginationWrapper)
  }
})()
```

That is it, the above code is what the `index.js` file contains.
