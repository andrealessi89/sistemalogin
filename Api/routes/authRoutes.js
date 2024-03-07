const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/users'); // ajuste conforme necessário
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    // Simulação de busca e verificação do usuário. Adapte conforme necessário.
    const user = await User.findOne({ where: { email: email } });
    if (!user || user.senha !== senha) {
        return res.status(401).send({ message: "Email ou senha inválidos" });
    }

    // Geração do token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expira em 24 horas
    });

    res.status(200).send({ auth: true, token: token });
});

module.exports = router;
