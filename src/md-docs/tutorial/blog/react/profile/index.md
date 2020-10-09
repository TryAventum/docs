---
title: Profile
date: "2020-05-10"
order: 77
---

This is the profile page where the user will be able to update her/his data like the email address, password, etc. Our page will simply contain a form along with [EmailConfirmationStatus](../email-confirmation-status/) component.

## What You Will Learn Regarding Aventum?

- Making a `PATCH` request to `http://localhost:3030/users/profile` with the user's fields like `firstName`, `lastName`, `email`, `picture`, `password`, and `passwordConfirmation` will update the user's data and will return the updated user object in the response body.

---

Inside the `containers` folder create the `Profile` folder and inside this one create the `Profile.js` file.

At the top of `Profile.js` file import the required modules:

```js title=src/containers/Profile/Profile.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"
```

Next create our main `Profile` component function:

```js highlight=5 title=src/containers/Profile/Profile.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"

export default function Profile({ user, onLogin }) {}
```

We need the `history` to redirect the user to the home page on the success profile update.

```js highlight=6 title=src/containers/Profile/Profile.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"

export default function Profile({ user, onLogin }) {
  let history = useHistory()
}
```

We will allow the user to update `firstName`, `lastName`, `email`, `picture`, `password`, and `passwordConfirmation` so we need states to manage these data.

```js highlight=8-13 title=src/containers/Profile/Profile.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"

export default function Profile({ user, onLogin }) {
  let history = useHistory()

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [picture, setPicture] = useState(user.picture)
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
}
```

Next, define the `onSubmit` function that will be fired when the user clicks on the submit button of the profile form.

```js highlight=15-37 title=src/containers/Profile/Profile.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"

export default function Profile({ user, onLogin }) {
  let history = useHistory()

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [picture, setPicture] = useState(user.picture)
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3030/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        picture,
        password,
        passwordConfirmation,
      }),
    })

    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData.user))
    onLogin(userData.user)
    history.push("/")
  }
}
```

When the `onSubmit` function fired it makes a `PATCH` request to `http://localhost:3030/users/profile` along with the user data in the request body and the user token in the request header, on the success we will update the local user data and calling the `onLogin` props function and finally redirect the user to the home page.

Finally render our page:

```js highlight=39-114 title=src/containers/Profile/Profile.js
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import EmailConfirmationStatus from "../../components/EmailConfirmationStatus/EmailConfirmationStatus"

export default function Profile({ user, onLogin }) {
  let history = useHistory()

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [picture, setPicture] = useState(user.picture)
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3030/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        picture,
        password,
        passwordConfirmation,
      }),
    })

    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData.user))
    onLogin(userData.user)
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
          <label htmlFor="picture">Profile picture link: </label>
          <input
            value={picture}
            onChange={e => setPicture(e.target.value)}
            type="text"
            name="picture"
            id="picture"
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
          <input type="submit" value="Update Profile!" />
        </div>
      </form>
    </div>
  )
}
```
