const error = {
  fieldsFilled: 'All fields must be filled',
  incorrectUser: 'Incorrect username or password',
};

const code = 401;

module.exports = async (email, password) => {
  const REGEX_EMAIL = /\S+@\S+\.\S+/;

  if (!email || !password) {
    return { code, message: error.fieldsFilled };
  }

  if (!REGEX_EMAIL.test(email) || password.length < 8) {
    return { code, message: error.incorrectUser };
  }
 
  return {};
};