---
title: Login Page
date: "2020-05-02"
order: 73
---

## What You Will Learn Regarding Aventum?

- Making a `POST` request to `http://localhost:3030/users/login` with the user's email and password returns the user object in the response body and the access token(`x-access-token`) in the response header.

- To login using a provider use `http://localhost:3030/users/auth/:provider` in an anchor tag, for example to login using Google use `http://localhost:3030/users/auth/google` or use `http://localhost:3030/users/auth/facebook` to login using Facebook.

---

This page will simply contain a login form with email and password fields.

Inside the `containers` folder create the `Login` folder and inside this one create the `Login.js` file.

At the top of `Login.js` file import the required modules:

```js title=src/containers/Login/Login.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { boolean } from "boolean"
```

Next create our main `Login` function:

```js highlight=5 title=src/containers/Login/Login.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { boolean } from "boolean"

export default function Login({ onLogin, options }) {}
```

We need the history object because we want to redirect the user to home page on success:

```js highlight=6 title=src/containers/Login/Login.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { boolean } from "boolean"

export default function Login({ onLogin, options }) {
  let history = useHistory()
}
```

We need two states in our component, a state to store the user's email address and another state to store the user's password.

```js highlight=8,9 title=src/containers/Login/Login.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { boolean } from "boolean"

export default function Login({ onLogin, options }) {
  let history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
}
```

Next we need to check if the Facebook login or Google login is enable:

```js highlight=11-22 title=src/containers/Login/Login.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { boolean } from "boolean"

export default function Login({ onLogin, options }) {
  let history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let facebookLogin =
    options &&
    options.length &&
    boolean(options.find(e => e.name === "ENABLE_FACEBOOK_LOGIN").value)
      ? true
      : false
  let googleLogin =
    options &&
    options.length &&
    boolean(options.find(e => e.name === "ENABLE_GOOGLE_LOGIN").value)
      ? true
      : false
}
```

Next create the `onSubmit` function:

```js highlight=24-46 title=src/containers/Login/Login.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { boolean } from "boolean"

export default function Login({ onLogin, options }) {
  let history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let facebookLogin =
    options &&
    options.length &&
    boolean(options.find(e => e.name === "ENABLE_FACEBOOK_LOGIN").value)
      ? true
      : false
  let googleLogin =
    options &&
    options.length &&
    boolean(options.find(e => e.name === "ENABLE_GOOGLE_LOGIN").value)
      ? true
      : false

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    localStorage.setItem(
      "x-access-token",
      response.headers.get("x-access-token")
    )

    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData))
    onLogin(userData)
    history.push("/")
  }
}
```

The `onSubmit` function will make a `POST` request to `http://localhost:3030/users/login` with the email address, and the password, on the success we receive the user token(`x-access-token`) in the response header so we save it in the local storage in `x-access-token` item, we also receive the user data in the response body we save them to the `user-data` local storage item, then we call the `onLogin` props function and passing the user data and redirect the user to the frontend.

Finally render everything:

```js highlight=48-88 title=src/containers/Login/Login.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { boolean } from "boolean"

export default function Login({ onLogin, options }) {
  let history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let facebookLogin =
    options &&
    options.length &&
    boolean(options.find(e => e.name === "ENABLE_FACEBOOK_LOGIN").value)
      ? true
      : false
  let googleLogin =
    options &&
    options.length &&
    boolean(options.find(e => e.name === "ENABLE_GOOGLE_LOGIN").value)
      ? true
      : false

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    localStorage.setItem(
      "x-access-token",
      response.headers.get("x-access-token")
    )

    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData))
    onLogin(userData)
    history.push("/")
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
          <label htmlFor="password">Enter your password: </label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <div className="field-wrapper">
          <input type="submit" value="Login!" />
          {facebookLogin && (
            <a href={"http://localhost:3030/users/auth/facebook"}>
              Login with Facebook
            </a>
          )}
          {googleLogin && (
            <a href={"http://localhost:3030/users/auth/google"}>
              Login with Google
            </a>
          )}
        </div>
      </form>
    </div>
  )
}
```
