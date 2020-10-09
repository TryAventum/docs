---
title: Registration Page
date: "2020-05-02"
order: 60
---

## What You Will Learn Regarding Aventum?

- To register a new user make a `POST` request to `http://localhost:3030/users/register` with `firstName`, `lastName`, `email`, `password`, and `passwordConfirmation` fields and on the success you receive the user's data in the response body and the access token(`x-access-token`) in the response header.

---

Create `registration.html` file with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration</title>
            <link rel="stylesheet" href="lib/normalize.css">
            <link rel="stylesheet" href="styles.css">
        </head>

        <body>
            <form action="" method="get" id="login-form">
                <div class="field-wrapper">
                    <label for="firstName">First Name: </label>
                    <input type="text" name="firstName" id="firstName" required>
                </div>
                <div class="field-wrapper">
                    <label for="lastName">Last Name: </label>
                    <input type="text" name="lastName" id="lastName" required>
                </div>
                <div class="field-wrapper">
                    <label for="email">Enter your email: </label>
                    <input type="email" name="email" id="email" required>
                </div>
                <div class="field-wrapper">
                    <label for="password">Enter your password: </label>
                    <input type="password" name="password" id="password" required>
                </div>
                <div class="field-wrapper">
                    <label for="passwordConfirmation">Enter your password confirmation: </label>
                    <input type="password" name="passwordConfirmation" id="passwordConfirmation" required>
                </div>
                <div class="field-wrapper">
                    <input type="submit" value="Registration!">
                </div>
            </form>
            <script src="auth.js"></script>
            <script src="registration.js"></script>
            <script src="header.js"></script>
        </body>

        </html></title>
</head>
<body>

</body>
</html>
```

Our page will simply have a registration form.

Next, create a `registration.js` file with a self-invoking anonymous function and define a token variable inside it.

```js
;(async function() {
  let token
})()
```

Next, create the `registration` function which will simply make the registration process.

```js highlight=3-15
;(async function() {
  let token
  async function registration(data = {}) {
    const response = await fetch("http://localhost:3030/users/register", {
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

The `registration` function will make a `POST` request to Aventum's server with the user data (`firstName`, `lastName`, `email`, `password`, and `passwordConfirmation`) and on success, we get the user data in the response body and the access token(`x-access-token`) in the response header.

Next, add an event listener to the form submission, and on submit grab the data from the form and call the `registration` function to register the user. On success registration, we save the `x-access-token` and the `user-data` to the local storage and redirect the user to the home page.

```js highlight=17-44
;(async function() {
  let token
  async function registration(data = {}) {
    const response = await fetch("http://localhost:3030/users/register", {
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
    const firstName = event.currentTarget.querySelector("#firstName").value
    const lastName = event.currentTarget.querySelector("#lastName").value
    const email = event.currentTarget.querySelector("#email").value
    const password = event.currentTarget.querySelector("#password").value
    const passwordConfirmation = event.currentTarget.querySelector(
      "#passwordConfirmation"
    ).value

    const data = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
    }

    const userData = await registration(data)
    localStorage.setItem("x-access-token", token)
    localStorage.setItem("user-data", JSON.stringify(userData))

    window.location = window.location.pathname.replace(
      "registration.html",
      "index.html"
    )
  })
})()
```
