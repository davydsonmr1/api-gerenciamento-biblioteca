const { Router } = require('express');

const User = require('../models/user.model');

const userRouter = Router();

userRouter.post('/users', async (req, res) => {
  try {
    const dadosDoNovoUsuario = req.body;
    const novoUsuario = await User.create(dadosDoNovoUsuario);

    res.status(201).json(novoUsuario);

  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: 'Deu ruim ao cadastrar o usuário' });
  }
});

userRouter.get('/users', async (req, res) => {
  try {
    const todosOsUsuarios = await User.find();
    res.status(200).json(todosOsUsuarios);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Deu ruim ao buscar os usuários' });
  }
});

module.exports = userRouter;