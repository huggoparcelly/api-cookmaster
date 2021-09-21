const jwt = require('jsonwebtoken');

const SECRET = 'minhasenhasecreta';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const { _id } = decoded;
    
    req.user = _id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};