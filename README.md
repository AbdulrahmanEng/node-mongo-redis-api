# Node CRUD API with MongoDB and Redis

A Node application with CRUD API on two servers using [forever](https://github.com/foreverjs) package. Uses [MongoDB](https://github.com/mongodb/mongo) for persistent storage and [Redis](https://github.com/antirez/redis) for caching the main server's requests for the staff endpoint. Avoids process blocking with the [async](https://github.com/caolan/async) package.

## Installation

```
$ npm install
```

```
$ forever start customer_server.js && forever start staff_server.js
```

The Mongo and Redis servers have to be running before the application starts.

```
$ node company_server.js
```