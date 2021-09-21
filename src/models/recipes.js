const connect = require('./connection');

const registerRecipe = async (name, ingredients, preparation, _id) => {
  // falta url da imagem
  const db = await connect();
  const recipeCreated = await db.collection('users')
    .insertOne({ name, ingredients, preparation, _id });
  return recipeCreated.ops[0];
};

module.exports = {
  registerRecipe,
};