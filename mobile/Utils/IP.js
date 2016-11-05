const IP_ADDRESS = '10.6.19.49';
// const IP_ADDRESS = 'localhost';
const PORT = 8000;

/*********************   AddMeal.js   ***********************/
const localRecipeUrl = `http://${IP_ADDRESS}:${PORT}/api/recipe/`;
const localMealUrl = `http://${IP_ADDRESS}:${PORT}/api/meal/`;

/*********************   Login.js   ***********************/
const localLoginUrl = `http://${IP_ADDRESS}:${PORT}/api/user/authenticate`;
const localSignupUrl = `http://${IP_ADDRESS}:${PORT}/api/user`;

/*********************   MealList.js   ***********************/
const localUserUrl = `http://${IP_ADDRESS}:${PORT}/api/user/`;
// const localMealUrl = `http://${IP_ADDRESS}:${PORT}/api/meal/`; // duplicate

/*********************   Utils.js   ***********************/
const postPhotoAndLocationURL = `http://${IP_ADDRESS}:${PORT}/api/feature/upload`;
const getRestaurantsURL = `http://${IP_ADDRESS}:${PORT}/api/feature/location`;
const getRestaurantMenuURL = `http://${IP_ADDRESS}:${PORT}/api/feature/menu`;
const getMenuItemURL = `http://${IP_ADDRESS}:${PORT}/api/feature/item`;

/*********************   PhotoList.js   ***********************/
const PhotoListURL = `http://${IP_ADDRESS}:${PORT}/api/feature/photos`;


export default { 
	PhotoListURL, 
	getMenuItemURL, 
	getRestaurantMenuURL, 
	localRecipeUrl, 
	localMealUrl, 
	localLoginUrl, 
	localSignupUrl, 
	localUserUrl, 
	postPhotoAndLocationURL, 
	getRestaurantsURL }