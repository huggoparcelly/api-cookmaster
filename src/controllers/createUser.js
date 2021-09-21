const ServiceUser = require('../services/createUser');
const middlewares = require('../middlewares');

module.exports = async (req, res, next) => {
  const { error } = middlewares.validation(req.body);

  if (error) return next(error);
  const user = await ServiceUser.registerUser(req.body);
  
  if (user.message) return res.status(user.statusCode).json({ message: user.message });
  
  return res.status(201).json({ user });
};