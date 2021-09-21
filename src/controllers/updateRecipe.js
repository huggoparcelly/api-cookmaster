const Services = require('../services');

module.exports = async (req, res) => {
  const recipe = await Services.updateRecipe(req.body, req.params, req.user);

  return res.status(200).json({ ...recipe });
};