const ModelRecipes = require('../models/recipes');

module.exports = async (body, params, authorId) => {
  const { id } = params;
  const userId = authorId;

  // // verificar se a receita tem o userId igual vindo do JWT (autenticação)
  // // ou se é um usuário adm

  const recipeUpdated = ModelRecipes.updateRecipe(id, body, userId);

  return recipeUpdated;
};