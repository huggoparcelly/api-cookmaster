const Joi = require('joi');
const ModelUser = require('../models/user');

const validation = (body) => 
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
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