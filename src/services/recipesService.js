const ModelRecipes = require('../models/recipes');

const createRecipe = async (body, authorId) => {
  const { name, ingredients, preparation } = body;
  const userId = authorId;
  
  return ModelRecipes.registerRecipe(name, ingredients, preparation, userId);
};

const getAllRecipes = async () => ModelRecipes.getRecipes();

const getRecipeById = async (id) => {
  const recipe = await ModelRecipes.getRecipesById(id);

  if (!recipe) return { code: 404, message: 'recipe not found' };

  return recipe;
};

const updateRecipe = async (body, params, authorId) => {
  const { id } = params;
  const userId = authorId;
  return ModelRecipes.updateRecipe(id, body, userId);
};

const addImg = async (id, path) => {
  const url = `localhost:3000/src/uploads/${path}`;
  return ModelRecipes.updateImg(id, url);
};

const removeRecipe = async (id) => {
  await ModelRecipes.deleteRecipe(id);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  addImg,
  removeRecipe,
};