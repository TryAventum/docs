---
title: Registration
date: "2020-05-10"
order: 80
---

This page will contain a form that will register the new users.

## What You Will Learn Regarding Aventum?

- Making a `POST` request to `http://localhost:3030/users/register` with the user's fields like `firstName`, `lastName`, `email`, `picture`, `password`, and `passwordConfirmation` on success will register a new user and we will get the access token(`x-access-token`) in the response header and the user's data in the response body.

---

Inside the `containers` folder create the `Registration` folder and inside this one create the `Registration.js` file.

At the top of `Registration.js` file import the required modules:

```js title=src/containers/Registration/Registration.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"
```

Next define our component function:

```js highlight=5 title=src/containers/Registration/Registration.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"

export default function Registration({ user, onLogin }) {}
```

We need the `history` to redirect the user to the home page on success along with `firstName`, `lastName`, `email`, `password`, and `passwordConfirmation` states.

```js highlight=6-12 title=src/containers/Registration/Registration.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"

export default function Registration({ user, onLogin }) {
  let history = useHistory()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
}
```

Now define the `onSubmit` function that will be fired when the user submits the form.

```js highlight=14-37 title=src/containers/Registration/Registration.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"

export default function Registration({ user, onLogin }) {
  let history = useHistory()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3030/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      }),
    })

    const token = response.headers.get("x-access-token")

    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData))
    localStorage.setItem("x-access-token", token)
    onLogin(userData)
    history.push("/")
  }
}
```

The `onSubmit` function will make a `POST` request to `http://localhost:3030/users/register` endpoint and will put the form data in the request body, on the success we will get the token(`x-access-token`) in the response header and the user data in the response body, we will store them to the local storage and will call the `onLogin` props function and passing the user data and finally will redirect the user to the home page.

Finally let's render our component:

```js highlight=39-103 title=src/containers/Registration/Registration.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"

export default function Registration({ user, onLogin }) {
  let history = useHistory()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3030/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      }),
    })

    const token = response.headers.get("x-access-token")

    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData))
    localStorage.setItem("x-access-token", token)
    onLogin(userData)
    history.push("/")
  }

  return (
    <div>
      <EmailConfirmationStatus user={user} />
      <form onSubmit={onSubmit}>
        <div className="field-wrapper">
          <label htmlFor="firstName">First Name: </label>
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            type="text"
            name="firstName"
            id="firstName"
            required
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="lastName">Last Name: </label>
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            type="text"
            name="lastName"
            id="lastName"
            required
          />
        </div>
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
          <label htmlFor="password">Enter new password: </label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="passwordConfirmation">
            Repeat your new password:{" "}
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Register!" />
        </div>
      </form>
    </div>
  )
}
```
