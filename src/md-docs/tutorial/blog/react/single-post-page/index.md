---
title: Single Post Page
date: "2020-05-09"
order: 72
---

## What You Will Learn Regarding Aventum?

- To create a new content item make a `POST` request to `http://localhost:3030/:schemaPluralName` with the schema fields in the body of the request and the access token(`x-access-token`) in the header of the request if the authentication/authorization is required to process the request.

- To update a content item make a `PATCH` request to `http://localhost:3030/:schemaPluralName/:itemId` with the schema fields in the body of the request and the access token(`x-access-token`) in the header of the request if the authentication/authorization is required to process the request.

- To delete a content item make a `DELETE` request to `http://localhost:3030/:schemaPluralName/:itemId` with the access token(`x-access-token`) in the header of the request if the authentication/authorization is required to process the request.

- To get the first page/list of the post's comments we made a `GET` request to `http://localhost:3030/comments?query=${encodeURIComponent(JSON.stringify(query))}&page=1`

  where the `query` object was equal to `{ where: { post: _postId } }`(Lean more about this query object [here](../../../../docs/deep-dive/query/)) what this query mean is get the comments where the value of the `post` field/column is equal to this post id.

- To fetch a single upload make a `GET` request to `http://localhost:3030/uploads/:uploadId`.

- To fetch a single content item from the server make a `GET` request to `http://localhost:3030/:schemaPluralName/:itemId`.

---

Our single post page will display all the post details, post comments, simple form to create/update comments, and delete comment button.

Inside the `containers` folder create the `Post` folder and inside this one create two files `Post.js` and `Post.module.css`.

Inside the `Post.module.css` file put the following CSS:

```css title=src/containers/Post/Post.module.css
.postWrapper {
  margin-bottom: 3rem;
}

.postWrapper img {
  max-width: 600px !important;
}

.commentForm {
  display: none;
}

.editLink {
  color: blue;
}

.deleteLink {
  color: red;
}
```

At the top of `Post.js` file import the required modules:

```js title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"
```

Next create our main `Post` function:

```js highlight=5 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {}
```

Next we need to grab the post id from the URL's:

```js highlight=6 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
}
```

We need to manage a few states in our component:

```js highlight=7-13 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
  const [post, setPost] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentlyUpdatingComment, setCurrentlyUpdatingComment] = useState(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [comments, setComments] = useState([])
  const [featuredImage, setFeaturedImage] = useState()
}
```

- `post` used to store the current post data.
- `isUpdate` used to check if we are updating a comment or creating a new one.
- `currentlyUpdatingComment` will store the data of the comment that we are updating.
- `subject` to store the comment's subject for the comment that we are creating or updating.
- `body` to store the comment's body for the comment that we are creating or updating.
- `comments` to store the current post's comments.
- `featuredImage` to store the current post's featured image object.

Next, create the `saveComment` function that we will use to save the comment's data on the server, we will use it to create a new comment or updating the existing one.

```js highlight=15-61 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
  const [post, setPost] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentlyUpdatingComment, setCurrentlyUpdatingComment] = useState(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [comments, setComments] = useState([])
  const [featuredImage, setFeaturedImage] = useState()

  const saveComment = async event => {
    event.preventDefault()

    if (isUpdate) {
      const response = await fetch(
        `http://localhost:3030/comments/${currentlyUpdatingComment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-access-token"),
          },
          body: JSON.stringify({
            subject,
            body,
            post: id,
          }),
        }
      )

      let data = await response.json()
      setComments(oldComments =>
        oldComments.map(c => {
          if (c.id == currentlyUpdatingComment.id) {
            return data.content
          }
          return c
        })
      )
    } else {
      const response = await fetch("http://localhost:3030/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
        body: JSON.stringify({
          subject,
          body,
          post: id,
        }),
      })

      let data = await response.json()
      setComments(oldComments => [data, ...oldComments])
    }
  }
}
```

This function will be fired on submitting the comment's form, we check if we are updating a comment or creating a new one, if we are updating we use a `PATCH` request otherwise we use a `POST` request. We are including the user's token(`x-access-token`) in the request header. And finally from the data that we received from the server we either adding a new comment to the comments list or updating the existing one using the `setComments` function.

Next we need a function to set the data of the updating comment on click on the update comment button:

```js highlight=63-69 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
  const [post, setPost] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentlyUpdatingComment, setCurrentlyUpdatingComment] = useState(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [comments, setComments] = useState([])
  const [featuredImage, setFeaturedImage] = useState()

  const saveComment = async event => {
    event.preventDefault()

    if (isUpdate) {
      const response = await fetch(
        `http://localhost:3030/comments/${currentlyUpdatingComment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-access-token"),
          },
          body: JSON.stringify({
            subject,
            body,
            post: id,
          }),
        }
      )

      let data = await response.json()
      setComments(oldComments =>
        oldComments.map(c => {
          if (c.id == currentlyUpdatingComment.id) {
            return data.content
          }
          return c
        })
      )
    } else {
      const response = await fetch("http://localhost:3030/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
        body: JSON.stringify({
          subject,
          body,
          post: id,
        }),
      })

      let data = await response.json()
      setComments(oldComments => [data, ...oldComments])
    }
  }

  const setUpdateData = _id => {
    const comment = comments.find(c => c.id == _id)
    setSubject(comment.subject)
    setBody(comment.body)
    setIsUpdate(true)
    setCurrentlyUpdatingComment(comment)
  }
}
```

This function will be the following:

- Gets the comment data from the comment list(`const comment = comments.find(c => c.id == _id)`).
- Sets the subject and body states to this comment's subject and body(`setSubject(comment.subject)` and `setBody(comment.body)`).
- Make the `isUpdate` state equal to true(`setIsUpdate(true)`), because we are in updating comment process.
- Finally sets the currently updating comment data(`setCurrentlyUpdatingComment(comment)`).

Now add the `cancelUpdate` function:

```js highlight=71-76 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
  const [post, setPost] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentlyUpdatingComment, setCurrentlyUpdatingComment] = useState(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [comments, setComments] = useState([])
  const [featuredImage, setFeaturedImage] = useState()

  const saveComment = async event => {
    event.preventDefault()

    if (isUpdate) {
      const response = await fetch(
        `http://localhost:3030/comments/${currentlyUpdatingComment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-access-token"),
          },
          body: JSON.stringify({
            subject,
            body,
            post: id,
          }),
        }
      )

      let data = await response.json()
      setComments(oldComments =>
        oldComments.map(c => {
          if (c.id == currentlyUpdatingComment.id) {
            return data.content
          }
          return c
        })
      )
    } else {
      const response = await fetch("http://localhost:3030/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
        body: JSON.stringify({
          subject,
          body,
          post: id,
        }),
      })

      let data = await response.json()
      setComments(oldComments => [data, ...oldComments])
    }
  }

  const setUpdateData = _id => {
    const comment = comments.find(c => c.id == _id)
    setSubject(comment.subject)
    setBody(comment.body)
    setIsUpdate(true)
    setCurrentlyUpdatingComment(comment)
  }

  const cancelUpdate = () => {
    setSubject("")
    setBody("")
    setIsUpdate(false)
    setCurrentlyUpdatingComment(null)
  }
}
```

When we click on the cancel update button this function will fire to reverse the updating comment process to creating a new one.

Now create `deleteComment` function:

```js highlight=78-95 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
  const [post, setPost] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentlyUpdatingComment, setCurrentlyUpdatingComment] = useState(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [comments, setComments] = useState([])
  const [featuredImage, setFeaturedImage] = useState()

  const saveComment = async event => {
    event.preventDefault()

    if (isUpdate) {
      const response = await fetch(
        `http://localhost:3030/comments/${currentlyUpdatingComment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-access-token"),
          },
          body: JSON.stringify({
            subject,
            body,
            post: id,
          }),
        }
      )

      let data = await response.json()
      setComments(oldComments =>
        oldComments.map(c => {
          if (c.id == currentlyUpdatingComment.id) {
            return data.content
          }
          return c
        })
      )
    } else {
      const response = await fetch("http://localhost:3030/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
        body: JSON.stringify({
          subject,
          body,
          post: id,
        }),
      })

      let data = await response.json()
      setComments(oldComments => [data, ...oldComments])
    }
  }

  const setUpdateData = _id => {
    const comment = comments.find(c => c.id == _id)
    setSubject(comment.subject)
    setBody(comment.body)
    setIsUpdate(true)
    setCurrentlyUpdatingComment(comment)
  }

  const cancelUpdate = () => {
    setSubject("")
    setBody("")
    setIsUpdate(false)
    setCurrentlyUpdatingComment(null)
  }

  const deleteComment = async _id => {
    const response = await fetch(`http://localhost:3030/comments/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })

    if (response.status === 200) {
      setComments(oldComments => oldComments.filter(c => c.id !== _id))
    }
  }
}
```

On click on the delete comment button, this function will fire to delete the comment.

Next, create the `getPostComments` function that will be responsible to fetch the current post's comments.

```js highlight=97-108 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
  const [post, setPost] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentlyUpdatingComment, setCurrentlyUpdatingComment] = useState(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [comments, setComments] = useState([])
  const [featuredImage, setFeaturedImage] = useState()

  const saveComment = async event => {
    event.preventDefault()

    if (isUpdate) {
      const response = await fetch(
        `http://localhost:3030/comments/${currentlyUpdatingComment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-access-token"),
          },
          body: JSON.stringify({
            subject,
            body,
            post: id,
          }),
        }
      )

      let data = await response.json()
      setComments(oldComments =>
        oldComments.map(c => {
          if (c.id == currentlyUpdatingComment.id) {
            return data.content
          }
          return c
        })
      )
    } else {
      const response = await fetch("http://localhost:3030/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
        body: JSON.stringify({
          subject,
          body,
          post: id,
        }),
      })

      let data = await response.json()
      setComments(oldComments => [data, ...oldComments])
    }
  }

  const setUpdateData = _id => {
    const comment = comments.find(c => c.id == _id)
    setSubject(comment.subject)
    setBody(comment.body)
    setIsUpdate(true)
    setCurrentlyUpdatingComment(comment)
  }

  const cancelUpdate = () => {
    setSubject("")
    setBody("")
    setIsUpdate(false)
    setCurrentlyUpdatingComment(null)
  }

  const deleteComment = async _id => {
    const response = await fetch(`http://localhost:3030/comments/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })

    if (response.status === 200) {
      setComments(oldComments => oldComments.filter(c => c.id !== _id))
    }
  }

  //Fetch post's comments
  async function getPostComments(_postId) {
    let query = { where: { post: _postId } }

    const response = await fetch(
      `http://localhost:3030/comments?query=${encodeURIComponent(
        JSON.stringify(query)
      )}&page=1`
    )
    let data = await response.json()
    setComments(data.contents)
  }
}
```

Next, create the `getUpload` function that will be responsible to get the featured image data(like the URL) from the featured image id.

```js highlight=110-115 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
  const [post, setPost] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentlyUpdatingComment, setCurrentlyUpdatingComment] = useState(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [comments, setComments] = useState([])
  const [featuredImage, setFeaturedImage] = useState()

  const saveComment = async event => {
    event.preventDefault()

    if (isUpdate) {
      const response = await fetch(
        `http://localhost:3030/comments/${currentlyUpdatingComment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-access-token"),
          },
          body: JSON.stringify({
            subject,
            body,
            post: id,
          }),
        }
      )

      let data = await response.json()
      setComments(oldComments =>
        oldComments.map(c => {
          if (c.id == currentlyUpdatingComment.id) {
            return data.content
          }
          return c
        })
      )
    } else {
      const response = await fetch("http://localhost:3030/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
        body: JSON.stringify({
          subject,
          body,
          post: id,
        }),
      })

      let data = await response.json()
      setComments(oldComments => [data, ...oldComments])
    }
  }

  const setUpdateData = _id => {
    const comment = comments.find(c => c.id == _id)
    setSubject(comment.subject)
    setBody(comment.body)
    setIsUpdate(true)
    setCurrentlyUpdatingComment(comment)
  }

  const cancelUpdate = () => {
    setSubject("")
    setBody("")
    setIsUpdate(false)
    setCurrentlyUpdatingComment(null)
  }

  const deleteComment = async _id => {
    const response = await fetch(`http://localhost:3030/comments/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })

    if (response.status === 200) {
      setComments(oldComments => oldComments.filter(c => c.id !== _id))
    }
  }

  //Fetch post's comments
  async function getPostComments(_postId) {
    let query = { where: { post: _postId } }

    const response = await fetch(
      `http://localhost:3030/comments?query=${encodeURIComponent(
        JSON.stringify(query)
      )}&page=1`
    )
    let data = await response.json()
    setComments(data.contents)
  }

  async function getUpload(_id) {
    const response = await fetch(`http://localhost:3030/uploads/${_id}`)

    let data = await response.json()
    setFeaturedImage(data)
  }
}
```

Next define the `getPost` function that will be responsible to fetch current post data from the id:

```js highlight=117-123 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
  const [post, setPost] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentlyUpdatingComment, setCurrentlyUpdatingComment] = useState(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [comments, setComments] = useState([])
  const [featuredImage, setFeaturedImage] = useState()

  const saveComment = async event => {
    event.preventDefault()

    if (isUpdate) {
      const response = await fetch(
        `http://localhost:3030/comments/${currentlyUpdatingComment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-access-token"),
          },
          body: JSON.stringify({
            subject,
            body,
            post: id,
          }),
        }
      )

      let data = await response.json()
      setComments(oldComments =>
        oldComments.map(c => {
          if (c.id == currentlyUpdatingComment.id) {
            return data.content
          }
          return c
        })
      )
    } else {
      const response = await fetch("http://localhost:3030/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
        body: JSON.stringify({
          subject,
          body,
          post: id,
        }),
      })

      let data = await response.json()
      setComments(oldComments => [data, ...oldComments])
    }
  }

  const setUpdateData = _id => {
    const comment = comments.find(c => c.id == _id)
    setSubject(comment.subject)
    setBody(comment.body)
    setIsUpdate(true)
    setCurrentlyUpdatingComment(comment)
  }

  const cancelUpdate = () => {
    setSubject("")
    setBody("")
    setIsUpdate(false)
    setCurrentlyUpdatingComment(null)
  }

  const deleteComment = async _id => {
    const response = await fetch(`http://localhost:3030/comments/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })

    if (response.status === 200) {
      setComments(oldComments => oldComments.filter(c => c.id !== _id))
    }
  }

  //Fetch post's comments
  async function getPostComments(_postId) {
    let query = { where: { post: _postId } }

    const response = await fetch(
      `http://localhost:3030/comments?query=${encodeURIComponent(
        JSON.stringify(query)
      )}&page=1`
    )
    let data = await response.json()
    setComments(data.contents)
  }

  async function getUpload(_id) {
    const response = await fetch(`http://localhost:3030/uploads/${_id}`)

    let data = await response.json()
    setFeaturedImage(data)
  }

  //Fetch the post
  const getPost = useCallback(async _id => {
    const response = await fetch(`http://localhost:3030/posts/${_id}`)
    let data = await response.json()
    setPost(data)
    getUpload(data.content.featuredImage)
  }, [])
}
```

We will use `useEffect` React hook to fetch the current post data and the post's comments:

```js highlight=125-128 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
  const [post, setPost] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentlyUpdatingComment, setCurrentlyUpdatingComment] = useState(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [comments, setComments] = useState([])
  const [featuredImage, setFeaturedImage] = useState()

  const saveComment = async event => {
    event.preventDefault()

    if (isUpdate) {
      const response = await fetch(
        `http://localhost:3030/comments/${currentlyUpdatingComment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-access-token"),
          },
          body: JSON.stringify({
            subject,
            body,
            post: id,
          }),
        }
      )

      let data = await response.json()
      setComments(oldComments =>
        oldComments.map(c => {
          if (c.id == currentlyUpdatingComment.id) {
            return data.content
          }
          return c
        })
      )
    } else {
      const response = await fetch("http://localhost:3030/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
        body: JSON.stringify({
          subject,
          body,
          post: id,
        }),
      })

      let data = await response.json()
      setComments(oldComments => [data, ...oldComments])
    }
  }

  const setUpdateData = _id => {
    const comment = comments.find(c => c.id == _id)
    setSubject(comment.subject)
    setBody(comment.body)
    setIsUpdate(true)
    setCurrentlyUpdatingComment(comment)
  }

  const cancelUpdate = () => {
    setSubject("")
    setBody("")
    setIsUpdate(false)
    setCurrentlyUpdatingComment(null)
  }

  const deleteComment = async _id => {
    const response = await fetch(`http://localhost:3030/comments/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })

    if (response.status === 200) {
      setComments(oldComments => oldComments.filter(c => c.id !== _id))
    }
  }

  //Fetch post's comments
  async function getPostComments(_postId) {
    let query = { where: { post: _postId } }

    const response = await fetch(
      `http://localhost:3030/comments?query=${encodeURIComponent(
        JSON.stringify(query)
      )}&page=1`
    )
    let data = await response.json()
    setComments(data.contents)
  }

  async function getUpload(_id) {
    const response = await fetch(`http://localhost:3030/uploads/${_id}`)

    let data = await response.json()
    setFeaturedImage(data)
  }

  //Fetch the post
  const getPost = useCallback(async _id => {
    const response = await fetch(`http://localhost:3030/posts/${_id}`)
    let data = await response.json()
    setPost(data)
    getUpload(data.content.featuredImage)
  }, [])

  useEffect(() => {
    getPost(id)
    getPostComments(id)
  }, [getPost, id])
}
```

Finally it is the time to render everything:

```js highlight=125-203 title=src/containers/Post/Post.js
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import classes from "./Post.module.css"

export default function Post({ user }) {
  let { id } = useParams()
  const [post, setPost] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentlyUpdatingComment, setCurrentlyUpdatingComment] = useState(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [comments, setComments] = useState([])
  const [featuredImage, setFeaturedImage] = useState()

  const saveComment = async event => {
    event.preventDefault()

    if (isUpdate) {
      const response = await fetch(
        `http://localhost:3030/comments/${currentlyUpdatingComment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-access-token"),
          },
          body: JSON.stringify({
            subject,
            body,
            post: id,
          }),
        }
      )

      let data = await response.json()
      setComments(oldComments =>
        oldComments.map(c => {
          if (c.id == currentlyUpdatingComment.id) {
            return data.content
          }
          return c
        })
      )
    } else {
      const response = await fetch("http://localhost:3030/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
        body: JSON.stringify({
          subject,
          body,
          post: id,
        }),
      })

      let data = await response.json()
      setComments(oldComments => [data, ...oldComments])
    }
  }

  const setUpdateData = _id => {
    const comment = comments.find(c => c.id == _id)
    setSubject(comment.subject)
    setBody(comment.body)
    setIsUpdate(true)
    setCurrentlyUpdatingComment(comment)
  }

  const cancelUpdate = () => {
    setSubject("")
    setBody("")
    setIsUpdate(false)
    setCurrentlyUpdatingComment(null)
  }

  const deleteComment = async _id => {
    const response = await fetch(`http://localhost:3030/comments/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })

    if (response.status === 200) {
      setComments(oldComments => oldComments.filter(c => c.id !== _id))
    }
  }

  //Fetch post's comments
  async function getPostComments(_postId) {
    let query = { where: { post: _postId } }

    const response = await fetch(
      `http://localhost:3030/comments?query=${encodeURIComponent(
        JSON.stringify(query)
      )}&page=1`
    )
    let data = await response.json()
    setComments(data.contents)
  }

  async function getUpload(_id) {
    const response = await fetch(`http://localhost:3030/uploads/${_id}`)

    let data = await response.json()
    setFeaturedImage(data)
  }

  //Fetch the post
  const getPost = useCallback(async _id => {
    const response = await fetch(`http://localhost:3030/posts/${_id}`)
    let data = await response.json()
    setPost(data)
    getUpload(data.content.featuredImage)
  }, [])

  useEffect(() => {
    getPost(id)
    getPostComments(id)
  }, [getPost, id])

  return (
    <>
      <div className={classes.postWrapper}>
        {featuredImage && (
          <img src={featuredImage.path} alt={featuredImage.originalName} />
        )}
        {post && (
          <div>
            <h2>{post.content.title}</h2>
            <p>{post.content.body}</p>
          </div>
        )}
      </div>
      {user && (
        <form onSubmit={saveComment}>
          <div>
            <label htmlFor="subject">Subject: </label>
            <input
              onChange={e => setSubject(e.target.value)}
              value={subject}
              type="text"
              name="subject"
              id="subject"
              required
            />
          </div>
          <div>
            <label htmlFor="body">Body: </label>
            <textarea
              onChange={e => setBody(e.target.value)}
              value={body}
              id="body"
              name="body"
              rows="4"
              cols="50"
            />
          </div>
          <div>
            {!isUpdate && <input type="submit" value="Publish!" />}
            {isUpdate && <input type="submit" value="Update!" />}
            {isUpdate && (
              <input
                onClick={cancelUpdate}
                type="button"
                value="Cancel Update!"
              />
            )}
          </div>
        </form>
      )}
      {comments.length ? (
        <div>
          <h2>Comments:</h2>
          {comments.map(c => {
            return (
              <div key={c.id}>
                <h3>{c.subject}</h3>
                <p>{c.body}</p>
                <div>
                  <button
                    className={classes.editLink}
                    onClick={() => setUpdateData(c.id)}
                  >
                    Update
                  </button>
                  /<button
                    className={classes.deleteLink}
                    onClick={() => deleteComment(c.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </>
  )
}
```
