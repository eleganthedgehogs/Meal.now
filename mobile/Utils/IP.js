// const IP_ADDRESS = 10.6.19.49;
const IP_ADDRESS = 'localhost';
const PORT = 8000;

/*********************   AddMeal.js   ***********************/
const localRecipeUrl = `http://${IP_ADDRESS}:${PORT}/api/recipe/`;
const localMealUrl = `http://${IP_ADDRESS}:${PORT}/api/meal/`

/*********************   Login.js   ***********************/
const localLoginUrl = `http://${IP_ADDRESS}:${PORT}/api/user/authenticate`;
const localSignupUrl = `http://${IP_ADDRESS}:${PORT}/api/user`;

/*********************   MealList.js   ***********************/
const localUserUrl = `http://${IP_ADDRESS}:${PORT}/api/user/`;
// const localMealUrl = `http://${IP_ADDRESS}:${PORT}/api/meal/`; // duplicate

/*********************   Utils.js   ***********************/
const postNewPhotoURL = `http://${IP_ADDRESS}:${PORT}/api/feature/upload`;
const postLocationURL = `http://${IP_ADDRESS}:${PORT}/api/feature/location`;

export default { localRecipeUrl, localMealUrl, localLoginUrl, localSignupUrl, localUserUrl, postNewPhotoURL, postLocationURL }