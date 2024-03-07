// validations/entregavelValidation.js
const Joi = require('joi');

const entregavelValidationSchema = Joi.object({
  tipo: Joi.string().required(),
  conteudo: Joi.string().required(),
  produtoId: Joi.number().integer().required(),
});

module.exports = entregavelValidationSchema;
