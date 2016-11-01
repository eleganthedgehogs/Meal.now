const express = require('express');
const recipeController = require('../../../db/controllers/recipeController.js');

const router = new express.Router();

router.route('/')
  .get(recipeController.findAllRecipes);

router.route('/:q')
  .get(recipeController.findRecipes);

router.route('/')
  .post(recipeController.addRecipe);

module.exports = router;
