---
title: Misc
date: "2020-04-12"
order: 101
---

Aventum is a headless CMS so it is completely agnostic about your frontend(s), you can use Aventum with any kind and any number of frameworks or applications or games or anything else!

In this section we will cover how you could authenticate and authorize your users in your frontend application and how to create/get/update/delete contents from your frontend application.

> For step by step instructions you may be interested in the [Tutorial](../../tutorial/)

> The default aventum-server-url is `localhost:3030`.
> The default aventum-frontend-url is `localhost:3333`.

## Authentication

Aventum uses JSON Web Token to authenticate the users.

### Login

You can log in a user by making a `POST` request to `http://aventum-server-url/users/login` with the user's email and password in the request body, you will receive the user object in the response body and the access token (`x-access-token`) in the response header.

```js
const response = await fetch("http://aventum-server-url/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "me@example.com",
    password: "MyStrongPassword",
  }),
})
```

### Registration

Making a `POST` request to `http://aventum-server-url/users/register` with a user's fields like `firstName`, `lastName`, `email`, `picture`, `password`, and `passwordConfirmation` will register a new user and we will get the access token(`x-access-token`) in the response header and the user's data in the response body.

```js
const response = await fetch("http://aventum-server-url/users/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    firstName: "John",
    lastName: "Doe",
    email: "me@example.com",
    password: "MyStrongPassword",
    passwordConfirmation: "MyStrongPassword",
  }),
})
```

### Get Currently Logged In User Data

To get the user data using the user token `x-access-token` that you saved to the local storage for example you can make a `GET` request to `http://aventum-server-url/users/me` and put the access token(`x-access-token`) in the request header, the user data will be returned in the request body.

```js
const response = await fetch(`http://aventum-server-url/users/me`, {
  headers: {
    "Content-Type": "application/json",
    "x-access-token": "x-access-token",
  },
})
```

### Forget Password

> For the email functionality to work don't forget to set the SMTP settings, to do so go to the dashboard then to Options => Email Options.

Making a `POST` request to `http://aventum-server-url/users/forgotPassword` and put the user's email address in the request body as `email` field will send an email to the user with a link that will allow the user to reset her/his password.

```js
const response = await fetch("http://aventum-server-url/users/forgotPassword", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "me@example.com",
  }),
})
```

### Reset Password

When the user clicks on the [forget password](./#forget-password) link inside the email the user will be landed on `http://aventum-frontend-url/reset-password/:token`

Making a `POST` request to `http://aventum-server-url/users/resetPassword` with the user's `password` and `passwordConfirmation` fields in the request body and the access token that extracted from the URL of the [forget password](./#forget-password) link in the request header as `x-access-token` will reset the user's password.

```js
const response = await fetch("http://aventum-server-url/users/resetPassword", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-access-token": "Token that extracted from the URL",
  },
  body: JSON.stringify({
    password: "MyStrongPassword",
    passwordConfirmation: "MyStrongPassword",
  }),
})
```

### Profile

Making a `PATCH` request to `http://aventum-server-url/users/profile` with the user's fields like `firstName`, `lastName`, `email`, `picture`, `password`, and `passwordConfirmation` and putting the access token (`x-access-token`) in the request header will update the user's data and will return the updated user object in the response body.

```js
const response = await fetch("http://aventum-server-url/users/profile", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "x-access-token": "x-access-token",
  },
  body: JSON.stringify({
    firstName: "John",
    lastName: "Doe",
    email: "me@example.com",
    picture: "http://url/to/profile/picture",
    password: "MyStrongPassword",
    passwordConfirmation: "MyStrongPassword",
  }),
})
```

### Provider Login

> For the provider login functionality to work don't forget to set the options from the dashboard, you can find them in Options => Login Providers.

You can add login with Facebook and login with Google to your login form, to do so just add anchor tags in your login form like:

```html
<a href="http://aventum-server-url/users/auth/facebook">Login with Facebook</a>
<a href="http://aventum-server-url/users/auth/google">Login with Google</a>
```

When the user chose to log in using a provider like Google or Facebook and after the user allowing our blog to access his/her public data on the provider the user will be redirected to `http://aventum-frontend-url/login/:provider/:token` then if you made a `POST` request to `http://aventum-server-url/users/login/${provider}/provider` and put the token that extracted from the URL into the request body as `token` will log the user in using that provider.

```js
const response = await fetch(
  `http://aventum-server-url/users/login/${provider}/provider`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": "Token that extracted from the URL",
    },
  }
)
```

You will receive the user object in the response body and the access token (`x-access-token`) in the response header.

### Email Confirmation

To resend the confirmation email make a `POST` request to `http://aventum-server-url/users/resendConfirmationEmail` and put the user's token into the request header as `x-access-token`.

```js
const response = await fetch(
  "http://aventum-server-url/users/resendConfirmationEmail",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": "x-access-token",
    },
  }
)
```

On registration or when the user requests to resend the confirmation email the user will receive an email with a link like `http://aventum-frontend-url/email-confirmation/:token`, making a `POST` request to `http://aventum-server-url/users/emailConfirmation` and put the token that extracted from the URL into the request body as `token` will confirm the user's email address.

```js
const response = await fetch(
  `http://aventum-server-url/users/emailConfirmation`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: "Token that extracted from the URL",
    }),
  }
)
```

### Email Confirmation Status

You see the email confirmation status for the user by checking the `emailConfirmation` property of the user object that you receive from the server on logged in for example.

## Authorization

> You may be interested in [acl.js](https://github.com/TryAventum/dashboard/blob/main/src/shared/acl.js) file.

Aventum uses roles and capabilities to authorize the users, form the server-side or the dashboard you don't have to do anything, Aventum by default authorizes the users wherever required.

If you want to authorize the users from your frontend app then this section for you.

The user object that you receive on login, register, etc. and even when you [request the user data](./#get-currently-logged-in-user-data) will contain `roles` and `capabilities` arrays contains the user's roles and capabilities.

Aventum authorization depends on capabilities, so in order to check if the user is capable to do a specific action, we check if the user has a certain capability/capabilities, the total user capabilities is equal to the summation of the user capabilities plus all the capacities of the roles that the user has.

For example, if the user only has the `administrator` role with no capability in the capabilities array then the user has all the capabilities of the `administrator` role, another example if the user has some capabilities in the capabilities array with `author` and `editor` roles then the user will have all the capabilities of the `editor` and `author` roles plus the capabilities of the capabilities array.

To get all the capabilities make a get request to `http://aventum-server-url/capabilities/all` and to get all the roles you can make a get request to `http://aventum-server-url/roles/all`.

If you want to check if the user is capable to make create, read, update, and delete operations on some content you must get the schema of that content and check the `acl` property of that schema.

To get all the schemas you can make a get request to `http://aventum-server-url/schemas/all`.

## Uploads

To get all uploads we can make a `GET` request to `http://aventum-server-url/uploads/all` and in order to avoid grabbing all the uploads you can specify what is the specifications of the uploads that you want by adding a query object to the URL like `http://aventum-server-url/uploads/all?query=${encodeURIComponent( JSON.stringify(query) )}`. You can learn more about this query object [here](../deep-dive/query/).

```js
let query = { whereIn: { column: "id", values: [11, 65, 8] } }

const response = await fetch(
  `http://aventum-server-url/uploads/all?query=${encodeURIComponent(
    JSON.stringify(query)
  )}`
)
let data = await response.json()

const uploads = data.uploads
```

To fetch a single upload make a `GET` request to `http://aventum-server-url/uploads/:uploadId`

```js
const response = await fetch(`http://aventum-server-url/uploads/9545`)

let upload = await response.json()
```

To get a paginated uploads make a `GET` request to `http://aventum-server-url/uploads?page=2&query=${encodeURIComponent( JSON.stringify(query) )}`

To delete upload make a `DELETE` request to `http://aventum-server-url/uploads/:uploadId` with `x-access-token` in the request header, the user must have `deleteUpload` permission in order to be able to delete upload, and if the upload was not uploaded by the user then the user must have `deleteOthersUpload` capability as well.

To upload a file the user must have `createUpload` capability then the user can make a `POST` request to `http://aventum-server-url/uploads` with `x-access-token` in the request header.

## Contents

When you create a schema the following routes automatically become available for your content:

### READ

- To fetch any content page/list from the Aventum server we make a `GET` request to `http://aventum-server-url/:schemaPluralName?page=:pageNumber&query=:query` with the access token(`x-access-token`) in the header of the request if the authentication/authorization is required in the `READ` section of the _Access Control List_ of your schema.

- To fetch all the content items from the Aventum server we make a `GET` request to `http://aventum-server-url/:schemaPluralName/all?query=:query` with the access token(`x-access-token`) in the header of the request if the authentication/authorization is required in the `READ` section of the _Access Control List_ of your schema.

- To fetch a single content item from the server make a `GET` request to `http://aventum-server-url/:schemaPluralName/:itemId` with the access token(`x-access-token`) in the header of the request if the authentication/authorization is required in the `READ` section of the _Access Control List_ of your schema.

### CREATE

- Create content by making a `POST` request to `http://aventum-server-url/:schemaPluralName?page=:pageNumber&query=:query` with the schema fields in the body of the request and the access token(`x-access-token`) in the header of the request if the authentication/authorization is required in the `CREATE` section of the _Access Control List_ of your schema.

### UPDATE

- To update a content item make a `PATCH` request to `http://aventum-server-url/:schemaPluralName/:itemId` with the schema fields in the body of the request and the access token(`x-access-token`) in the header of the request if the authentication/authorization is required in the `UPDATE` section of the _Access Control List_ of your schema.

### DELETE

- To delete a content item make a `DELETE` request to `http://aventum-server-url/:schemaPluralName/:itemId` with the access token(`x-access-token`) in the header of the request if the authentication/authorization is required in the `DELETE` section of the _Access Control List_ of your schema.
