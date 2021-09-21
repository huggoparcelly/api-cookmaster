const createUsers = require('../controllers/createUser');
const login = require('../controllers/login');
const createRecipe = require('../controllers/createRecipe');
const getRecipes = require('../controllers/getRecipes');

module.exports = { 
  createUsers,
  login,
  createRecipe,
  getRecipes,
};