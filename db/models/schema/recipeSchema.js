const mongoose = require('mongoose');

const IngredientSchema = require('./ingredientSchema.js');

const NutrientSchema = require('./nutrientSchema.js');

const TotalNutrientSchema = require('./totalNutrientSchema.js');

const RecipeSchema = new mongoose.Schema({
  q: { type: String, required: true },
  uri: String,
  label: { type: String, required: true },
  image: String,
  source: String,
  sourceIcon: String,
  url: String,
  shareAs: String,
  yield: Number,
  dietLabels: [String],
  healthLabels: [String],
  cautions: [String],
  ingredientLines: [String],
  ingredients: { type: [IngredientSchema], required: true },
  calories: { type: Number, required: true },
  totalWeight: Number,
  totalNutrients: TotalNutrientSchema,
  totalDaily: TotalNutrientSchema,
  digest: [NutrientSchema],
});

module.exports = RecipeSchema;
