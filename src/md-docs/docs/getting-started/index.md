---
title: Requirements & Configurations
date: "2020-03-22"
order: 1
---

## Requirements Summary

You need the following to get Aventum up and running:

> If you have Docker then you will not need any of the following, for more info please check the [Installation](./installation/) section!

1. [Node.js](https://nodejs.org/)(LTS version is recommended).
2. [PostgreSQL](https://www.postgresql.org/) or [MongoDB](https://www.mongodb.com/) or [MariaDB](https://mariadb.org/) or [MySQL](https://www.mysql.com/).
3. [Redis](https://redis.io/)

## Configurations Summary

1. Sample of server configurations available in `pg.env` and `mongo.env` files, simply create a copy from one of those files and name it `.env` and change the values to suit your need.
2. Dashboard configuration files are`.env.test`, `.env.development`, and `.env.production` depends on the environment, just create your copy from them and name them like `.env.test.local`, `.env.development.local` and `.env.production.local` and change the configurations as you want.

## Supported Databases

Aventum tested and support SQL based databases like PostgreSQL/MySQL/MariaDB and MongoDB.

Since Aventum uses [Knex.js](http://knexjs.org) under the hood as a query builder for the SQL based databases so it should work with other SQL based databases that [Knex.js](http://knexjs.org) supports like MSSQL, SQLite3, Oracle, and Amazon Redshift however we didn't test it yet with these databases(any contribution in this area will be more than welcome).

## Modularity

It is good to know that Aventum consists of two main parts server and dashboard, the server is an [Express](https://expressjs.com/) server and the dashboard is a react app bootstrapped with [create-react-app](https://create-react-app.dev/).

## The Server Configuration File(s)

We included two sample configuration files `pg.env` and `mongo.env`, you can choose any of these files and create a copy from it with a name like `.env`, Aventum server uses [dotenv-flow](https://www.npmjs.com/package/dotenv-flow) behind the scenes to parse these `.env` files.

You can set a configuration file per environment like `.env.development` and `.env.production`, here are what these environment variables mean:

- `DB_TYPE` the database type that you want to use e.g. `pg` (for PostgreSQL), `mysql` for MySQL and MariaDB, and `mongodb`.
- `DB_NAME` the database name.
- `DB_USER` the database user.
- `DB_PASSWORD` the database password.
- `DB_HOST` the database host.
- `DB_PORT` the database port.
- `PORT` the port that the server will run on.
- `REDIS_PORT` Redis port.
- `REDIS_HOST` Redis host.
- `REDIS_DB` Redis database.
- `REDIS_PASSWORD` Redis password.
- `REDIS_FAMILY` 4 (IPv4) or 6 (IPv6).
- `SHOW_ERRORS` NOT FULL USED AT THE MOMENT.

## Dashboard Configuration File

Aventum dashboard bootstrapped with [create-react-app](https://create-react-app.dev/) the file that picked depends on the environment, so there are three different files:

- .env.production
- .env.development
- .env.test

Create your copies from these files and name them like `.env.test.local`, `.env.development.local`, and `.env.production.local` and change the values in these files to suits your needs, each of these files contains `REACT_APP_BASE_URL` environment variable which you can use to set up the Aventum server URL and `PORT` environment variable which is the port that the dashboard will use in the development mode for example.
