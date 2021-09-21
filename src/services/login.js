const jwt = require('jsonwebtoken');

const ModelUser = require('../models/user');
const middlewares = require('../middlewares');

const SECRET = 'minhasenhasecreta';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const login = async (body) => {
  const { email, password } = body;

  const validateUser = await middlewares.isValidUser(email, password);

  if (validateUser.message) return validateUser;

  const findedUser = await ModelUser.findUserToLogin(email, password);
  if (!findedUser) return null;
  
  const payload = { ...findedUser };
  const token = jwt.sign(payload, SECRET, jwtConfig);
  
  return token;
};

module.exports = login;