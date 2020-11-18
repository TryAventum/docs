FROM node:13.14.0-buster-slim as develop
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD npm run develop:docker
