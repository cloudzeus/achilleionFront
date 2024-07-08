FROM node:20-alpine

RUN apk add --no-cache --virtual .build-deps curl \
  && apk del .build-deps

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN npm install

RUN npm build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npx", "next", "start"]
