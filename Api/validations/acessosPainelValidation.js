const Joi = require('joi');

const acessoPainelValidationSchema = Joi.object({
  compradorEmail: Joi.string().email().required(),
  produtoId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  credenciaisAcesso: Joi.object({
    usuario: Joi.string().required(),
    senha: Joi.string().required()
  }).required()
});

module.exports = acessoPainelValidationSchema;
