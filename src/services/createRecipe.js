const ModelRecipes = require('../models/recipes');

module.exports = async (body, authorId) => {
  const { name, ingredients, preparation } = body;
  const userId = authorId;
  
  return ModelRecipes.registerRecipe(name, ingredients, preparation, userId);
};