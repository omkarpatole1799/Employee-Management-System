FROM node:20-alpine

WORKDIR /usr/src/web

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "start"]

FROM nginx:alpine
