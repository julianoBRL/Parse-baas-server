FROM node:12-alpine AS BUILD_IMAGE

LABEL maintainer="juliano0forum@gmail.com"

# couchbase sdk requirements
# RUN apk update && apk add python make g++ && rm -rf /var/cache/apk/*

WORKDIR /usr/src/parse-server/build
COPY package*.json ./
COPY app.js ./

RUN npm install

FROM node:12-alpine

WORKDIR /usr/src/parse-server

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/parse-server/build ./

EXPOSE 1337

ENV MONGO_USERNAME=''
ENV MONGO_PASSWORD=''
ENV MONGO_HOST='localhost'
ENV CLOUD_CODE_MAIN=''
ENV APP_ID='parse'
ENV REST_API_KEY='restapikey'
ENV JS_KEY='jskey'
ENV SERVER_HOST='localhost'
ENV MASTER_KEY="masterkey"
ENV APP_NAME="parse-app"
ENV ADMIN_USERNAME="admin"
ENV ADMIN_PASSWORD="admin"
ENV PORT=1337

CMD [ "node", "app.js" ]
