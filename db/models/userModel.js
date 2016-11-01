const mongoose = require('mongoose');

const UserSchema = require('./schema/userSchema.js');

module.exports = mongoose.model('user', UserSchema);
