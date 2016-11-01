const Promise = require('bluebird');
const Recipe = require('../models/recipeModel.js');
const Meal = require('../models/mealModel.js');
const userController = require('./userController.js');

/*
Creates a Meal in the Meal Collection and also adds its id to the User's mealIds property
*/
exports.saveMeal = (req, res) => {
  Meal.create({
    userId: req.body.userId,
    recipeId: req.body.recipeId,
    haveIngredient: false,
  })
  .then((savedMeal) => {
    userController.addUserMeal(savedMeal.userId, savedMeal['_id'])
    .then((updatedUser) => {
      console.log('Updated User:', updatedUser);
      res.status(200).send('Meal saved');
    });
  })
  .catch((error) => {
    res.status(404).send(`userId or recipeId does not exist. Error is: ${error}`);
  });
};

/*
Deletes a Meal in the Meal Collection and also deltes its id in the User's mealIds property
*/
exports.deleteMeal = (req, res) => {
  Meal.findOneAndRemove({ _id: req.params.mealId })
  .then((deletedMeal) => {
    userController.deleteUserMeal(deletedMeal.userId, req.params.mealId)
    .then((updatedUser) => {
      console.log('delete updated User:', updatedUser);
      res.status(200).send('Meal deleted');
    });
  })
  .catch((error) => {
    res.status(404).send(`mealId does not exist @deleteMeal. Error is: ${error}`);
  });
};

/*
Moves the mealId from the User's mealIds property to the his pastMealIds property
*/
exports.eatMeal = (req, res) => {
  Meal.findOne({ _id: req.params.mealId })
  .then((eatenMeal) => {
    userController.eatUserMeal(eatenMeal.userId, req.params.mealId)
    .then((updatedUser) => {
      console.log('updated User eaten:', updatedUser);
      res.status(200).send('Meal eaten');
    });
  })
  .catch((error) => {
    res.status(404).send(`mealId does not exist @eatMeal. Error is: ${error}`);
  });
};

/*
Helper function to resolve a recipe id into the corresponding object
*/
exports.resolveRecipeIds = recipeId =>
  Recipe.findOne({ _id: recipeId })
  .exec()
  .then((recipeObj => recipeObj));

/*
Resolves each mealId of an array to its object with also resolving the recipeId of the meal
*/
exports.resolveMealIds = (mealIdArr) => {
  const mealObjs = mealIdArr.map(mealId => Meal.findOne({ _id: mealId })
  .exec()
  .then(mealObj => exports.resolveRecipeIds(mealObj.recipeId).then((recipeObj) => {
    mealObj.recipe = recipeObj;
    return mealObj;
  })));
  return Promise.all(mealObjs)
    .then(mealObjsArr => mealObjsArr);
};

/*
Updates the meal's haveIngredient property
*/
exports.updateMeal = (req, res) => {
  Meal.findByIdAndUpdate(req.body.mealId, { $set: { haveIngredient: req.body.haveIngredient } },
    { new: true }, (err, meal) => {
      if (err) {
        res.status(404).send(`Error at updating Meal. Error is: ${err}`);
      } else {
        console.log('Updated', meal);
        res.json(meal);
      }
    });
};
