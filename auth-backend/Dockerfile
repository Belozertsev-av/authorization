FROM node:23-alpine3.20

RUN corepack enable

RUN corepack prepare yarn@4.6.0 --activate

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]