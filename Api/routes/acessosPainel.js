// routes/acessosPainel.js
const express = require('express');
const { AcessoPainel } = require('../models');
const acessoPainelValidationSchema = require('../validations/acessosPainelValidation'); // Ajuste o caminho conforme necessário
const router = express.Router();

router.post('/acessos-painel', async (req, res) => {
  try {
    // Validação dos dados de entrada
    await acessoPainelValidationSchema.validateAsync(req.body);

    const acessoPainel = await AcessoPainel.create(req.body);
    res.status(201).json(acessoPainel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Lista todos os acessos a painel
router.get('/acessos-painel', async (req, res) => {
  try {
    const acessos = await AcessoPainel.findAll();
    res.status(200).json(acessos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Busca um acesso a painel pelo ID
router.get('/acessos-painel/:id', async (req, res) => {
  try {
    const acesso = await AcessoPainel.findByPk(req.params.id);
    if (acesso) {
      res.status(200).json(acesso);
    } else {
      res.status(404).json({ error: 'Acesso a painel not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualiza um acesso a painel pelo ID
router.put('/acessos-painel/:id', async (req, res) => {
  try {
    const updated = await AcessoPainel.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] > 0) {
      const acesso = await AcessoPainel.findByPk(req.params.id);
      res.status(200).json(acesso);
    } else {
      res.status(404).json({ error: 'Acesso a painel not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deleta um acesso a painel pelo ID
router.delete('/acessos-painel/:id', async (req, res) => {
  try {
    const deleted = await AcessoPainel.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Acesso a painel not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
