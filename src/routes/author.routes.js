const { Router } = require('express');

const Author = require('../models/author.model');
const authorRouter = Router();

authorRouter.post('/authors', async (req, res) => {
 
  try {
    const dadosDoNovoAutor = req.body;
    const novoAutor = await Author.create(dadosDoNovoAutor);
    res.status(201).json(novoAutor);

  } catch (error) {
    res.status(500).json({ message: 'Deu ruim ao cadastrar o autor' });
  }
});

authorRouter.get('/authors', async (req, res) => {
  try {
    const todosOsAutores = await Author.find();
    res.status(200).json(todosOsAutores);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Deu ruim ao buscar os autores' });
  }
});


module.exports = authorRouter;