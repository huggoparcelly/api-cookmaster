const Service = require('../services');
const middlewares = require('../middlewares');

module.exports = async (req, res, next) => {
  // validações
  const { error } = middlewares.validateRecipe(req.body);
  if (error) return next(error);
  
  const recipe = await Service.registerRecipe(req.body, req.user);

  return res.status(201).json({ recipe });
};