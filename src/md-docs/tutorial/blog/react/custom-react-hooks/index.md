---
title: Custom React Hooks
date: "2020-05-10"
order: 81
---

## What You Will Learn Regarding Aventum?

- Making a `GET` request to `http://localhost:3030/users/me` and put the access token(`x-access-token`) in the request header will return the user's data.

- Making a `GET` request to `http://localhost:3030/options/public` will return the public options like the business name, the enabled provider logins, etc.

---

Inside the `src` folder create the `reactHooks` folder and inside this one create `useAuth.js` and `useOptions.js` files.

## useAuth.js

This hook will return an object with three properties `user`, `logout`, and `onLogin`.

- `user` is the current logged in user data.
- `logout` function when called will logout the current user.
- `onLogin` function when called with a new user data it will update the user data.

At the top of `useAuth.js` file import the required modules:

```js title=src/reactHooks/useAuth.js
import { useEffect, useState, useCallback } from "react"
```

Next create our custom hook function:

```js highlight=3 title=src/reactHooks/useAuth.js
import { useEffect, useState, useCallback } from "react"

export default () => {}
```

We will grab the user data from the local storage and we will need a state to manage the user data.

```js highlight=4-7 title=src/reactHooks/useAuth.js
import { useEffect, useState, useCallback } from "react"

export default () => {
  const localUserDate = localStorage.getItem("user-data")
  const [user, setUser] = useState(
    localUserDate ? JSON.parse(localUserDate) : null
  )
}
```

Next define our `logout`:

```js highlight=9-13 title=src/reactHooks/useAuth.js
import { useEffect, useState, useCallback } from "react"

export default () => {
  const localUserDate = localStorage.getItem("user-data")
  const [user, setUser] = useState(
    localUserDate ? JSON.parse(localUserDate) : null
  )

  function logout() {
    localStorage.removeItem("user-data")
    localStorage.removeItem("x-access-token")
    setUser(null)
  }
}
```

The `logout` function will remove the user data from the local storage and from the memory.

Next define the `onLogin` function:

```js highlight=15-17 title=src/reactHooks/useAuth.js
import { useEffect, useState, useCallback } from "react"

export default () => {
  const localUserDate = localStorage.getItem("user-data")
  const [user, setUser] = useState(
    localUserDate ? JSON.parse(localUserDate) : null
  )

  function logout() {
    localStorage.removeItem("user-data")
    localStorage.removeItem("x-access-token")
    setUser(null)
  }

  const onLogin = _userData => {
    setUser(_userData)
  }
}
```

The `onLogin` method will simply update the user data with a new one.

Now define the `getCurrentUser` function:

```js highlight=19-30 title=src/reactHooks/useAuth.js
import { useEffect, useState, useCallback } from "react"

export default () => {
  const localUserDate = localStorage.getItem("user-data")
  const [user, setUser] = useState(
    localUserDate ? JSON.parse(localUserDate) : null
  )

  function logout() {
    localStorage.removeItem("user-data")
    localStorage.removeItem("x-access-token")
    setUser(null)
  }

  const onLogin = _userData => {
    setUser(_userData)
  }

  //Fetch current user
  const getCurrentUser = useCallback(async _p => {
    const response = await fetch(`http://localhost:3030/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })
    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData))
    setUser(userData)
  }, [])
}
```

The `getCurrentUser` will make a `GET` request to `http://localhost:3030/users/me` endpoint with the user token in the request's header, the server will response with the latest version of the user data, then we store this data to the local storage and update our `user` state.

We will use the `useEffect` React hook to fire the `getCurrentUser` function if there is a user token (`x-access-token`) in the local storage otherwise we set the current user data to `null`.

```js highlight=32-38 title=src/reactHooks/useAuth.js
import { useEffect, useState, useCallback } from "react"

export default () => {
  const localUserDate = localStorage.getItem("user-data")
  const [user, setUser] = useState(
    localUserDate ? JSON.parse(localUserDate) : null
  )

  function logout() {
    localStorage.removeItem("user-data")
    localStorage.removeItem("x-access-token")
    setUser(null)
  }

  const onLogin = _userData => {
    setUser(_userData)
  }

  //Fetch current user
  const getCurrentUser = useCallback(async _p => {
    const response = await fetch(`http://localhost:3030/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })
    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData))
    setUser(userData)
  }, [])

  useEffect(() => {
    if (localStorage.getItem("x-access-token")) {
      getCurrentUser()
    } else {
      setUser(null)
    }
  }, [getCurrentUser])
}
```

Finally the most important thing, what this custom hook will return:

```js highlight=40 title=src/reactHooks/useAuth.js
import { useEffect, useState, useCallback } from "react"

export default () => {
  const localUserDate = localStorage.getItem("user-data")
  const [user, setUser] = useState(
    localUserDate ? JSON.parse(localUserDate) : null
  )

  function logout() {
    localStorage.removeItem("user-data")
    localStorage.removeItem("x-access-token")
    setUser(null)
  }

  const onLogin = _userData => {
    setUser(_userData)
  }

  //Fetch current user
  const getCurrentUser = useCallback(async _p => {
    const response = await fetch(`http://localhost:3030/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })
    let userData = await response.json()
    localStorage.setItem("user-data", JSON.stringify(userData))
    setUser(userData)
  }, [])

  useEffect(() => {
    if (localStorage.getItem("x-access-token")) {
      getCurrentUser()
    } else {
      setUser(null)
    }
  }, [getCurrentUser])

  return { user, logout, onLogin }
}
```

## useOptions.js

This custom hook will bring the public options(like the business name, the enabled provider logins, etc.) from the Aventum server.

At the top of `useOptions.js` file import the required modules:

```js title=src/reactHooks/useOptions.js
import { useState, useCallback, useEffect } from "react"
```

Next create our custom hook function:

```js highlight=3 title=src/reactHooks/useOptions.js
import { useState, useCallback, useEffect } from "react"

export default () => {}
```

We need a single state to store the options that we receive from the server.

```js highlight=4 title=src/reactHooks/useOptions.js
import { useState, useCallback, useEffect } from "react"

export default () => {
  const [options, setOptions] = useState()
}
```

Next create `getPublicOptions` function:

```js highlight=6-11 title=src/reactHooks/useOptions.js
import { useState, useCallback, useEffect } from "react"

export default () => {
  const [options, setOptions] = useState()

  //Fetch public options
  const getPublicOptions = useCallback(async () => {
    const response = await fetch(`http://localhost:3030/options/public`)
    let data = await response.json()
    setOptions(data.options)
  }, [])
}
```

Our `getPublicOptions` function will make a `GET` request to the server to grab the public options then it stores them in the `options` state.

We will fire `getPublicOptions` function inside the `useEffect` React hook.

```js highlight=13-15 title=src/reactHooks/useOptions.js
import { useState, useCallback, useEffect } from "react"

export default () => {
  const [options, setOptions] = useState()

  //Fetch public options
  const getPublicOptions = useCallback(async () => {
    const response = await fetch(`http://localhost:3030/options/public`)
    let data = await response.json()
    setOptions(data.options)
  }, [])

  useEffect(() => {
    getPublicOptions()
  }, [getPublicOptions])
}
```

Finally what our custom hook will return:

```js highlight=17 title=src/reactHooks/useOptions.js
import { useState, useCallback, useEffect } from "react"

export default () => {
  const [options, setOptions] = useState()

  //Fetch public options
  const getPublicOptions = useCallback(async () => {
    const response = await fetch(`http://localhost:3030/options/public`)
    let data = await response.json()
    setOptions(data.options)
  }, [])

  useEffect(() => {
    getPublicOptions()
  }, [getPublicOptions])

  return options
}
```
