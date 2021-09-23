const ModelUser = require('../models/user');
const middlewares = require('../middlewares');

const createAdmin = async (body, token) => {
  const { name, email, password } = body;
  
  const verifyAdmin = await middlewares.verifyAdmin(token);
  if (verifyAdmin) return verifyAdmin;

  const role = 'admin';
  const admin = await ModelUser.registerUser(name, email, password, role);
  
  return admin;
};

const createUser = async (body) => {
  const { name, email, password } = body;
  
  const verifyEmail = await middlewares.verifyEmail(email);
  
  if (verifyEmail) return verifyEmail;

  const role = 'user';
  const user = await ModelUser.registerUser(name, email, password, role);
  return user;
};

module.exports = {
  createAdmin,
  createUser,
};