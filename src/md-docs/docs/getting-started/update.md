---
title: Update
date: "2021-01-14"
order: 3.1
---

We try to make the update process if you just use Node.js or if you use DevOps, GitOps, Containers, and Kubernetes as automatic and easy as possible.

> Before doing any update please make sure you have a full backup.

## How To Update Aventum Server?

> Even Aventum Server is capable to do automatic updates however we encourage you to take a look at the [CHANGELOG](https://github.com/TryAventum/server/blob/main/CHANGELOG.md) before updating and search for _Breaking Change_.

### Node.js

1. Shut down the server.
2. Run `git pull` or manually update the files by copy and paste the new files over the old ones and allow to overwrite.
3. Run `npm install`
4. Run `node .` Aventum will detect the update and try to update itself automatically!

### Docker & Kubernetes

Just change the image tag to new version.

## How To Update Aventum Dashboard?

### Node.js

1. Run `git pull` or manually update the files by copy and paste the new files over the old ones and allow to overwrite.
2. Run `npm install`.
3. Run `npm run build`.
4. Now you have the new static files in the `build` folder you can serve them by whatever method you want.

### Docker & Kubernetes

Just change the image tag to new version.
