---
title: Single Post Page
date: "2020-05-02"
order: 59
---

## What You Will Learn Regarding Aventum?

- To create a new content item make a `POST` request to `http://localhost:3030/:schemaPluralName` with the schema fields in the body of the request and the access token(`x-access-token`) in the header of the request if the authentication/authorization is required to process the request.

- To get the first page/list of the post's comments we made a `GET` request to `http://localhost:3030/comments?query=${encodeURIComponent(JSON.stringify(query))}&page=1`

  Where the `query` object was equal to `{ where: { post: _postId } }`(Lean more about this query object [here](../../../../docs/deep-dive/query/)).

- To fetch a single content item from the server make a `GET` request to `http://localhost:3030/:schemaPluralName`.
- To fetch a single upload make a `GET` request to `http://localhost:3030/uploads/:uploadId`.

---

As you can call when we click on a post on our home page we redirected to `post.html?id=:id` now it is the time to create this post page.

Our post page will simply display all the post details, post comments, and a simple form to submit new comments.

Create `post.html` and put the following into it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Post</title>
    <link rel="stylesheet" href="lib/normalize.css" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>The Awesome Blog</h1>
    <script src="auth.js"></script>
    <script src="post.js"></script>
    <script src="header.js"></script>
    <form action="" method="get" id="comment-form">
      <div class="field-wrapper">
        <label for="subject">Subject: </label>
        <input type="text" name="subject" id="subject" required />
      </div>
      <div class="field-wrapper">
        <label for="body">Body: </label>
        <textarea id="body" name="body" rows="4" cols="50"></textarea>
      </div>
      <div class="field-wrapper">
        <input type="submit" value="Publish!" />
      </div>
    </form>
  </body>
</html>
```

It is a simple HTML code with a simple form.

Now let's create the `post.js` file and create our first function within it which is `setUpCommentFormSubmission`.

```js
async function setUpCommentFormSubmission(postId) {}
```

Inside `setUpCommentFormSubmission` function we will have a closure function called `publishComment`.

```js highlight=2-13
async function setUpCommentFormSubmission(postId) {
  async function publishComment(data = {}) {
    const response = await fetch("http://localhost:3030/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }
}
```

When the user submits the comment form this function will make a `POST` request to the server with comment data in order to create a new comment.

Next, add the event listener to the form, so when someone submits it calls the `publishComment` function to create a new comment.

```js highlight=15-30
async function setUpCommentFormSubmission(postId) {
  async function publishComment(data = {}) {
    const response = await fetch("http://localhost:3030/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  const form = document.querySelector("form")
  form.addEventListener("submit", async event => {
    event.preventDefault()
    const subject = event.currentTarget.querySelector("#subject").value
    const body = event.currentTarget.querySelector("#body").value

    const data = {
      subject,
      body,
      post: postId,
    }

    const comment = await publishComment(data)

    location.reload()
  })
}
```

Next, create the `renderCommentsList` function which will be responsible to render the comments list only.

```js highlight=33-56
async function setUpCommentFormSubmission(postId) {
  async function publishComment(data = {}) {
    const response = await fetch("http://localhost:3030/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  const form = document.querySelector("form")
  form.addEventListener("submit", async event => {
    event.preventDefault()
    const subject = event.currentTarget.querySelector("#subject").value
    const body = event.currentTarget.querySelector("#body").value

    const data = {
      subject,
      body,
      post: postId,
    }

    const comment = await publishComment(data)

    location.reload()
  })
}

async function renderCommentsList(comments) {
  const listWrapper = document.createElement("div")
  listWrapper.setAttribute("id", "comments-list")
  if (comments.length) {
    const commentListHeader = document.createElement("h2")
    commentListHeader.innerHTML = "Comments:"
    listWrapper.appendChild(commentListHeader)
  }

  for (const comment of comments) {
    const commentWrapper = document.createElement("div")

    const subject = document.createElement("h3")
    subject.innerHTML = comment.subject
    commentWrapper.appendChild(subject)

    const body = document.createElement("p")
    body.innerHTML = comment.body
    commentWrapper.appendChild(body)

    listWrapper.appendChild(commentWrapper)
  }
  document.body.appendChild(listWrapper)
}
```

What the `renderCommentsList` function is doing is very simple, it takes the comments list and renders them on the page.

Next create `renderComments` function, this function will get the post's comments, set up the form for submissions by calling `setUpCommentFormSubmission`, and render the comments list by calling `renderCommentsList` function.

```js highlight=58-76
async function setUpCommentFormSubmission(postId) {
  async function publishComment(data = {}) {
    const response = await fetch("http://localhost:3030/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  const form = document.querySelector("form")
  form.addEventListener("submit", async event => {
    event.preventDefault()
    const subject = event.currentTarget.querySelector("#subject").value
    const body = event.currentTarget.querySelector("#body").value

    const data = {
      subject,
      body,
      post: postId,
    }

    const comment = await publishComment(data)

    location.reload()
  })
}

async function renderCommentsList(comments) {
  const listWrapper = document.createElement("div")
  listWrapper.setAttribute("id", "comments-list")
  if (comments.length) {
    const commentListHeader = document.createElement("h2")
    commentListHeader.innerHTML = "Comments:"
    listWrapper.appendChild(commentListHeader)
  }

  for (const comment of comments) {
    const commentWrapper = document.createElement("div")

    const subject = document.createElement("h3")
    subject.innerHTML = comment.subject
    commentWrapper.appendChild(subject)

    const body = document.createElement("p")
    body.innerHTML = comment.body
    commentWrapper.appendChild(body)

    listWrapper.appendChild(commentWrapper)
  }
  document.body.appendChild(listWrapper)
}

async function renderComments(postId) {
  //Fetch post's comments
  async function getPostComments(_postId) {
    let query = { where: { post: _postId } }

    const response = await fetch(
      `http://localhost:3030/comments?query=${encodeURIComponent(
        JSON.stringify(query)
      )}&page=1`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  const comments = await getPostComments(postId)

  setUpCommentFormSubmission(postId)

  await renderCommentsList(comments.contents)
}
```

Next, let's create our self invoking anonymous function that will make everything starts.

```js highlight=78
async function setUpCommentFormSubmission(postId) {
  async function publishComment(data = {}) {
    const response = await fetch("http://localhost:3030/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  const form = document.querySelector("form")
  form.addEventListener("submit", async event => {
    event.preventDefault()
    const subject = event.currentTarget.querySelector("#subject").value
    const body = event.currentTarget.querySelector("#body").value

    const data = {
      subject,
      body,
      post: postId,
    }

    const comment = await publishComment(data)

    location.reload()
  })
}

async function renderCommentsList(comments) {
  const listWrapper = document.createElement("div")
  listWrapper.setAttribute("id", "comments-list")
  if (comments.length) {
    const commentListHeader = document.createElement("h2")
    commentListHeader.innerHTML = "Comments:"
    listWrapper.appendChild(commentListHeader)
  }

  for (const comment of comments) {
    const commentWrapper = document.createElement("div")

    const subject = document.createElement("h3")
    subject.innerHTML = comment.subject
    commentWrapper.appendChild(subject)

    const body = document.createElement("p")
    body.innerHTML = comment.body
    commentWrapper.appendChild(body)

    listWrapper.appendChild(commentWrapper)
  }
  document.body.appendChild(listWrapper)
}

async function renderComments(postId) {
  //Fetch post's comments
  async function getPostComments(_postId) {
    let query = { where: { post: _postId } }

    const response = await fetch(
      `http://localhost:3030/comments?query=${encodeURIComponent(
        JSON.stringify(query)
      )}&page=1`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  const comments = await getPostComments(postId)

  setUpCommentFormSubmission(postId)

  await renderCommentsList(comments.contents)
}

;(async function() {})()
```

In our self invoking anonymous function we first grab the post id and create two functions `getPost` to get the current post details and `getUpload` to retrieve the post featured image details.

```js highlight=79-92
async function setUpCommentFormSubmission(postId) {
  async function publishComment(data = {}) {
    const response = await fetch("http://localhost:3030/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  const form = document.querySelector("form")
  form.addEventListener("submit", async event => {
    event.preventDefault()
    const subject = event.currentTarget.querySelector("#subject").value
    const body = event.currentTarget.querySelector("#body").value

    const data = {
      subject,
      body,
      post: postId,
    }

    const comment = await publishComment(data)

    location.reload()
  })
}

async function renderCommentsList(comments) {
  const listWrapper = document.createElement("div")
  listWrapper.setAttribute("id", "comments-list")
  if (comments.length) {
    const commentListHeader = document.createElement("h2")
    commentListHeader.innerHTML = "Comments:"
    listWrapper.appendChild(commentListHeader)
  }

  for (const comment of comments) {
    const commentWrapper = document.createElement("div")

    const subject = document.createElement("h3")
    subject.innerHTML = comment.subject
    commentWrapper.appendChild(subject)

    const body = document.createElement("p")
    body.innerHTML = comment.body
    commentWrapper.appendChild(body)

    listWrapper.appendChild(commentWrapper)
  }
  document.body.appendChild(listWrapper)
}

async function renderComments(postId) {
  //Fetch post's comments
  async function getPostComments(_postId) {
    let query = { where: { post: _postId } }

    const response = await fetch(
      `http://localhost:3030/comments?query=${encodeURIComponent(
        JSON.stringify(query)
      )}&page=1`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  const comments = await getPostComments(postId)

  setUpCommentFormSubmission(postId)

  await renderCommentsList(comments.contents)
}

;(async function() {
  //Get the current page number from the url
  const urlParams = new URLSearchParams(window.location.search)
  const currentPostId = urlParams.get("id")

  //Fetch the post
  async function getPost(id) {
    const response = await fetch(`http://localhost:3030/posts/${id}`)
    return response.json() // parses JSON response into native JavaScript objects
  }

  async function getUpload(id) {
    const response = await fetch(`http://localhost:3030/uploads/${id}`)
    return response.json() // parses JSON response into native JavaScript objects
  }
})()
```

Next, we get the post details, featured image, and render the comments.

```js highlight=94-115
async function setUpCommentFormSubmission(postId) {
  async function publishComment(data = {}) {
    const response = await fetch("http://localhost:3030/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  const form = document.querySelector("form")
  form.addEventListener("submit", async event => {
    event.preventDefault()
    const subject = event.currentTarget.querySelector("#subject").value
    const body = event.currentTarget.querySelector("#body").value

    const data = {
      subject,
      body,
      post: postId,
    }

    const comment = await publishComment(data)

    location.reload()
  })
}

async function renderCommentsList(comments) {
  const listWrapper = document.createElement("div")
  listWrapper.setAttribute("id", "comments-list")
  if (comments.length) {
    const commentListHeader = document.createElement("h2")
    commentListHeader.innerHTML = "Comments:"
    listWrapper.appendChild(commentListHeader)
  }

  for (const comment of comments) {
    const commentWrapper = document.createElement("div")

    const subject = document.createElement("h3")
    subject.innerHTML = comment.subject
    commentWrapper.appendChild(subject)

    const body = document.createElement("p")
    body.innerHTML = comment.body
    commentWrapper.appendChild(body)

    listWrapper.appendChild(commentWrapper)
  }
  document.body.appendChild(listWrapper)
}

async function renderComments(postId) {
  //Fetch post's comments
  async function getPostComments(_postId) {
    let query = { where: { post: _postId } }

    const response = await fetch(
      `http://localhost:3030/comments?query=${encodeURIComponent(
        JSON.stringify(query)
      )}&page=1`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  const comments = await getPostComments(postId)

  setUpCommentFormSubmission(postId)

  await renderCommentsList(comments.contents)
}

;(async function() {
  //Get the current page number from the url
  const urlParams = new URLSearchParams(window.location.search)
  const currentPostId = urlParams.get("id")

  //Fetch the post
  async function getPost(id) {
    const response = await fetch(`http://localhost:3030/posts/${id}`)
    return response.json() // parses JSON response into native JavaScript objects
  }

  async function getUpload(id) {
    const response = await fetch(`http://localhost:3030/uploads/${id}`)
    return response.json() // parses JSON response into native JavaScript objects
  }

  const post = await getPost(currentPostId)
  const postFeaturedImage = await getUpload(post.content.featuredImage)

  const postWrapper = document.createElement("div")
  postWrapper.setAttribute("id", "post-wrapper")

  const featuredImage = document.createElement("img")
  featuredImage.src = postFeaturedImage.path
  featuredImage.alt = postFeaturedImage.originalName
  postWrapper.appendChild(featuredImage)

  const title = document.createElement("h2")
  title.innerHTML = post.content.title
  postWrapper.appendChild(title)

  const body = document.createElement("p")
  body.innerHTML = post.content.body
  postWrapper.appendChild(body)

  document.body.insertBefore(postWrapper, document.querySelector("form"))

  renderComments(currentPostId)
})()
```

Finally, we get the current logged in user details, if the user is logged in we display the comments form.

```js highlight=117-121
async function setUpCommentFormSubmission(postId) {
  async function publishComment(data = {}) {
    const response = await fetch("http://localhost:3030/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  const form = document.querySelector("form")
  form.addEventListener("submit", async event => {
    event.preventDefault()
    const subject = event.currentTarget.querySelector("#subject").value
    const body = event.currentTarget.querySelector("#body").value

    const data = {
      subject,
      body,
      post: postId,
    }

    const comment = await publishComment(data)

    location.reload()
  })
}

async function renderCommentsList(comments) {
  const listWrapper = document.createElement("div")
  listWrapper.setAttribute("id", "comments-list")
  if (comments.length) {
    const commentListHeader = document.createElement("h2")
    commentListHeader.innerHTML = "Comments:"
    listWrapper.appendChild(commentListHeader)
  }

  for (const comment of comments) {
    const commentWrapper = document.createElement("div")

    const subject = document.createElement("h3")
    subject.innerHTML = comment.subject
    commentWrapper.appendChild(subject)

    const body = document.createElement("p")
    body.innerHTML = comment.body
    commentWrapper.appendChild(body)

    listWrapper.appendChild(commentWrapper)
  }
  document.body.appendChild(listWrapper)
}

async function renderComments(postId) {
  //Fetch post's comments
  async function getPostComments(_postId) {
    let query = { where: { post: _postId } }

    const response = await fetch(
      `http://localhost:3030/comments?query=${encodeURIComponent(
        JSON.stringify(query)
      )}&page=1`
    )
    return response.json() // parses JSON response into native JavaScript objects
  }

  const comments = await getPostComments(postId)

  setUpCommentFormSubmission(postId)

  await renderCommentsList(comments.contents)
}

;(async function() {
  //Get the current page number from the url
  const urlParams = new URLSearchParams(window.location.search)
  const currentPostId = urlParams.get("id")

  //Fetch the post
  async function getPost(id) {
    const response = await fetch(`http://localhost:3030/posts/${id}`)
    return response.json() // parses JSON response into native JavaScript objects
  }

  async function getUpload(id) {
    const response = await fetch(`http://localhost:3030/uploads/${id}`)
    return response.json() // parses JSON response into native JavaScript objects
  }

  const post = await getPost(currentPostId)
  const postFeaturedImage = await getUpload(post.content.featuredImage)

  const postWrapper = document.createElement("div")
  postWrapper.setAttribute("id", "post-wrapper")

  const featuredImage = document.createElement("img")
  featuredImage.src = postFeaturedImage.path
  featuredImage.alt = postFeaturedImage.originalName
  postWrapper.appendChild(featuredImage)

  const title = document.createElement("h2")
  title.innerHTML = post.content.title
  postWrapper.appendChild(title)

  const body = document.createElement("p")
  body.innerHTML = post.content.body
  postWrapper.appendChild(body)

  document.body.insertBefore(postWrapper, document.querySelector("form"))

  renderComments(currentPostId)

  const currentUser = await getCurrentUser()

  if (currentUser) {
    document.querySelector("form").style.display = "flex"
  }
})()
```
