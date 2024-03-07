const express = require('express');
const router = express.Router();
const { User } = require('../models');
const userValidationSchema = require('../validations/userValidation'); // Caminho ajustado conforme necessário
const jwt = require('jsonwebtoken');
const verificarToken = require('./../middlewares/authMiddleware');




router.get('/profile', verificarToken, async (req, res) => {
  console.log('AQUI', req.usuarioId);
  try {
    const user = await User.findByPk(req.usuarioId);
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }
    // Retornar informações relevantes do usuário (exclua a senha e outras informações sensíveis)
    res.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      // Adicione outros campos conforme necessário
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor');
  }
});



router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Aqui você deve buscar o usuário pelo email e validar a senha.
    // Este exemplo não inclui a lógica de hashing de senha para simplificar.
    const user = await User.findOne({ where: { email } });
    if (!user || user.senha !== senha) {
      return res.status(401).json({ error: 'Email ou senha inválidos.' });
    }

    // Se a autenticação for bem-sucedida, gere e envie o token JWT.
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    // Validação dos dados de entrada
    await userValidationSchema.validateAsync(req.body);

    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Lista todos os usuários
router.get('/users', verificarToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Busca um usuário pelo ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users/hottok/:hottok', async (req, res) => {
  const { hottok } = req.params;

  try {
    const user = await User.findOne({ where: { hottok } });
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar usuário pelo hottok." });
  }
});

// Atualiza um usuário pelo ID
router.put('/users/:id', async (req, res) => {
  try {
    const updated = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] > 0) {
      const user = await User.findByPk(req.params.id);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deleta um usuário pelo ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
