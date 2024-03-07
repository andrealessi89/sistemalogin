const Joi = require('joi');

const userValidationSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  hottok: Joi.string().optional(),
  configuracoesSMTP: Joi.object().optional(),
  subdominioPersonalizado: Joi.string().optional(),
  dominioProprio: Joi.string().optional(),
});

module.exports = userValidationSchema;
