const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerRecipe = async (name, ingredients, preparation, _id) => {
  // falta url da imagem
  const db = await connect();
  const recipeCreated = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, _id });
  return recipeCreated.ops[0];
};

const getRecipes = async () => {
  const db = await connect();
  const getAllRecipes = await db.collection('recipes').find().toArray();
  
  return getAllRecipes;
};

const getRecipesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connect();
  const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(id) });
  if (!recipe) return null;

  return recipe;
};

module.exports = {
  registerRecipe,
  getRecipes,
  getRecipesById,
};