---
title: Update
date: "2021-01-14"
order: 3.1
---

We try to make the update process if you just use Node.js or if you use DevOps, GitOps, Containers, and Kubernetes as automatic and easy as possible.

> Before doing any update please make sure you have a full backup.

## How To Update Aventum Server?

### Node.js

1. Shut down the server.
2. Run `git pull` or manually update the files by copy and paste the new files over the old ones and allow to overwrite.
3. Run `node .` Aventum will detect the update and try to update itself automatically!

### Docker & Kubernetes

Just change the image tag to new version.

## How To Update Aventum Dashboard?
