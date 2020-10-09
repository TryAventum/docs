---
title: Login Page
date: "2020-05-02"
order: 58
---

## What You Will Learn Regarding Aventum?

- Making a `POST` request to `http://localhost:3030/users/login` with the user's email and password returns the user object in the response body and the access token(`x-access-token`) in the response header.

---

The _Login_ page will simply contain a form with email and password fields.

Create `login.html` file with the following html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
    <link rel="stylesheet" href="lib/normalize.css" />
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <form action="" method="get" id="login-form">
      <div class="field-wrapper">
        <label for="email">Enter your email: </label>
        <input type="email" name="email" id="email" required />
      </div>
      <div class="field-wrapper">
        <label for="password">Enter your password: </label>
        <input type="password" name="password" id="password" required />
      </div>
      <div class="field-wrapper">
        <input type="submit" value="Login!" />
      </div>
    </form>
    <script src="auth.js"></script>
    <script src="login.js"></script>
    <script src="header.js"></script>
  </body>
</html>
```

Next, create a `login.js` file with a self-invoking anonymous function and define the `token` variable inside it.

```js
;(async function() {
  let token
})()
```

Next, define the `login` function which on calling it will simply make a `POST` request to `http://localhost:3030/users/login` with the email address and the password and will return the user data in the response body and the user token(`x-access-token`) in the header.

```js highlight=4-16
;(async function() {
  let token

  async function login(data = {}) {
    const response = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    token = response.headers.get("x-access-token")

    return response.json()
  }
})()
```

Finally, add an event listener on the form submit event so when the user submits the form we grab the email and the password and call the `login` function, after that, we save the token and the user data into the local storage and redirect the user to the _Home_ page.

```js highlight=18-37
;(async function() {
  let token

  async function login(data = {}) {
    const response = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    token = response.headers.get("x-access-token")

    return response.json()
  }

  const form = document.querySelector("form")
  form.addEventListener("submit", async event => {
    event.preventDefault()
    const email = event.currentTarget.querySelector("#email").value
    const password = event.currentTarget.querySelector("#password").value

    const data = {
      email,
      password,
    }

    const userData = await login(data)
    localStorage.setItem("x-access-token", token)
    localStorage.setItem("user-data", JSON.stringify(userData))

    window.location = window.location.pathname.replace(
      "login.html",
      "index.html"
    )
  })
})()
```
