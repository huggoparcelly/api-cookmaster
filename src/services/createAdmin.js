const ModelUser = require('../models/user');
const middlewares = require('../middlewares');

module.exports = async (body, token) => {
  const { name, email, password } = body;
  
  const verifyAdmin = await middlewares.verifyAdmin(token);
  if (verifyAdmin) return verifyAdmin;

  const role = 'admin';
  const admin = await ModelUser.registerUser(name, email, password, role);
  
  return admin;
};