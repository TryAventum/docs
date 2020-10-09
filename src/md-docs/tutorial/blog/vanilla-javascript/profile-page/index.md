---
title: Profile Page
date: "2020-05-02"
order: 61
---

## What You Will Learn Regarding Aventum?

- To update the user's profile make a `PATCH` request to `http://localhost:3030/users/profile` with the user's data `firstName`, `lastName`, `email`, `password`, and `passwordConfirmation` and you will receive the updated user data on success.

---

Create `profile.html` with the following content:

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
            <title>Profile</title>
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
                    <label for="password">Enter new password: </label>
                    <input type="password" name="password" id="password">
                </div>
                <div class="field-wrapper">
                    <label for="passwordConfirmation">Repeat your new password: </label>
                    <input type="password" name="passwordConfirmation" id="passwordConfirmation">
                </div>
                <div class="field-wrapper">
                    <input type="submit" value="Update Profile!">
                </div>
            </form>
            <script src="auth.js"></script>
            <script src="profile.js"></script>
            <script src="header.js"></script>
        </body>

        </html></title>
</head>
<body>

</body>
</html>
```

Our profile page will simply contain a form to update the user data.

Next, create a `profile.js` file with a self-invoking anonymous function.

```js
;(async function() {})()
```

First, we grab the user data from the local storage to populate the form fields with current user data.

```js highlight=2
;(async function() {
  let currentUser = JSON.parse(localStorage.getItem("user-data"))
})()
```

Next, create the `profile` function which when called with new user data it updates the user data on the server.

```js highlight=3-14
;(async function() {
  let currentUser = JSON.parse(localStorage.getItem("user-data"))
  async function profile(data = {}) {
    const response = await fetch("http://localhost:3030/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }
})()
```

Next, add an event listener on form submit, and on submit grab the form data and call the `profile` function to update the user data. On success save the new user data to the local storage(`user-data` item) and redirect the user to the home page.

```js highlight=16-46
;(async function() {
  let currentUser = JSON.parse(localStorage.getItem("user-data"))
  async function profile(data = {}) {
    const response = await fetch("http://localhost:3030/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  const form = document.querySelector("form")
  document.querySelector("#firstName").value = currentUser.firstName
  document.querySelector("#lastName").value = currentUser.lastName
  document.querySelector("#email").value = currentUser.email
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

    const userData = await profile(data)

    localStorage.setItem("user-data", JSON.stringify(userData.user))

    window.location = window.location.pathname.replace(
      "profile.html",
      "index.html"
    )
  })
})()
```
