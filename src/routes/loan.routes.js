const { Router } = require('express');
const Loan = require('../models/loan.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');

const loanRouter = Router();

loanRouter.post('/loans', async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    const livroEncontrado = await Book.findById(bookId);
    const usuarioEncontrado = await User.findById(userId);

    if (!livroEncontrado || !usuarioEncontrado) {
      return res.status(404).json({ message: 'Livro ou Usuário não encontrado.' });
    }

    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0); 

    const dataDevolucaoLivro = livroEncontrado.expectedReturnDate 
        ? new Date(livroEncontrado.expectedReturnDate) 
        : null;
    if(dataDevolucaoLivro) {
        dataDevolucaoLivro.setHours(0, 0, 0, 0);
    }

    const regraA = livroEncontrado.isAvailable === true;
    const regraB = livroEncontrado.isAvailable === false && dataDevolucaoLivro && dataDevolucaoLivro < hoje;

    if (regraA || regraB) {

      livroEncontrado.isAvailable = false;

      const novaDataDevolucao = new Date(hoje);
      novaDataDevolucao.setDate(hoje.getDate() + 3);

      livroEncontrado.expectedReturnDate = novaDataDevolucao;

      await livroEncontrado.save();

      const hojeString = hoje.toISOString().split('T')[0];
      const devolucaoString = novaDataDevolucao.toISOString().split('T')[0];

      const novoEmprestimo = await Loan.create({
        user: usuarioEncontrado.name,
        book: livroEncontrado.title,
        loanDate: hojeString,            
        returnDate: devolucaoString,      
      });
      res.status(200).json(novoEmprestimo);

    } else {
      //Se NÃO PUDER Emprestar
      res.status(400).json({ message: 'Livro não disponível. Já se encontra emprestado.' });
    }

  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: 'Deu ruim ao processar o empréstimo' });
  }
});

module.exports = loanRouter;