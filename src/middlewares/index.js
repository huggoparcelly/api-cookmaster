const error = require('./error');
const { validation, verifyEmail } = require('./validationUser');
const { isValidUser } = require('./validationLogin');

module.exports = {
  error,
  validation,
  verifyEmail,
  isValidUser,
};