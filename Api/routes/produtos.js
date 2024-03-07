// routes/produtos.js
const express = require('express');
const router = express.Router();
const { Produto } = require('../models');
const produtoValidationSchema = require('../validations/produtoValidation'); // Caminho ajustado conforme necessário

router.post('/produtos', async (req, res) => {
  try {
    // Validação dos dados de entrada
    await produtoValidationSchema.validateAsync(req.body);

    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





// Lista todos os produtos
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Busca um produto pelo ID
router.get('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: 'Produto not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualiza um produto pelo ID
router.put('/produtos/:id', async (req, res) => {
  try {
    const updated = await Produto.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] > 0) {
      const produto = await Produto.findByPk(req.params.id);
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: 'Produto not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deleta um produto pelo ID
router.delete('/produtos/:id', async (req, res) => {
  try {
    const deleted = await Produto.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Produto not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
