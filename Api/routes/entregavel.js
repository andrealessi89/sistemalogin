// routes/entregaveis.js
const express = require('express');
const { Entregavel } = require('../models');
const entregavelValidationSchema = require('../validations/entregavelValidation'); // Ajuste o caminho conforme necessário
const router = express.Router();

router.post('/entregaveis', async (req, res) => {
  try {
    // Validação dos dados de entrada
    await entregavelValidationSchema.validateAsync(req.body);

    const entregavel = await Entregavel.create(req.body);
    res.status(201).json(entregavel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Lista todos os entregáveis
router.get('/entregaveis', async (req, res) => {
  try {
    const entregaveis = await Entregavel.findAll();
    res.status(200).json(entregaveis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Busca um entregável pelo ID
router.get('/entregaveis/:id', async (req, res) => {
  try {
    const entregavel = await Entregavel.findByPk(req.params.id);
    if (entregavel) {
      res.status(200).json(entregavel);
    } else {
      res.status(404).json({ error: 'Entregável not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualiza um entregável pelo ID
router.put('/entregaveis/:id', async (req, res) => {
  try {
    const updated = await Entregavel.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] > 0) {
      const entregavel = await Entregavel.findByPk(req.params.id);
      res.status(200).json(entregavel);
    } else {
      res.status(404).json({ error: 'Entregável not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deleta um entregável pelo ID
router.delete('/entregaveis/:id', async (req, res) => {
  try {
    const deleted = await Entregavel.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Entregável not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
