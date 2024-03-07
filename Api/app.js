const express = require('express');
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');
const userRoutes = require('./routes/users');
const produtoRoutes = require('./routes/produtos');
const vendaRoutes = require('./routes/vendas');
const acessoPainelRoutes = require('./routes/acessosPainel');
const entregavelRoutes = require('./routes/entregavel');
const gerenciamentoDominioRoutes = require('./routes/gerenciamentoDominio');

const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');



// Continue importando as rotas para os outros modelos

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.use(express.json());





// Se quiser que todas as rotas sejam privadas menos a de login
//app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ['/login'] }));

app.use(userRoutes);
app.use(produtoRoutes);
app.use(vendaRoutes);
app.use(acessoPainelRoutes);
app.use(entregavelRoutes);
app.use(gerenciamentoDominioRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
