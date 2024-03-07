// routes/gerenciamentoDominio.js
const express = require('express');
const { GerenciamentoDominio } = require('../models'); // Ajuste o caminho conforme necessário
const router = express.Router();
const gerenciamentoDominioValidationSchema = require('../validations/gerenciamentoDominioValidation');

// Cria uma nova configuração de domínio
router.post('/gerenciamento-dominios', async (req, res) => {
  try {
    await gerenciamentoDominioValidationSchema.validateAsync(req.body);
    const dominio = await GerenciamentoDominio.create(req.body);
    res.status(201).json(dominio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/gerenciamento-dominios', async (req, res) => {
  try {
    const dominios = await GerenciamentoDominio.findAll();
    res.status(200).json(dominios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Busca uma configuração de domínio pelo ID
router.get('/gerenciamento-dominios/:id', async (req, res) => {
  try {
    const dominio = await GerenciamentoDominio.findByPk(req.params.id);
    if (dominio) {
      res.status(200).json(dominio);
    } else {
      res.status(404).json({ error: 'Gerenciamento de domínio not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualiza uma configuração de domínio pelo ID
router.put('/gerenciamento-dominios/:id', async (req, res) => {
  try {
    const updated = await GerenciamentoDominio.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] > 0) {
      const dominio = await GerenciamentoDominio.findByPk(req.params.id);
      res.status(200).json(dominio);
    } else {
      res.status(404).json({ error: 'Gerenciamento de domínio not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deleta uma configuração de domínio pelo ID
router.delete('/gerenciamento-dominios/:id', async (req, res) => {
  try {
    const deleted = await GerenciamentoDominio.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Gerenciamento de domínio not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
