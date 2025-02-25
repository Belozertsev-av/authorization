FROM node:22.13.1

RUN corepack enable

RUN corepack prepare yarn@4.6.0 --activate

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]