---
title: Installation
date: "2020-03-22"
order: 3
---

Since Aventum simply consists of two parts server([Express server](https://expressjs.com/)) and dashboard([create-react-app](https://create-react-app.dev/)) there are many different ways to install Aventum, here we describe some of them.

## Aventum CLI

If you want to try Aventum and play with it you can install it quickly using [Aventum CLI](https://www.npmjs.com/package/@aventum/cli).
First, install the cli using `npm install @aventum/cli -g` then you can run `aventum create -r` in an empty folder to create and run Aventum app.

## Docker

Currently, you can use the Docker Compose template that we created to run Aventum using Docker quickly, you can install the Docker Compose template manually or automatically using [Aventum CLI](https://www.npmjs.com/package/@aventum/cli).

### Automatically Install Docker Compose template

First, install the CLI using `npm install @aventum/cli -g` then you can run `aventum create -d` in an empty folder to create Aventum's Docker Compose template.

### Manually Install Docker Compose template

1. Clone or download the template from [https://github.com/TryAventum/compose](https://github.com/TryAventum/compose) to a folder lets called it `ADD`.
2. Clone or download Aventum server [https://github.com/TryAventum/server](https://github.com/TryAventum/server)
3. Clone or download Aventum dashboard [https://github.com/TryAventum/dashboard](https://github.com/TryAventum/dashboard)
4. Copy the server files to `ADD/server` folder and the dashboard files to `ADD/dashboard`.
5. Now you can run `docker-compose -f docker-compose.postgres.yml up` in `ADD` folder to use PostgreSQL or run `docker-compose -f docker-compose.mongodb.yml up` to use MongoDB.

> For more info about the template please check [https://github.com/TryAventum/compose](https://github.com/TryAventum/compose)

## Manual Installation

1. Create a `server` folder and clone or download Aventum server https://github.com/TryAventum/server files to it.
2. Run `npm i` in the `server` folder.
3. Create a copy from either `server/pg.env` or `server/mongo.env` and name it `.env` and change the values to suits your needs.
4. Run `node .` in the `server` folder to run the server.
5. Create a `dashboard` folder and clone or download Aventum dashboard https://github.com/TryAventum/dashboard files to it.
6. Run `npm i` in the `dashboard` folder.
7. Create a copy from `dashboard/.env.production` with name `.env.production.local` and make sure that `REACT_APP_BASE_URL=http://localhost:3030/`
8. Run `npm run build` in the `dashboard` folder.
9. Run `npm install serve -g` to install `serve`.
10. Run `serve -s build` in the `dashboard` folder.
11. Navigate to [http://localhost:3333/setup](http://localhost:3333/setup) to create your superuser!
