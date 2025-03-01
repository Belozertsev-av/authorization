FROM node:23-alpine3.20

RUN corepack enable && corepack prepare yarn@4.6.0 --activate

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]