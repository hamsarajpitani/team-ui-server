#base
FROM node:16-alpine

RUN mkdir -p /usr/shopkaro/server

WORKDIR /usr/shopkaro/server

COPY package*.json ./

RUN npm install

COPY ./ ./


EXPOSE 5000
CMD ["npm","start"]