---
title: Email Confirmation
date: "2020-05-10"
order: 75
---

When the user clicks on the link in the email that she/he receives to confirm his/her email address this page will be opened.

This page will extract the token from the URL and sends it to Aventum's server to verify it, on the success the user's email address will be confirmed.

## What You Will Learn Regarding Aventum?

- Making a `POST` request to `http://localhost:3030/users/emailConfirmation` and put the token that extracted from the URL into the request body as `token` will confirm the user's email address.

---

Inside the `containers` folder create the `EmailConfirmation` folder and inside this one create the `EmailConfirmation.js` file.

Inside `EmailConfirmation.js` file let's start with importing what this component's needs:

```js title=src/containers/EmailConfirmation/EmailConfirmation.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
```

Next create our main `EmailConfirmation` function:

```js highlight=4 title=src/containers/EmailConfirmation/EmailConfirmation.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function EmailConfirmation({ onLogin }) {}
```

We need to grab the token from the URL:

```js highlight=5 title=src/containers/EmailConfirmation/EmailConfirmation.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function EmailConfirmation({ onLogin }) {
  let { token } = useParams()
}
```

Next, we need the `history` object to redirect the user to the profile page on success.

```js highlight=6 title=src/containers/EmailConfirmation/EmailConfirmation.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function EmailConfirmation({ onLogin }) {
  let { token } = useParams()
  let history = useHistory()
}
```

Next create `confirmEmail` function:

```js highlight=6 title=src/containers/EmailConfirmation/EmailConfirmation.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function EmailConfirmation({ onLogin }) {
  let { token } = useParams()
  let history = useHistory()

  const confirmEmail = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3030/users/emailConfirmation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      }
    )

    if (response.status === 200) {
      let userData = JSON.parse(localStorage.getItem("user-data"))
      userData.emailConfirmation = true
      localStorage.setItem("user-data", JSON.stringify(userData))
      onLogin(userData)
      history.push("/profile")
    }
  }, [])
}
```

This function will make a `POST` request to the server and will put the token in the request body.

On success, we will update the user data in the local storage and sets the `emailConfirmation` property to `true` and call the `onLogin` props function with the updated user data and finally redirect the user to the profile page.

We will use `useEffect` React hook to fire this function:

```js highlight=31-35 title=src/containers/EmailConfirmation/EmailConfirmation.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function EmailConfirmation({ onLogin }) {
  let { token } = useParams()
  let history = useHistory()

  const confirmEmail = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3030/users/emailConfirmation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      }
    )

    if (response.status === 200) {
      let userData = JSON.parse(localStorage.getItem("user-data"))
      userData.emailConfirmation = true
      localStorage.setItem("user-data", JSON.stringify(userData))
      onLogin(userData)
      history.push("/profile")
    }
  }, [])

  useEffect(() => {
    confirmEmail()
  }, [confirmEmail])

  return <div>Verifying...</div>
}
```
