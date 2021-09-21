const Services = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;

  const recipe = await Services.getRecipesById(id);
  
  if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });
  
  return res.status(200).json(recipe);
};