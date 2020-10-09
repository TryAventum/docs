---
title: Aventum API
date: "2020-03-22"
order: 201
---

> We can add hooks to allows you to do anything with Aventum, however, since Aventum is very young and we adding the hooks progressively if you want to customize a thing and you missed a hook or how to do it just let us know about it and we will more than happy to help you achieve what you want with your extension ASAP.

**It is not always about extendability but it is always about simple extendability**, you can change the behavior, style, and add/modify features and do whatever you want with Aventum using the extensions, you can build the extensions using the hooks(inspired by WordPress).

Extensions can be deployed on a git repository, npm, zip archive, or just the source code files.

The extension system of Aventum uses [@aventum/hooks](https://github.com/TryAventum/hooks) under the hood, you will have access to the `aventum` global object in your plugin which contains useful helpers and properties, the most important one is `aventum.hooks` which gives you access to the hooks system so you can `addFilter` & `addAction` and do whatever you want.

**One big difference between actions and filters is you have to return a value with the filters, but with the actions, you don't have to do so.**

## The Global Object "aventum"

We will explain some of the useful helpers & properties of the `aventum` global object.

### Server

- `aventum.hooks` hooks system.

- `aventum.db.type` gives you the currently used database type.

- `aventum.version` Aventum version.

- `aventum.dir` path to the Aventum server directory.

- `aventum.knex` the [knex](http://knexjs.org) instance that Aventum uses to talk to the SQL databases.

- `aventum.i18n` the `i18next` instance that Aventum uses from the `i18next` package.

- `aventum.cache` gives you access to the AventumCache instance([this file](https://github.com/TryAventum/server/blob/main/packages/cache/index.js)) which contains helpers methods that allow you to easily interact with Redis.

- `aventum.res` The [express](https://expressjs.com) `res` object of the current request.

- `aventum.req` The [express](https://expressjs.com) `req` object of the current request.

### Client

- `aventum.hooks` hooks system.

- `aventum.db.type` gives you the currently used database type.

- `aventum.version` Aventum version.

- `aventum.router` gives you access to `ReactRouterDom` from `react-router-dom`.

- `aventum.i18n` the `i18n` instance that Aventum uses from the `i18next` package.
