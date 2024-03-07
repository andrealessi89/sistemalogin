// routes/vendas.js
const express = require('express');
const { Venda } = require('../models'); // Ajuste o caminho conforme necessário
const router = express.Router();
const vendaValidationSchema = require('../validations/vendasValidation');
const authMiddleware = require('../middlewares/authMiddleware');

// Cria uma nova venda
router.post('/vendas', async (req, res) => {
  try {
    await vendaValidationSchema.validateAsync(req.body);
    const venda = await Venda.create(req.body);
    res.status(201).json(venda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Lista todas as vendas
router.get('/vendas', async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    res.status(200).json(vendas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Busca uma venda pelo ID
router.get('/vendas/:id', async (req, res) => {
  try {
    const venda = await Venda.findByPk(req.params.id);
    if (venda) {
      res.status(200).json(venda);
    } else {
      res.status(404).json({ error: 'Venda not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualiza uma venda pelo ID
router.put('/vendas/:id', async (req, res) => {
  try {
    const updated = await Venda.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] > 0) {
      const venda = await Venda.findByPk(req.params.id);
      res.status(200).json(venda);
    } else {
      res.status(404).json({ error: 'Venda not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deleta uma venda pelo ID
router.delete('/vendas/:id', async (req, res) => {
  try {
    const deleted = await Venda.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Venda not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
