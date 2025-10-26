require('dotenv').config();

const express = require('express');
const conectarNoBanco = require('./src/database/connection');
const app = express();

app.use(express.json());

conectarNoBanco();

const PORTA = process.env.PORTA_DO_SERVIDOR; 

app.listen(PORTA, () => {
  console.log(`Servidor LIGADO na porta ${PORTA}`); 
});