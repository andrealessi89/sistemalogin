const Joi = require('joi');

const produtoValidationSchema = Joi.object({
  nomeProduto: Joi.string().required(),
  descricao: Joi.string().required(),
  preco: Joi.number().precision(2).required(),
  tipoConteudo: Joi.string().required(),
  IDHotmart: Joi.string().required(),
  userId: Joi.number().integer().required(),
});

module.exports = produtoValidationSchema;
