---
title: App.js
date: "2020-05-10"
order: 82
---

Our `App.js` file will mainly contain the routing logic.

**Clear the `src/App.js` file**, let's start by importing the required modules, put the following at the top of the `App.js` file.

```js title=src/App.js
import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Registration from "./containers/Registration/Registration"
import ResetPassword from "./containers/ResetPassword/ResetPassword"
import ProviderLogin from "./containers/ProviderLogin/ProviderLogin"
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword"
import EmailConfirmation from "./containers/EmailConfirmation/EmailConfirmation"
import Profile from "./containers/Profile/Profile"
import Post from "./containers/Post/Post"
import classes from "./App.module.css"
import useAuth from "./reactHooks/useAuth"
import useOptions from "./reactHooks/useOptions"
```

Next create our component function:

```js highlight=16 title=src/App.js
import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Registration from "./containers/Registration/Registration"
import ResetPassword from "./containers/ResetPassword/ResetPassword"
import ProviderLogin from "./containers/ProviderLogin/ProviderLogin"
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword"
import EmailConfirmation from "./containers/EmailConfirmation/EmailConfirmation"
import Profile from "./containers/Profile/Profile"
import Post from "./containers/Post/Post"
import classes from "./App.module.css"
import useAuth from "./reactHooks/useAuth"
import useOptions from "./reactHooks/useOptions"

export default function App() {}
```

Now let's destructure the `user`, `logout`, and `onLogin` from our [useAuth](../custom-react-hooks/#useauthjs) custom hook and grab the `options` from our [useOptions](../custom-react-hooks/#useoptionsjs) custom hook.

```js highlight=17,18 title=src/App.js
import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Registration from "./containers/Registration/Registration"
import ResetPassword from "./containers/ResetPassword/ResetPassword"
import ProviderLogin from "./containers/ProviderLogin/ProviderLogin"
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword"
import EmailConfirmation from "./containers/EmailConfirmation/EmailConfirmation"
import Profile from "./containers/Profile/Profile"
import Post from "./containers/Post/Post"
import classes from "./App.module.css"
import useAuth from "./reactHooks/useAuth"
import useOptions from "./reactHooks/useOptions"

export default function App() {
  let { user, logout, onLogin } = useAuth()
  const options = useOptions()
}
```

Next, define the `links` array that will hold the links that will be showing up to all users.

```js highlight=20-25 title=src/App.js
import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Registration from "./containers/Registration/Registration"
import ResetPassword from "./containers/ResetPassword/ResetPassword"
import ProviderLogin from "./containers/ProviderLogin/ProviderLogin"
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword"
import EmailConfirmation from "./containers/EmailConfirmation/EmailConfirmation"
import Profile from "./containers/Profile/Profile"
import Post from "./containers/Post/Post"
import classes from "./App.module.css"
import useAuth from "./reactHooks/useAuth"
import useOptions from "./reactHooks/useOptions"

export default function App() {
  let { user, logout, onLogin } = useAuth()
  const options = useOptions()

  let links = [
    {
      path: "/",
      label: "Home",
    },
  ]
}
```

Next, define the `logoutLinks` array that will contain the links that will be showing up to the not logged in users.

```js highlight=27-40 title=src/App.js
import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Registration from "./containers/Registration/Registration"
import ResetPassword from "./containers/ResetPassword/ResetPassword"
import ProviderLogin from "./containers/ProviderLogin/ProviderLogin"
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword"
import EmailConfirmation from "./containers/EmailConfirmation/EmailConfirmation"
import Profile from "./containers/Profile/Profile"
import Post from "./containers/Post/Post"
import classes from "./App.module.css"
import useAuth from "./reactHooks/useAuth"
import useOptions from "./reactHooks/useOptions"

export default function App() {
  let { user, logout, onLogin } = useAuth()
  const options = useOptions()

  let links = [
    {
      path: "/",
      label: "Home",
    },
  ]

  const logoutLinks = [
    {
      path: "/login",
      label: "Login",
    },
    {
      path: "/registration",
      label: "Registration",
    },
    {
      path: "/forgot-password",
      label: "Forget Password",
    },
  ]
}
```

Next define the `loginLinks` that will hold the links that will be showing up to the logged in users only:

```js highlight=42-55 title=src/App.js
import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Registration from "./containers/Registration/Registration"
import ResetPassword from "./containers/ResetPassword/ResetPassword"
import ProviderLogin from "./containers/ProviderLogin/ProviderLogin"
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword"
import EmailConfirmation from "./containers/EmailConfirmation/EmailConfirmation"
import Profile from "./containers/Profile/Profile"
import Post from "./containers/Post/Post"
import classes from "./App.module.css"
import useAuth from "./reactHooks/useAuth"
import useOptions from "./reactHooks/useOptions"

export default function App() {
  let { user, logout, onLogin } = useAuth()
  const options = useOptions()

  let links = [
    {
      path: "/",
      label: "Home",
    },
  ]

  const logoutLinks = [
    {
      path: "/login",
      label: "Login",
    },
    {
      path: "/registration",
      label: "Registration",
    },
    {
      path: "/forgot-password",
      label: "Forget Password",
    },
  ]

  const loginLinks = [
    {
      path: "/profile",
      label: "Profile",
    },
    {
      path: "/logout",
      label: "Logout",
      onClick: e => {
        e.preventDefault()
        logout()
      },
    },
  ]
}
```

Next, merge the links depending on if the user is logged in or not.

```js highlight=57-61 title=src/App.js
import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Registration from "./containers/Registration/Registration"
import ResetPassword from "./containers/ResetPassword/ResetPassword"
import ProviderLogin from "./containers/ProviderLogin/ProviderLogin"
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword"
import EmailConfirmation from "./containers/EmailConfirmation/EmailConfirmation"
import Profile from "./containers/Profile/Profile"
import Post from "./containers/Post/Post"
import classes from "./App.module.css"
import useAuth from "./reactHooks/useAuth"
import useOptions from "./reactHooks/useOptions"

export default function App() {
  let { user, logout, onLogin } = useAuth()
  const options = useOptions()

  let links = [
    {
      path: "/",
      label: "Home",
    },
  ]

  const logoutLinks = [
    {
      path: "/login",
      label: "Login",
    },
    {
      path: "/registration",
      label: "Registration",
    },
    {
      path: "/forgot-password",
      label: "Forget Password",
    },
  ]

  const loginLinks = [
    {
      path: "/profile",
      label: "Profile",
    },
    {
      path: "/logout",
      label: "Logout",
      onClick: e => {
        e.preventDefault()
        logout()
      },
    },
  ]

  if (user) {
    links = [...links, ...loginLinks]
  } else {
    links = [...links, ...logoutLinks]
  }
}
```

Finally render our app:

```js highlight=63-109 title=src/App.js
import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Registration from "./containers/Registration/Registration"
import ResetPassword from "./containers/ResetPassword/ResetPassword"
import ProviderLogin from "./containers/ProviderLogin/ProviderLogin"
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword"
import EmailConfirmation from "./containers/EmailConfirmation/EmailConfirmation"
import Profile from "./containers/Profile/Profile"
import Post from "./containers/Post/Post"
import classes from "./App.module.css"
import useAuth from "./reactHooks/useAuth"
import useOptions from "./reactHooks/useOptions"

export default function App() {
  let { user, logout, onLogin } = useAuth()
  const options = useOptions()

  let links = [
    {
      path: "/",
      label: "Home",
    },
  ]

  const logoutLinks = [
    {
      path: "/login",
      label: "Login",
    },
    {
      path: "/registration",
      label: "Registration",
    },
    {
      path: "/forgot-password",
      label: "Forget Password",
    },
  ]

  const loginLinks = [
    {
      path: "/profile",
      label: "Profile",
    },
    {
      path: "/logout",
      label: "Logout",
      onClick: e => {
        e.preventDefault()
        logout()
      },
    },
  ]

  if (user) {
    links = [...links, ...loginLinks]
  } else {
    links = [...links, ...logoutLinks]
  }

  return (
    <Router>
      <div>
        <nav className={classes.mainNav}>
          <ul>
            {links.map(l => (
              <li key={l.label} onClick={l.onClick}>
                <Link to={l.path}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <h1>The Awesome Blog</h1>

        <Switch>
          <Route path="/registration">
            <Registration user={user} onLogin={onLogin} />
          </Route>
          <Route path="/reset-password/:token">
            <ResetPassword />
          </Route>
          <Route path="/email-confirmation/:token">
            <EmailConfirmation onLogin={onLogin} />
          </Route>
          <Route path="/forgot-password">
            <ForgetPassword />
          </Route>
          <Route path="/profile">
            <Profile user={user} onLogin={onLogin} />
          </Route>
          <Route path="/login/:provider/:token">
            <ProviderLogin onLogin={onLogin} />
          </Route>
          <Route path="/login">
            <Login onLogin={onLogin} options={options} />
          </Route>
          <Route path="/post/:id">
            <Post user={user} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
```
