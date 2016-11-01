

# mealdotnext API documentation

## API endpoints
--------------------------------------------------------------

### Meals
#### Create a Meal
Method: POST
Path: /api/meal/
Input: JSON with properties userId and recipeId
Response: 200 and 'Meal saved'

#### Delete a Meal
Method: DELETE
Path: /api/meal/"mealId"
Input: mealId through the url
Response: 200 and 'Meal deleted'

#### Eat a Meal / change it to past Meals
Method: PUT
Path: /api/meal/"mealId"
Input: mealId through the url
Response: 200 and 'Meal eaten'

#### Update haveIngridients of Meal
Method: PUT
Path: /api/meal/
Input: JSON with property haveIngridient
Response: 200 and updated meal object

--------------------------------------------------------------

### User
#### Get User data with data of Meals
Method: GET
Path: /api/user/"userId"
Input: userId through the url
Response: 200 and user Object

#### Register User
Method: POST
Path: /api/user/
Input: JSON with property username and password
Response: 200 and Object with token, username and userId

#### Login User
Method: POST
Path: /api/user/authenticate
Input: JSON with property username and password
Response: 200 and Object with properties token, username and userId

--------------------------------------------------------------

### Recipes
#### Get all recipes
Method: GET
Path: /api/recipe/
Input: nothing
Response: 200 and array of all recipes in our database

#### Get recipes that match a certain query (search)
Method: GET
Path: /api/recipe/"query"
Input: query string for a certain dish
Response: 200 and array of all recipes for the query

#### Add a recipe
Method: POST
Path: /api/recipe/
Input: nothing
Response: 200 and the created recipe object

--------------------------------------------------------------