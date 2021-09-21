const Joi = require('joi');
const ModelUser = require('../models/user');

// campo nome, email e senha obrigatorio - Invalid entrie. Try again
// email valido @ .com - Invalid entrie. Try again
// email unico - findUserByEmail email - Email already registered

const validation = (body) => 
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
  }).validate(body);

const verifyEmail = async (email) => {
  const findUserByEmail = await ModelUser.findUserByEmail(email);
  
  if (findUserByEmail) {
    const err = new Error('Email already registered');
    err.statusCode = 409;
    return err;
  }
};

module.exports = { validation, verifyEmail };