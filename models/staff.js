'use strict';

const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
	name: String,
	email: String,
	admin: Boolean 
});

module.exports = mongoose.model('Staff', staffSchema);
