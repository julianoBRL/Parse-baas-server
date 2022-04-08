FROM node:latest
WORKDIR /usr/src/parse-server
COPY package*.json ./
COPY app.js ./
RUN npm install

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
