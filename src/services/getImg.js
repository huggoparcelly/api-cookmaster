const ModelRecipes = require('../models/recipes');

module.exports = async (id) => {
  const newId = id.replace('.jpeg', '');

  const image = await ModelRecipes.getImg(newId);

  return image;
};