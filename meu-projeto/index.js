const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const path = require('path');

// Importar rotas
const carrinoRoutes = require('./routes/carrino');
const categoriaRoutes = require('./routes/categorias');
const gestoresRoutes = require('./routes/gestores');
const userRoutes = require('./routes/users');
const tipoUtilizadorRoutes = require('./routes/tipoutilizador');
const ticketRoutes = require('./routes/tickets');
const produtoRoutes = require('./routes/produtos');
const versaoRoutes = require('./routes/versoes');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001', // URL do frontend
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Configurar o diretório de uploads como estático
const uploadDir = path.join(__dirname, 'src/uploads');
app.use('/uploads', express.static(uploadDir));

// Usar rotas
app.use('/carrino', carrinoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/gestores', gestoresRoutes);
app.use('/users', userRoutes);
app.use('/tipoutilizador', tipoUtilizadorRoutes);
app.use('/tickets', ticketRoutes);
app.use('/produtos', produtoRoutes);
app.use('/versoes', versaoRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi bem-sucedida.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar os modelos:', err);
  });

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
