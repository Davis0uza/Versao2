const express = require('express');
const router = express.Router();
const Versao = require('../models/versao');

// Rota GET para listar versões
router.get('/', async (req, res) => {
  try {
    const versoes = await Versao.findAll();
    res.json(versoes);
  } catch (error) {
    console.error("Erro ao buscar versões:", error);
    res.status(500).json({ error: 'Erro ao buscar versões' });
  }
});

// Rota POST para adicionar versão
router.post('/', async (req, res) => {
  try {
    const { nome, id_produto } = req.body;
    const novaVersao = await Versao.create({ nome, id_produto });
    res.status(201).json(novaVersao);
  } catch (error) {
    console.error("Erro ao adicionar versão:", error);
    res.status(500).json({ error: 'Erro ao adicionar versão' });
  }
});

// Rota PUT para atualizar versao
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, id_produto } = req.body;
  try {
    const versao = await Versao.findByPk(id);
    if (versao) {
      versao.nome = nome;
      versao.id_produto = id_produto;
      await versao.save();
      res.json(versao);
    } else {
      res.status(404).json({ error: 'Versão não encontrada' });
    }
  } catch (error) {
    console.error("Erro ao atualizar versão:", error);
    res.status(500).json({ error: 'Erro ao atualizar versão' });
  }
});

// Rota DELETE para remover versao
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Versao.destroy({ where: { id_versao: id } });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover versão:", error);
    res.status(500).send({ error: 'Erro ao remover versão' });
  }
});

module.exports = router;
