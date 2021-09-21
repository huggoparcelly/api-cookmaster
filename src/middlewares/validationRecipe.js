const Joi = require('joi');

module.exports = (body) => 
  Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(), 
    preparation: Joi.string().required(),
  }).validate(body);