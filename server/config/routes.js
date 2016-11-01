const recipeRouter = require('./routers/recipe.js');
const userRouter = require('./routers/user.js');
const mealRouter = require('./routers/meal.js');
const isAuthenticated = require('./auth.js');

module.exports = (app) => {
  app.use('/api/recipe', isAuthenticated, recipeRouter);
  app.use('/api/user', userRouter);
  app.use('/api/meal', isAuthenticated, mealRouter);
};
