const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    console.log("Bearer Header:", bearerHeader);

    if (!bearerHeader) {
        return res.status(403).send({ message: "É necessário um token para autenticação" });
    }

    // Extrai o token do cabeçalho
    const token = bearerHeader.split(' ')[1]; // Isso remove o prefixo "Bearer " e pega apenas o token
    console.log("Token extraído:", token);

    try {
        // Agora você passa apenas o token (sem o "Bearer ") para jwt.verify()
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded); // Opcional: Imprimir o objeto decodificado para debug
        // No middleware verificarToken
        req.usuarioId = decoded.userId; // Corrige isso para corresponder ao payload decodificado do token
        console.log("AQUIE2", decoded.userId)
        next();
    } catch (error) {
        console.error("Erro na verificação do token:", error.message); // Opcional: Imprimir a mensagem de erro para debug
        return res.status(401).send({ message: "Token inválido" });
    }
};

module.exports = verificarToken;
