const ModelAdmin = require('../models/admin');
const middlewares = require('../middlewares');

module.exports = async (body, token) => {
  const { name, email, password } = body;
  
  const verifyAdmin = await middlewares.verifyAdmin(token);
  if (verifyAdmin) return verifyAdmin;

  const role = 'admin';
  const admin = await ModelAdmin.createAdmin(name, email, password, role);
  
  return admin;
};