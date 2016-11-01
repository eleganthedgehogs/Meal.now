const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const MealSchema = require('./schema/mealSchema.js');

module.exports = mongoose.model('meal', MealSchema);
