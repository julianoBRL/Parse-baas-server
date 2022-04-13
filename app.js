const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { default: ParseServer, ParseGraphQLServer, LiveQueryServer } = require('parse-server');
const ParseDashboard = require("parse-dashboard");

const app = express();
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public", { maxAge: 31557600000 }));

const server_url = `http://${process.env.SERVER_HOST}:${process.env.PORT}`
const mongo_url = `mongodb://${process.env.MONGO_USERNAME }:${process.env.MONGO_PASSWORD }@${process.env.MONGO_HOST }`

var api = new ParseServer({
  databaseURI:mongo_url,
  cloud: process.env.CLOUD_CODE_MAIN,
  appId: process.env.APP_ID,
  restAPIKey: process.env.REST_API_KEY,
  javascriptKey: process.env.JS_KEY,
  serverURL: `${server_url}/parse`,
  masterKey: process.env.MASTER_KEY,
  clientKey: process.env.CLIENT_KEY,
  startLiveQueryServer: true,
  liveQuery: {
    classNames: ['Message']
  },
  push: {
    android: {
      apiKey: process.env.PUSH_ANDROID_KEY
    },
    ios: {
      pfx: process.env.PUSH_IOS_PFX,
      passphrase: process.env.PUSH_IOS_PASSPHRASE,
      bundleId: process.env.PUSH_IOS_BUNDLEID,
      production: process.env.PROD
    }
  }
});


var dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: `${server_url}/parse`,
        appId: process.env.APP_ID,
        masterKey: process.env.MASTER_KEY,
        appName: process.env.APP_NAME,
        graphQLServerURL: `${server_url}/graphql`
      }
    ],
    users: [
      {
        user: process.env.ADMIN_USERNAME,
        pass: process.env.ADMIN_PASSWORD
      }
    ]
  },
  { allowInsecureHTTP: true }
);


const parseGraphQLServer = new ParseGraphQLServer(
  api,
  {
    
    graphQLPath: '/graphql',
    playgroundPath: '/graphql-playground'
  }
);

parseGraphQLServer.applyGraphQL(app);

if(!process.env.PROD){
  parseGraphQLServer.applyPlayground(app);
}

app.use("/parse", api.app);
app.use("/dashboard", dashboard);

let httpServer = require('http').createServer(app);
httpServer.listen(process.env.PORT);

ParseServer.createLiveQueryServer(httpServer);

console.log("Prodction: "+process.env.PROD)
console.log('REST API running on http://localhost:'+process.env.PORT+'/parse');
console.log('Dashboard running on http://localhost:'+process.env.PORT+'/dashboard');
console.log('GraphQL API running on http://localhost:'+process.env.PORT+'/graphql');
if(!process.env.PROD){
  console.log('GraphQL Playground running on http://localhost:'+process.env.PORT+'/playground');
}

module.exports = app;
