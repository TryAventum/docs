---
title: Introduction
date: "2020-05-08"
order: 70
---

> Please notice that this project for learning proposes only.

In this section, we will create a frontend web app for a blog using ReactJS with Create React App and React Router.

Please keep in mind that this tutorial is not meant to learn you anything about HTML / CSS / JavaScript / React / JSX etc., we will focus only on the code that is related to Aventum functionalities, you can get the full working app from [here](https://github.com/TryAventum/react-blog).

## react-frontend Folder

Inside the `blog` folder create a new folder and name it `react-frontend` this folder will be our app root folder.

## Create React App

To create a new react app using [Create React App](https://create-react-app.dev/) inside our `react-frontend` folder run:

```shell
npx create-react-app .
```

To start your app you can run:

```shell
npm start
```

Next create `components` and `containers` empty folders inside the `src` folder.

## index.css

Inside the `src` replace the content of the `index.css` file with the following:

```css title=src/index.css
/* General Styles
   ============================= */
body {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
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

## Install The Dependencies

Run the following to install our app `npm` dependencies:

```shell
npm install boolean normalize.css
```

## index.js

Add `import 'normalize.css';` at the begging of `src/index.js` file to add CSS reset to our app.

```js highlight=1 title=src/index.js
import "normalize.css"
import "./index.css"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
```
