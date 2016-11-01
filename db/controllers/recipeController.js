const Recipe = require('../models/recipeModel.js');
const keys = require('../../server/config/config.js');
const rp = require('request-promise');

const APIURL = 'https://api.edamam.com/search?q=';

module.exports = {
  /*
  fetch all meals from the third party api for a certain query and cache them
  */
  findRecipes: (req, res) => {
    const query = req.params.q;
    // What if url is not valid?
    Recipe.find({ q: query }).exec()
      .then((storedRecipes) => {
        if (storedRecipes.length === 0) {
          const queryString = `${APIURL}${query}&app_id=${keys.APP_ID}&app_key=${keys.APP_KEY}`;
          rp(queryString)
            .then((body) => {
              const newRecipes = JSON.parse(body).hits
                .map(recipeContainer => recipeContainer.recipe);

              newRecipes.forEach((recipe) => {
                const tempRecipe = recipe;
                tempRecipe.q = query;
              });

              Recipe.create(newRecipes)
                .then((recipes) => {
                  res.json(recipes);
                })
                .catch(() => {
                  res.status(404).end('Failed to store recipes to database');
                });
            })
            .catch(() => {
              res.status(404).end('Failed to get recipes from Edamam API');
            });
        } else {
          res.json(storedRecipes);
        }
      })
      .catch(() => {
        res.status(404).end('Failed to find recipes from database');
      });
  },

  findAllRecipes: (req, res) => {
    Recipe.find({}).exec()
      .then((storedRecipes) => {
        res.json(storedRecipes);
      })
      .catch(() => {
        res.status(404).end('Failed to find recipes from database');
      });
  },

  addRecipe: (req, res) => {
    const newRecipe = req.body;
    Recipe.create(newRecipe)
      .then((recipe) => {
        res.json(recipe);
      })
      .catch(() => {
        res.status(404).end('Failed to add recipe');
      });
    // what if recipe already exists?
  },
};
