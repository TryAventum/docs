---
title: Forget Password
date: "2020-05-10"
order: 78
---

This page will simply display a form with one field, the email address field.

## What You Will Learn Regarding Aventum?

- Making a `POST` request to `http://localhost:3030/users/forgotPassword` and put the user's email address in the request body as `email` will send an email to the user with a link that will allow the user to [reset his/her password](../reset-password/).

---

Inside the `containers` folder create the `ForgetPassword` folder and inside this one create the `ForgetPassword.js` file.

At the top of `ForgetPassword.js` file import the required modules:

```js title=src/containers/ForgetPassword/ForgetPassword.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
```

Next define our main `ForgetPassword` component function:

```js highlight=4 title=src/containers/ForgetPassword/ForgetPassword.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export default function ForgetPassword() {}
```

We will need the `history` to redirect the user to the home page on success and the `email` state to manage the user input.

```js highlight=5,6 title=src/containers/ForgetPassword/ForgetPassword.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export default function ForgetPassword() {
  let history = useHistory()
  const [email, setEmail] = useState("")
}
```

Define our `onSubmit` function:

```js highlight=8-23 title=src/containers/ForgetPassword/ForgetPassword.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export default function ForgetPassword() {
  let history = useHistory()
  const [email, setEmail] = useState("")

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3030/users/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })

    if (response.status === 200) {
      history.push("/")
    }
  }
}
```

The `onSubmit` function will make a `POST` request to `http://localhost:3030/users/forgotPassword` endpoint and will put the user's email address in the request body, the server will send an email to the user with a link that will allow the user to [reset his/her password](../reset-password/).

Finally render the form:

```js highlight=25-44 title=src/containers/ForgetPassword/ForgetPassword.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export default function ForgetPassword() {
  let history = useHistory()
  const [email, setEmail] = useState("")

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3030/users/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })

    if (response.status === 200) {
      history.push("/")
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="field-wrapper">
          <label htmlFor="email">Enter your email: </label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            required
          />
        </div>
        <div className="field-wrapper">
          <input type="submit" value="Submit!" />
        </div>
      </form>
    </div>
  )
}
```
