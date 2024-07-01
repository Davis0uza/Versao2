const express = require('express');
const router = express.Router();
const Gestor = require('../models/gestores');
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const gestores = await Gestor.findAll();
    res.json(gestores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar gestores' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_gestor, nome } = req.body;

    // Atualizar o campo id_gestor na tabela USER
    await User.update({ id_gestor: id_gestor }, { where: { id_user: id_gestor } });

    const novoGestor = await Gestor.create({ id_gestor, nome });
    res.status(201).json(novoGestor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar gestor' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Gestor.destroy({ where: { id_gestor: id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar gestor' });
  }
});

module.exports = router;
