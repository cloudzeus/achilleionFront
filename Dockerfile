FROM node:20-alpine

RUN apk add --no-cache --virtual .build-deps curl \
  && curl -f https://get.pnpm.io/v6.js | node - add --global pnpm \
  && apk del .build-deps

WORKDIR /home/node/app
COPY pnpm-lock.yaml ./
COPY package*.json ./

COPY . .
RUN npm install

RUN npm build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npx", "next", "start"]
