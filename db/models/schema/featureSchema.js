const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
  name: String,
  restaurantName: String,
  tags: [String],
  date: Date,
  uri: String,
  nutritionalInfo: String
});

module.exports = FeatureSchema;
