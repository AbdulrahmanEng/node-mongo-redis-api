'use strict';

const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
	name: String,
	email: String,
	subscription: Boolean 
});

module.exports = mongoose.model('Customer', customerSchema);
