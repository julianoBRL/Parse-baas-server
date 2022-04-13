FROM node:12-alpine AS BUILD_IMAGE

LABEL maintainer="juliano0forum@gmail.com"

WORKDIR /usr/src/parse-server
COPY app.js /usr/src/parse-server
COPY package*.json /usr/src/parse-server
COPY yarn.lock /usr/src/parse-server
COPY ./client /usr/src/parse-server/client
COPY ./cloud /usr/src/parse-server/cloud

RUN yarn install

FROM node:12-alpine

WORKDIR /usr/src/parse-server

VOLUME [ "/usr/src/parse-server" ]

COPY --from=BUILD_IMAGE /usr/src/parse-server ./

EXPOSE 1337

ENV MONGO_USERNAME=''
ENV MONGO_PASSWORD=''
ENV MONGO_HOST='localhost'

ENV CLOUD_CODE_MAIN=''

ENV SERVER_HOST='localhost'

ENV PORT=1337

ENV APP_ID='parse'
ENV APP_NAME="parse-app"

ENV ADMIN_USERNAME="admin"
ENV ADMIN_PASSWORD="admin"

ENV CLIENT_KEY="clientkey"
ENV REST_API_KEY='restapikey'
ENV MASTER_KEY="masterkey"
ENV JS_KEY='jskey'

ENV PUSH_ANDROID_KEY=''
ENV PUSH_IOS_PFX=''
ENV PUSH_IOS_PASSPHRASE=''
ENV PUSH_IOS_BUNDLEID=''

ENV PROD=false

CMD [ "node", "app.js" ]
