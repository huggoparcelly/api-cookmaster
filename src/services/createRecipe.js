const ModelRecipes = require('../models/recipes');

module.exports = async (body, userId) => {
  const { name, ingredients, preparation } = body;
  const { _id } = userId;
  // capturar urlImagem através de outro ednpoint
  
  const recipe = await ModelRecipes.registerRecipe(name, ingredients, preparation, _id);

  return recipe;
};