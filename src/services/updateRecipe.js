const ModelRecipes = require('../models/recipes');

module.exports = async (body, params, authorId) => {
  const { id } = params;
  const userId = authorId;
  return ModelRecipes.updateRecipe(id, body, userId);
};