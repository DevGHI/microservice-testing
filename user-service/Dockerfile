ARG NODE_IMAGE=node:19.2-alpine

FROM $NODE_IMAGE AS base
RUN apk add --no-cache python3 g++ make
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
RUN npx prisma generate
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build --production

FROM base AS production
ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npx prisma generate
RUN npm ci --production
COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE 3333
CMD [ "dumb-init", "node", "server.js" ]
