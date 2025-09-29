FROM node:20 AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:20
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=build /app/.next ./.next

EXPOSE 3000
CMD ["yarn","start"]
