'use strict';

const http = require('http');
const express = require('express');
const _ = require('lodash');
const app = express();
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Requires customers 
const customers = require('./customers.js')(app);

let server = app.listen(port, hostname, () => {
	console.log(`Listening at http://${hostname}:${port}...`);
});
