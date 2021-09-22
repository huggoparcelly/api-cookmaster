const registerUser = require('./createUser');
const login = require('./login');
const registerRecipe = require('./createRecipe');
const getRecipes = require('./getRecipes');
const getRecipesById = require('./getRecipesById');
const updateRecipe = require('./updateRecipe');
const deleteRecipe = require('./deleteRecipe');
const updateImg = require('./updateImg');
const getImg = require('./getImg');

module.exports = {
  registerUser,
  login,
  registerRecipe,
  getRecipes,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
  updateImg,
  getImg,
};