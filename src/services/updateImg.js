const ModelRecipes = require('../models/recipes');

module.exports = async (id, path) => {
  // dúvida se é dessa forma mesmo!
  const imagePath = `localhost:3000/${path}`;
  const uploadImg = await ModelRecipes.updateImg(id, imagePath);

  return uploadImg;
};