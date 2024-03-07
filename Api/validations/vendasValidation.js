// validations/vendaValidation.js
const Joi = require('joi');

const vendaValidationSchema = Joi.object({
  compradorEmail: Joi.string().email().required(),
  status: Joi.string().required(),
  dataVenda: Joi.date().required(),
  produtoId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
});

module.exports = vendaValidationSchema;
