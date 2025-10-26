require('dotenv').config();

const express = require('express');
const conectarNoBanco = require('./src/database/connection');
const authorRoutes = require('./src/routes/author.routes');
const app = express();

app.use(express.json());

conectarNoBanco();

app.use('/api', authorRoutes);

const PORTA = process.env.PORTA_DO_SERVIDOR; 

app.listen(PORTA, () => {
  console.log(`Servidor LIGADO na porta ${PORTA}`); 
});