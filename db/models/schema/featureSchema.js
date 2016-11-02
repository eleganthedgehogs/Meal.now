const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
  name: String,
  nutritionalInfo: String,
  tags: [String],
  time: Date,
  url: String,
});

module.exports = FeatureSchema;
