'use strict';
const mongoose = require('mongoose');

const mongoUser = 'mdotn';
const mongoPassword = 'mdotn';
const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@ds139277.mlab.com:39277/mdotn`;
const localURI = 'mongodb://localhost/mdotn';

//switch the URI based on local or hosted database
mongoose.connect(localURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongodb connection open'));

module.exports = db;
