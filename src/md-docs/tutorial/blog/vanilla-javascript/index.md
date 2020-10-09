---
title: Introduction
date: "2020-03-22"
order: 55
---

> Please notice that this project for learning proposes only, it uses the latest JavaScript features, so before using it in production make sure to test the code with the browsers that you want to support or use a compiler like [Babel](https://babeljs.io).

In this section, we will create a frontend web app for a blog using HTML/JavaScript/CSS and without any framework or library.

Please keep in mind that this tutorial is not meant to learn you anything about HTML/CSS/JavaScript, we will focus only on the code that is related to Aventum functionalities, you can get the full working app from [here](https://github.com/TryAventum/vanilla-javascript-blog).

## What You Will Learn Regarding Aventum?

- Making a `GET` request to `http://localhost:3030/users/me` with `"Content-Type": "application/json"` and `"x-access-token": <userAccessToken>` headers will return the user data.

## frontend Folder

Inside the `blog` folder create a new folder and name it `frontend` this folder will be our app root folder.

## normalize.css

We will use [Normalize.css](https://necolas.github.io/normalize.css/) to add CSS resets to our app, please put the `normalize.css` file in a newly created folder called `lib`.

## styles.css

Create a `styles.css` file in the root of our frontend app folder(`blog/frontend` folder). The `styles.css` file will contain our app styles, since the main purpose of our app is to teach you how to work with Aventum we will use really simple styles, just enough styles to show you the feature that we are going to explain, so please don't expect amazing styles from our simple app, put the following code in `styles.css` file:

```css
/* General Styles
   ============================= */
body {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Header
   ============================= */
header {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

header ul {
  list-style: none;
  display: flex;
  justify-content: center;
}

header ul a {
  margin-right: 1rem;
}

/* Post List
   ============================= */
#post-list {
  list-style: none;
}

#post-list img {
  max-width: 600px !important;
}

#post-list li {
  margin-bottom: 2rem;
}

/* Pagination
   ============================= */
#pagination-wrapper {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 3rem;
}

#pagination-wrapper a {
  padding: 0.5rem;
  border: 2px solid #cecece;
  margin-right: 1rem;
  text-decoration: none;
  color: black;
}

#pagination-wrapper .active {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 3rem;
  background-color: lightgray;
}

/* Single post
   ============================= */
#post-wrapper img {
  max-width: 600px !important;
}

#comment-form {
  display: none;
}

/* Forms
   ============================= */
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

form .field-wrapper {
  margin-bottom: 2rem;
}
```

## auth.js

Create `auth.js` file inside our `frontend` folder, this file will be responsible to fetch the current user data on browser load and give it to any part of our app that needs it, also clean up the user data on logout.

In `auth.js` first define `currentUser` variable then create `getCurrentUser` function.

```js
var currentUser = undefined

async function getCurrentUser() {}
```

Create `getUser` function inside the `getCurrentUser` function this function will be responsible to fetch the user data using the user access token.

```js  highlight=4-22
var currentUser = undefined

async function getCurrentUser() {
  //Fetch current user data
  async function getUser() {
    try {
      const response = await fetch(`http://localhost:3030/users/me`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      })

      if (response.status === 200) {
        return response.json() // parses JSON response into native JavaScript objects
      }

      return null
    } catch (error) {
      return null
    }
  }
}
```

Next, we check if there is a user data already fetched and saved in the `currentUser` variable if so just return it, otherwise check if there are an `x-access-token` and `user-data` items saved into the local storage(they will be saved on login/registration) if so get a fresh user data from Aventum server using `getUser` function, the `getUser` function will make a `GET` request to `http://localhost:3030/users/me` and put the user token into the request header.

```js highlight=24-49
var currentUser = undefined

async function getCurrentUser() {
  //Fetch current user data
  async function getUser() {
    try {
      const response = await fetch(`http://localhost:3030/users/me`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      })

      if (response.status === 200) {
        return response.json() // parses JSON response into native JavaScript objects
      }

      return null
    } catch (error) {
      return null
    }
  }

  if (currentUser === undefined) {
    if (
      localStorage.getItem("x-access-token") &&
      localStorage.getItem("user-data")
    ) {
      const curUsr = await getUser()

      if (!curUsr) {
        localStorage.removeItem("user-data")
        localStorage.removeItem("x-access-token")
        currentUser = null

        return currentUser
      } else {
        currentUser = curUsr

        return currentUser
      }
    } else {
      currentUser = null

      return currentUser
    }
  }

  return currentUser
}
```

Finally, create a small `logTheUserOut` function which will clean everything on logout.

```js highlight=52-57
var currentUser = undefined

async function getCurrentUser() {
  //Fetch current user data
  async function getUser() {
    try {
      const response = await fetch(`http://localhost:3030/users/me`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      })

      if (response.status === 200) {
        return response.json() // parses JSON response into native JavaScript objects
      }

      return null
    } catch (error) {
      return null
    }
  }

  if (currentUser === undefined) {
    if (
      localStorage.getItem("x-access-token") &&
      localStorage.getItem("user-data")
    ) {
      const curUsr = await getUser()

      if (!curUsr) {
        localStorage.removeItem("user-data")
        localStorage.removeItem("x-access-token")
        currentUser = null

        return currentUser
      } else {
        currentUser = curUsr

        return currentUser
      }
    } else {
      currentUser = null

      return currentUser
    }
  }

  return currentUser
}

function logTheUserOut() {
  localStorage.removeItem("user-data")
  localStorage.removeItem("x-access-token")
  currentUser = null
  location.reload()
}
```

That's it! the above code is all that you want to add to the `auth.js` file.

## header.js

The `header.js` file works as the app main navigation menu, it will make sure to display the appropriate links depending on if the user is logged in or not.

Create a `header.js` file and create a self-invoking anonymous function inside it.

```js
;(async function() {})()
```

Create a `header` and `ul` HTML elements and put the `ul` inside the `header`

```js highlight=2-4
;(async function() {
  const header = document.createElement("header")
  const ul = document.createElement("ul")
  header.appendChild(ul)
})()
```

Now grab the current page because we need it to make the navigation process work.

```js highlight=6-7
;(async function() {
  const header = document.createElement("header")
  const ul = document.createElement("ul")
  header.appendChild(ul)

  const pathParts = window.location.pathname.split("/")
  const currentPage = pathParts[pathParts.length - 1]
})()
```

Next, create the function that will render the header on the page.

```js highlight=9-58
;(async function() {
  const header = document.createElement("header")
  const ul = document.createElement("ul")
  header.appendChild(ul)

  const pathParts = window.location.pathname.split("/")
  const currentPage = pathParts[pathParts.length - 1]

  const renderHeader = async () => {
    const currentUser = await getCurrentUser()

    ul.innerHTML = ""

    let routes = [
      {
        label: "Home",
        href: window.location.pathname.replace(currentPage, "index.html"),
      },
    ]

    if (currentUser) {
      routes.push({
        label: "Profile",
        href: window.location.pathname.replace(currentPage, "profile.html"),
      })
      routes.push({
        label: "Logout",
        id: "logout-btn",
        href: "#",
      })
    } else {
      routes.push({
        label: "Login",
        href: window.location.pathname.replace(currentPage, "login.html"),
      })
      routes.push({
        label: "Register",
        href: window.location.pathname.replace(
          currentPage,
          "registration.html"
        ),
      })
    }

    for (const route of routes) {
      const link = document.createElement("a")
      link.href = route.href
      if (route.id) {
        link.setAttribute("id", route.id)
      }
      const li = document.createElement("li")
      li.textContent = route.label
      link.appendChild(li)
      ul.appendChild(link)
    }
  }

  await renderHeader()
})()
```

The `renderHeader` function will first get the current user then will create a `routes` array and loop over it to generate `a` tag for each element of it.

The `Home` link will be visible to all users, the `Logout` and `Profile` links will be visible to logged-in users only and `Login` and `Register` links will be visible to not logged users.

Next, render the header that we just created on the page.

```js highlight=60
;(async function() {
  const header = document.createElement("header")
  const ul = document.createElement("ul")
  header.appendChild(ul)

  const pathParts = window.location.pathname.split("/")
  const currentPage = pathParts[pathParts.length - 1]

  const renderHeader = async () => {
    const currentUser = await getCurrentUser()

    ul.innerHTML = ""

    let routes = [
      {
        label: "Home",
        href: window.location.pathname.replace(currentPage, "index.html"),
      },
    ]

    if (currentUser) {
      routes.push({
        label: "Profile",
        href: window.location.pathname.replace(currentPage, "profile.html"),
      })
      routes.push({
        label: "Logout",
        id: "logout-btn",
        href: "#",
      })
    } else {
      routes.push({
        label: "Login",
        href: window.location.pathname.replace(currentPage, "login.html"),
      })
      routes.push({
        label: "Register",
        href: window.location.pathname.replace(
          currentPage,
          "registration.html"
        ),
      })
    }

    for (const route of routes) {
      const link = document.createElement("a")
      link.href = route.href
      if (route.id) {
        link.setAttribute("id", route.id)
      }
      const li = document.createElement("li")
      li.textContent = route.label
      link.appendChild(li)
      ul.appendChild(link)
    }
  }

  await renderHeader()

  document.body.insertBefore(header, document.body.firstChild)
})()
```

Finally, add an event listener on the `Logout` link to logout the user on clicking on it.

```js highlight=62-67
;(async function() {
  const header = document.createElement("header")
  const ul = document.createElement("ul")
  header.appendChild(ul)

  const pathParts = window.location.pathname.split("/")
  const currentPage = pathParts[pathParts.length - 1]

  const renderHeader = async () => {
    const currentUser = await getCurrentUser()

    ul.innerHTML = ""

    let routes = [
      {
        label: "Home",
        href: window.location.pathname.replace(currentPage, "index.html"),
      },
    ]

    if (currentUser) {
      routes.push({
        label: "Profile",
        href: window.location.pathname.replace(currentPage, "profile.html"),
      })
      routes.push({
        label: "Logout",
        id: "logout-btn",
        href: "#",
      })
    } else {
      routes.push({
        label: "Login",
        href: window.location.pathname.replace(currentPage, "login.html"),
      })
      routes.push({
        label: "Register",
        href: window.location.pathname.replace(
          currentPage,
          "registration.html"
        ),
      })
    }

    for (const route of routes) {
      const link = document.createElement("a")
      link.href = route.href
      if (route.id) {
        link.setAttribute("id", route.id)
      }
      const li = document.createElement("li")
      li.textContent = route.label
      link.appendChild(li)
      ul.appendChild(link)
    }
  }

  await renderHeader()

  document.body.insertBefore(header, document.body.firstChild)

  if (document.querySelector("#logout-btn")) {
    document.querySelector("#logout-btn").addEventListener("click", event => {
      event.preventDefault()
      logTheUserOut()
    })
  }
})()
```

Our folder structure now should look like:

```
.
├── lib
│   └── normalize.css
├── auth.js
├── header.js
├── styles.css
```
