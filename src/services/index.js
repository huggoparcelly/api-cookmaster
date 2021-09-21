const registerUser = require('./createUser');
const login = require('./login');
const registerRecipe = require('./createRecipe');
const getRecipes = require('./getRecipes');
const getRecipesById = require('./getRecipesById');
const updateRecipe = require('./updateRecipe');

module.exports = {
  registerUser,
  login,
  registerRecipe,
  getRecipes,
  getRecipesById,
  updateRecipe,
};