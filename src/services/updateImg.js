const ModelRecipes = require('../models/recipes');

module.exports = async (id, path) => {
  // dúvida se é dessa forma mesmo!
  const url = `localhost:3000/src/uploads/${path}`;
  return ModelRecipes.updateImg(id, url);
};
