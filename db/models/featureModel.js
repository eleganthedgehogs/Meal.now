const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const FeatureSchema = require('./schema/featureSchema.js');

module.exports = mongoose.model('feature', FeatureSchema);
