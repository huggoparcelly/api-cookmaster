const middlewares = require('../middlewares');
const { 
  createRecipe: registerRecipe,
  getAllRecipes,
  getRecipeById: recipeById,
  updateRecipe: upRecipe,
  addImg,
  removeRecipe,
 } = require('../services/recipesService');

const createRecipe = async (req, res, next) => {
  const { error } = middlewares.validateRecipe(req.body);
  if (error) return next(error);
  
  const recipe = await registerRecipe(req.body, req.user);

  return res.status(201).json({ recipe });
};

const getRecipes = async (req, res) => {
  const recipes = await getAllRecipes();
  
  return res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeById(id);
  
  if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });
  
  return res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
  const recipe = await upRecipe(req.body, req.params, req.user);

  return res.status(200).json({ ...recipe });
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const updateImg = await addImg(id, filename);

  return res.status(200).json({ ...updateImg });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await removeRecipe(id);
  return res.status(204).send();
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  addImage,
  deleteRecipe,
};