---
title: Provider Login
date: "2020-05-10"
order: 76
---

When the user chose to log in using a provider like Google or Facebook and after the user allowing our blog to access his/her public data on the provider the user will be redirected to this page.

## What You Will Learn Regarding Aventum?

- Making a `POST` request to `http://localhost:3030/users/login/${provider}/provider` and put the token that extracted from the URL into the request body as `token` will log the user in using that provider.

---

Inside the `containers` folder create the `ProviderLogin` folder and inside this one create the `ProviderLogin.js` file.

At the top of `ProviderLogin.js` file import the required modules:

```js title=src/containers/ProviderLogin/ProviderLogin.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
```

Next define our main component function:

```js highlight=4 title=src/containers/ProviderLogin/ProviderLogin.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function ProviderLogin({ onLogin }) {}
```

Next, we need to extract the `provider` and the `token` params from the URL:

> The provider is a string like for example `facebook`

```js highlight=5 title=src/containers/ProviderLogin/ProviderLogin.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function ProviderLogin({ onLogin }) {
  let { token, provider } = useParams()
}
```

We also need the `history` to redirect the user to the frontend on success:

```js highlight=6 title=src/containers/ProviderLogin/ProviderLogin.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function ProviderLogin({ onLogin }) {
  let { token, provider } = useParams()
  let history = useHistory()
}
```

Next define our `loginWithProvider` function:

```js highlight=8-30 title=src/containers/ProviderLogin/ProviderLogin.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function ProviderLogin({ onLogin }) {
  let { token, provider } = useParams()
  let history = useHistory()

  //Fetch public options
  const loginWithProvider = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3030/users/login/${provider}/provider`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    )

    localStorage.setItem(
      "x-access-token",
      response.headers.get("x-access-token")
    )

    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData))
    onLogin(userData)
    history.push("/")
  }, [])
}
```

The `loginWithProvider` function will make a `POST` request to `http://localhost:3030/users/login/${provider}/provider` and will put the token in the header as `x-access-token`, on the success we receive the user authentication token(`x-access-token`) in the response header so we save it to `x-access-token` local storage item and the user's data in the response body and we save them to `user-data` local storage item as well, finally we call `onLogin` props function and passing the user's data to it then we redirect the user to the home page.

We will call `loginWithProvider` inside `useEffect` React hook:

```js highlight=32-36 title=src/containers/ProviderLogin/ProviderLogin.js
import React, { useCallback, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function ProviderLogin({ onLogin }) {
  let { token, provider } = useParams()
  let history = useHistory()

  //Fetch public options
  const loginWithProvider = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3030/users/login/${provider}/provider`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    )

    localStorage.setItem(
      "x-access-token",
      response.headers.get("x-access-token")
    )

    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData))
    onLogin(userData)
    history.push("/")
  }, [])

  useEffect(() => {
    loginWithProvider()
  }, [loginWithProvider])

  return <div>Logging in...</div>
}
```
