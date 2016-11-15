'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Database connection
mongoose.connect('mongodb://localhost/staff', (err) => {
	if(err) throw err;
});

// Application host and port
const hostname = '0.0.0.0';
const port = 8081;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// staff route definitions
const staff = require('./routes/staff.js')(app);

app.listen(port, hostname, () => {
	console.log(`Listening at http://${hostname}:${port}...`);
});
