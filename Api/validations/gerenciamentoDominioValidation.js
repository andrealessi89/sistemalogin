// validations/gerenciamentoDominioValidation.js
const Joi = require('joi');

const gerenciamentoDominioValidationSchema = Joi.object({
  tipoDominio: Joi.string().required(),
  nomeDominio: Joi.string().required(),
  verificado: Joi.boolean(),
  userId: Joi.number().integer().required(),
});

module.exports = gerenciamentoDominioValidationSchema;
