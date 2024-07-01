const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria');

// Rota GET para listar categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

// Rota POST para adicionar categoria
router.post('/', async (req, res) => {
  try {
    const { nome } = req.body;
    const novaCategoria = await Categoria.create({ nome });
    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error("Erro ao adicionar categoria:", error);
    res.status(500).json({ error: 'Erro ao adicionar categoria' });
  }
});

// Rota DELETE para remover categoria
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Categoria.destroy({ where: { id_categoria: id } });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover categoria:", error);
    res.status(500).send({ error: 'Erro ao remover categoria' });
  }
});

module.exports = router;
