# Aventum Website

This is the source code for aventum.org website, it is a Gatsby application.

To run this application using docker on Windows PowerShell you can run:

```shell
docker build -t aventum-gatsby .

docker run -it -p 8000:8000 -v /app/node_modules -v ${pwd}:/app -e CHOKIDAR_USEPOLLING=true aventum-gatsby
```
