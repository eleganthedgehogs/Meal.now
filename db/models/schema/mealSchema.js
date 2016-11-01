const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const RecipeSchema = require('./recipeSchema.js');


const MealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'recipe' },
  recipe: RecipeSchema,
  haveIngredient: Boolean,
}, { timestamps: true });

module.exports = MealSchema;
