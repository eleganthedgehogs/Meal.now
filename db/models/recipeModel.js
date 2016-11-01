const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const RecipeSchema = require('./schema/recipeSchema.js');

module.exports = mongoose.model('recipe', RecipeSchema);
