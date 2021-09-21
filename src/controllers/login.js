const ServiceUser = require('../services');

module.exports = async (req, res, next) => {
  const token = await ServiceUser.login(req.body);
  if (!token) {
    const err = new Error('Incorrect username or password');
    err.statusCode = 401;
    return next(err);
  }

  if (token.message) {
    return res.status(token.code).json({ message: token.message });
  }
  
  return res.status(200).json({ token });
};