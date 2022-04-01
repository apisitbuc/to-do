FROM node:12.14.0-alpine as builder
RUN apk update && apk add --no-cache --virtual .gyp python make g++ bash libc6-compat git
WORKDIR /var/source
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12.14.0-alpine
WORKDIR /var/source
COPY --from=builder /var/source/node_modules node_modules
COPY --from=builder /var/source/build build
COPY --from=builder /var/source/package.json .
EXPOSE 80
CMD [ "npm", "run", "start" ]
