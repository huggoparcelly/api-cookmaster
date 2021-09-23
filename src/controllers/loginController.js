const login = require('../services/loginService');

module.exports = async (req, res) => {
  const token = await login(req.body);

  if (token.message) {
    return res.status(token.code).json({ message: token.message });
  }
  
  return res.status(200).json({ token });
};