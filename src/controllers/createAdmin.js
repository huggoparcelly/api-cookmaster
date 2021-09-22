const Service = require('../services');

module.exports = async (req, res) => {
  const token = req.headers.authorization;
  
  const user = await Service.createAdmin(req.body, token);

  if (user.message) return res.status(user.code).json({ message: user.message });
  
  return res.status(201).json({ user });
};