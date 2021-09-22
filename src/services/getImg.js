const ModelRecipes = require('../models/recipes');

module.exports = async (id) => {
  const image = await ModelRecipes.getImg(id);

  return image;
};