'use strict';

const http = require('http');
const express = require('express');
const _ = require('lodash');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Database connection
mongoose.connect('mongodb://localhost/customers', (err) => {
	if(err) throw err;
});

// Application host and port
const hostname = '0.0.0.0';
const port = 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Customer route definitions
const customers = require('./routes/customer.js')(app);

let server = app.listen(port, hostname, () => {
	console.log(`Listening at http://${hostname}:${port}...`);
});
