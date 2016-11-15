'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Application host and port
const hostname = '0.0.0.0';
const port = 8082;

// Customer route definitions
const company = require('./routes/company.js')(app);

app.listen(port, hostname, () => {
	console.log(`Listening at http://${hostname}:${port}...`);
});