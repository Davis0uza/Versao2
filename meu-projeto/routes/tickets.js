const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Rota para listar todos os tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        { model: User, as: 'User', attributes: ['nome'] },  // Inclui o usuário que criou o ticket
      ],
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tickets' });
  }
});
// Rota para adicionar um novo ticket
router.post('/', async (req, res) => {
  const { descricao, id_user, id_user_resposta } = req.body;
  try {
    const novoTicket = await Ticket.create({ descricao, id_user, id_user_resposta });
    res.status(201).json(novoTicket);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar ticket' });
  }
});
// Rota para atualizar um ticket
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { descricao, id_user_resposta } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      ticket.descricao = descricao;
      ticket.id_user_resposta = id_user_resposta;
      await ticket.save();
      res.json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar ticket' });
  }
});
// Rota para deletar um ticket
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Ticket.destroy({ where: { id_ticket: id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar ticket' });
  }
});

module.exports = router;
