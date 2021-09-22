const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerRecipe = async (name, ingredients, preparation, userId) => {
  // falta url da imagem
  const db = await connect();
  const recipeCreated = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
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

const updateRecipe = async (_id, body, userId) => {
  const { name, ingredients, preparation } = body;
  if (!ObjectId.isValid(_id)) {
    return null;
  }
  const db = await connect();
  await db.collection('recipes')
    .updateOne({ _id: new ObjectId(_id) }, { $set: { name, ingredients, preparation, userId } });

  return { _id, name, ingredients, preparation, userId };
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connect();
  await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });
};

const updateImg = async (id, path) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  
  const db = await connect();
  await db.collection('recipes')
    .updateOne({ _id: new ObjectId(id) }, { $set: { image: path } });

  const recipe = await getRecipesById(id);

  return recipe;
};

const getImg = async (id) => {
  const { image } = await getRecipesById(id);

  return image;
};

module.exports = {
  registerRecipe,
  getRecipes,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
  updateImg,
  getImg,
};