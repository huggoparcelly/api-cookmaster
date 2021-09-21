const error = {
  fieldsFilled: 'All fields must be filled',
  incorrectUser: 'Incorrect username or password',
};

const code = 401;

const isValidUser = async (email, password) => {
  const REGEX_EMAIL = /\S+@\S+\.\S+/;

  if (!email || !password) {
    return { code, message: error.fieldsFilled };
  }

  if (!REGEX_EMAIL.test(email) || password.length < 8) {
    return { code, message: error.incorrectUser };
  }
 
  return {};
};

module.exports = { isValidUser };