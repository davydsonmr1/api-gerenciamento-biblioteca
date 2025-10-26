require('dotenv').config();

const express = require('express');
const conectarNoBanco = require('./src/database/connection');
const authorRoutes = require('./src/routes/author.routes');
const userRoutes = require('./src/routes/user.routes');
const bookRoutes = require('./src/routes/book.routes');
const loanRoutes = require('./src/routes/loan.routes');
const app = express();

app.use(express.json());

conectarNoBanco();

app.use('/api', authorRoutes);
app.use('/api', userRoutes);
app.use('/api', bookRoutes);
app.use('/api', loanRoutes);

const PORTA = process.env.PORTA_DO_SERVIDOR; 

app.listen(PORTA, () => {
  console.log(`Servidor LIGADO na porta ${PORTA}`); 
});