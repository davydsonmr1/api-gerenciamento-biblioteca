const { Router } = require('express');
const Book = require('../models/book.model');
const Author = require('../models/author.model'); 

const bookRouter = Router();

bookRouter.post('/books', async (req, res) => {
  try {
    const dadosDoNovoLivro = req.body;
    const autorId = dadosDoNovoLivro.author;
    const autorEncontrado = await Author.findById(autorId);

    if (!autorEncontrado) {
      return res.status(404).json({ message: 'O autor (author) desse livro não foi encontrado no Fichário.' });
    }

    const novoLivro = await Book.create(dadosDoNovoLivro);
    res.status(201).json(novoLivro);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: 'Deu ruim ao cadastrar o livro' });
  }
});

bookRouter.get('/books', async (req, res) => {
  try {
    const todosOsLivros = await Book.find().populate('author');
    res.status(200).json(todosOsLivros);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Deu ruim ao buscar os livros' });
  }
});

module.exports = bookRouter;