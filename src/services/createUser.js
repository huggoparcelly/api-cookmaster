const ModelUser = require('../models/user');
const middlewares = require('../middlewares');

const registerUser = async (body) => {
  const { name, email, password } = body;

  const verifyEmail = await middlewares.verifyEmail(email);

  if (verifyEmail) return verifyEmail;

  const role = 'user';
  const user = await ModelUser.registerUser(name, email, password, role);
  return user;
};

module.exports = { registerUser };