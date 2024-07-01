const express = require('express');
const router = express.Router();
const Carrino = require('../models/Carrino');

// Rota GET para listar todos os carrinhos
router.get('/', async (req, res) => {
  try {
    const carrino = await Carrino.findAll();
    console.log("Carrinhos:", carrino); // Adicionar log
    res.json(carrino);
  } catch (error) {
    console.error("Erro ao buscar carrinhos:", error);
    res.status(500).json({ error: 'Erro ao buscar carrinhos' });
  }
});

// Rota GET para listar carrinhos por usuário
router.get('/user/:id_user', async (req, res) => {
  const { id_user } = req.params;
  try {
    console.log("Buscando carrinhos para o usuário:", id_user); // Adicionar log
    const carrinhos = await Carrino.findAll({ where: { id_user } });
    console.log("Carrinhos encontrados:", carrinhos); // Adicionar log
    res.json(carrinhos);
  } catch (error) {
    console.error("Erro ao buscar carrinhos por usuário:", error);
    res.status(500).json({ error: 'Erro ao buscar carrinhos por usuário' });
  }
});

// Rota POST para adicionar itens ao carrinho
router.post('/', async (req, res) => {
  try {
    const { id_user, produtos } = req.body;
    console.log('Recebido id_user:', id_user);
    console.log('Recebido produtos:', produtos);
    const novoCarrinho = await Carrino.create({
      id_user,
      data: new Date(),
      produtos
    });
    res.status(201).json(novoCarrinho);
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    res.status(500).json({ error: 'Erro ao adicionar item ao carrinho' });
  }
});

// Rota DELETE para remover carrinho
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Carrino.destroy({ where: { id_carrinho: id } });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    res.status(500).send({ error: 'Erro ao remover item do carrinho' });
  }
});

module.exports = router;
