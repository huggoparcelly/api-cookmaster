const Services = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;
  await Services.deleteRecipe(id);
  return res.status(204).send();
};