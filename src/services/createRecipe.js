const ModelRecipes = require('../models/recipes');

module.exports = async (body, authorId) => {
  const { name, ingredients, preparation } = body;
  const { _id: userid } = authorId;
  // capturar urlImagem através de outro ednpoint
  
  const recipe = await ModelRecipes.registerRecipe(name, ingredients, preparation, userid);

  return recipe;
};