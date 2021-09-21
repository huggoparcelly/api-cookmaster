const ModelUser = require('../models/user');

const error = {
  fieldsFilled: 'All fields must be filled',
  incorrectUser: 'Incorrect username or password',
};

const code = 401;

module.exports = async (email, password) => {
  const REGEX_EMAIL = /\S+@\S+\.\S+/;
  const findedUser = await ModelUser.findUserToLogin(email, password);

  if (!email || !password) {
    return { code, message: error.fieldsFilled };
  }

  if (!REGEX_EMAIL.test(email) || !findedUser) {
    return { code, message: error.incorrectUser };
  }
 
  return {};
};