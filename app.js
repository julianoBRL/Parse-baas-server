const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const ParseServer = require("parse-server").ParseServer;
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

var api = new ParseServer({
  databaseURI:`
    mongodb://
    ${process.env.MONGO_USERNAME }:
    ${process.env.MONGO_PASSWORD }@
    ${process.env.MONGO_HOST }
  `,
  cloud: process.env.CLOUD_CODE_MAIN,
  appId: process.env.APP_ID,
  restAPIKey: process.env.REST_API_KEY,
  javascriptKey: process.env.JS_KEY,
  serverURL: `${server_url}/parse`,
  masterKey: process.env.MASTER_KEY
});


var dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: `${server_url}/parse`,
        appId: process.env.APP_ID,
        masterKey: process.env.MASTER_KEY,
        appName: process.env.APP_NAME
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


app.use("/parse", api);
app.use("/dashboard", dashboard);

var httpServer = require("http").createServer(app);
httpServer.listen(process.env.PORT);

module.exports = app;