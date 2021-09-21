const ModelRecipes = require('../models/recipes');

module.exports = async (id) => {
  await ModelRecipes.deleteRecipe(id);
};