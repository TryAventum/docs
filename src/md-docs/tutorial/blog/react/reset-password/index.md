---
title: Reset Password
date: "2020-05-10"
order: 79
---

When the user submits the [forger password form](../forget-password/) the user will receive an email with a link, when the user clicks on that links the user will be landed here.

This page will contain a form with two fields `password` and `passwordConfirmation`.

## What You Will Learn Regarding Aventum?

- Making a `POST` request to `http://localhost:3030/users/resetPassword` with the user's `password` and `passwordConfirmation` fields in the request body and the access token that extracted from the URL in the request header as `x-access-token` will reset the user's password.

---

Inside the `containers` folder create the `ResetPassword` folder and inside this one create the `ResetPassword.js` file.

At the top of `ResetPassword.js` file import the required modules:

```js title=src/containers/ResetPassword/ResetPassword.js
import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
```

Next create our main `ResetPassword` component function:

```js highlight=4 title=src/containers/ResetPassword/ResetPassword.js
import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function ResetPassword() {}
```

We need to extract the `token` from there URL also we need the `history` to redirect the user to the login page on success.

```js highlight=5,6 title=src/containers/ResetPassword/ResetPassword.js
import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function ResetPassword() {
  let { token } = useParams()
  let history = useHistory()
}
```

Next, we need to manage two states `password` and the `passwordConfirmation` states.

```js highlight=8,9 title=src/containers/ResetPassword/ResetPassword.js
import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function ResetPassword() {
  let { token } = useParams()
  let history = useHistory()

  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
}
```

Next, define the `onSubmit` function that will be fired when the user submits the form.

```js highlight=11-28 title=src/containers/ResetPassword/ResetPassword.js
import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function ResetPassword() {
  let { token } = useParams()
  let history = useHistory()

  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3030/users/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        password,
        passwordConfirmation,
      }),
    })

    if (response.status === 200) {
      history.push("/login")
    }
  }
}
```

The `onSubmit` function will make a `POST` request to `http://localhost:3030/users/resetPassword` endpoint with the `password` and the `passwordConfirmation` in the request body and the `token` in the request header, on the success we will redirect the user to the login page.

Finally render our component:

```js highlight=30-62 title=src/containers/ResetPassword/ResetPassword.js
import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function ResetPassword() {
  let { token } = useParams()
  let history = useHistory()

  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3030/users/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        password,
        passwordConfirmation,
      }),
    })

    if (response.status === 200) {
      history.push("/login")
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="field-wrapper">
          <label htmlFor="password">Enter your new password: </label>
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
          <label htmlFor="passwordConfirmation">
            Repeat your new password:{" "}
          </label>
          <input
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
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
