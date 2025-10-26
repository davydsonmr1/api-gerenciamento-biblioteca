require('dotenv').config();

const express = require('express');
const app = express();

const PORTA = process.env.PORTA_DO_SERVIDOR; 

app.listen(PORTA, () => {
  console.log(`Servidor LIGADO na porta ${PORTA}`); 
});