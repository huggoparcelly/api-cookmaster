const ServiceUser = require('../services');

module.exports = async (req, res) => {
  const token = await ServiceUser.login(req.body);

  if (token.message) {
    return res.status(token.code).json({ message: token.message });
  }
  
  return res.status(200).json({ token });
};