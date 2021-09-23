const middlewares = require('../middlewares');
const { createAdmin: createAdm, createUser: registerUser } = require('../services/userService');

const createAdmin = async (req, res) => {
  const token = req.headers.authorization;
  
  const user = await createAdm(req.body, token);

  if (user.message) return res.status(user.code).json({ message: user.message });
  
  return res.status(201).json({ user });
};

const createUser = async (req, res, next) => {
  const { error } = middlewares.validation(req.body);

  if (error) return next(error);
  const user = await registerUser(req.body);
  
  if (user.message) return res.status(user.statusCode).json({ message: user.message });
  
  return res.status(201).json({ user });
};

module.exports = {
  createAdmin,
  createUser,
};