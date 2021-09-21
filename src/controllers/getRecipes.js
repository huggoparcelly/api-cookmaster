const Services = require('../services');

module.exports = async (req, res) => {
  const getRecipes = await Services.getRecipes();
  
  return res.status(200).json(getRecipes);
};