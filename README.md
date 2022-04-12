# Parse-baas-server
Parse - backend as a service using nodejs

<hr>

### Default enabled
- Graphql
- Graphql-Playground (only prof=false)
- LiveQuery
- Cloud Jobs
- Cloud Functions
- Client Demo

<hr>

### Enviroments

| Variable | Default | Description |
|---|---|---|
|MONGO_USERNAME|''|Mongo username|
|MONGO_PASSWORD|''|Mongo password|
|MONGO_HOST|'localhost'| Mongo host |
|CLOUD_CODE_MAIN|''| Where the CloudCode will look for cloud functions/jobs |
|APP_ID|'parse'| App id(will appers on mongo) |
|REST_API_KEY|'restapikey'| Key for rest/crud functions |
|JS_KEY|'jskey'| Javascriptkey used on cloud functions, livequery and graphql |
|SERVER_HOST|'localhost'| Server host |
|MASTER_KEY|"masterkey"| Key for admin functions/jobs |
|APP_NAME|"parse-app"| App name |
|ADMIN_USERNAME|"admin"| Server admin username |
|ADMIN_PASSWORD|"admin"| Server admin password |
|PORT|1337| Server port |
|PROD|false| Production mode|

<hr>

### Build&Run

```
docker build -t baas-parse-server .
```


```
docker run --name=baas-parse-server -e CLOUD_CODE_MAIN='./cloud/main.js' -p 1337:1337 baas-parse-server
```

Storage docker folder: /usr/src/parse-server

<hr>

### URLs

LiveQuery running on [ws://localhost:1337](ws://localhost:1337) <br>
REST API running on http://localhost:1337/parse<br>
Dashboard running on http://localhost:1337/dashboard<br>
GraphQL API running on http://localhost:1337/graphql<br>
GraphQL Playground running on http://localhost:1337/playground<br>
