const mongoose = require('mongoose');

const NutrientSchema = new mongoose.Schema({
  label: String,
  tag: String,
  schemaOrgTag: String,
  total: Number,
  hasRDI: Boolean,
  daily: Number,
  unit: String,
});

NutrientSchema.add({
  sub: { type: [NutrientSchema], required: false },
});

module.exports = NutrientSchema;
