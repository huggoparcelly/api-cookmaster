const Joi = require('joi');
const jwt = require('jsonwebtoken');

const ModelUser = require('../models/user');

const SECRET = 'minhasenhasecreta';

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

const verifyAdmin = async (token) => {
  if (!token) {
    return { code: 401, message: 'missing auth token' };
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    const { _id } = decoded;
    const findAdmin = await ModelUser.findUserById(_id);

    if (!findAdmin || findAdmin.role !== 'admin') {
      return { code: 403, message: 'Only admins can register new admins' };
    }
  } catch (err) {
    return { code: 401, message: 'jwt malformed' };
  }
};

module.exports = { validation, verifyEmail, verifyAdmin };