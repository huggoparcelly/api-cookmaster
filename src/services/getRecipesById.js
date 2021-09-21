const ModelRecipes = require('../models/recipes');

module.exports = async (id) => {
  // validação se receita existe
  const recipe = await ModelRecipes.getRecipesById(id);

  if (!recipe) return { code: 404, message: 'recipe not found' };

  return recipe;
};