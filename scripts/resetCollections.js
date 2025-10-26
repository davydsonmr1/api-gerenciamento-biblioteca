const mongoose = require('mongoose');

const conectarNoBanco = require('../src/database/connection');

const Author = require('../src/models/author.model');
const User = require('../src/models/user.model');
const Book = require('../src/models/book.model');
const Loan = require('../src/models/loan.model');

const resetarBanco = async () => {
  try {
    console.log('1. Conectando no Banco...');
    await conectarNoBanco();

    console.log('2. Banco conectado! Zerando as coleções...');

    await Author.deleteMany({});
    await User.deleteMany({});
    await Book.deleteMany({});
    await Loan.deleteMany({});

    console.log('3. Coleções zeradas com sucesso!');

  } catch (error) {
    console.log('DEU RUIM ao tentar zerar o banco:', error.message);
  } finally {
    console.log('4. Desconectando do Banco...');
    await mongoose.connection.close();
  }
}

resetarBanco();