const express = require('express');
const router = express.Router();
const TipoUtilizador = require('../models/TipoUtilizador');

// Rota GET para listar tipos de utilizador
router.get('/', async (req, res) => {
  const tipos = await TipoUtilizador.findAll();
  res.json(tipos);
});

// Rota POST para adicionar tipos de utilizador
router.post('/', async (req, res) => {
  try {
    const { descricao } = req.body;
    const novoTipo = await TipoUtilizador.create({ descricao });
    res.status(201).json(novoTipo);
  } catch (error) {
    console.error("Erro ao adicionar tipo de utilizador:", error);
    res.status(500).json({ error: 'Erro ao adicionar tipo de utilizador' });
  }
});

// Rota DELETE para remover tipos de utilizador
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await TipoUtilizador.destroy({ where: { id_tipo: id } });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover tipo de utilizador:", error);
    res.status(500).send({ error: 'Erro ao remover tipo de utilizador' });
  }
});

module.exports = router;
