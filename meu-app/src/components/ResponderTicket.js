import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AreaGestorProdutos from './AreaGestorProdutos';

const ResponderTicket = () => {
  const [admins, setAdmins] = useState([]);
  const [openTickets, setOpenTickets] = useState([]);
  const [pendingTickets, setPendingTickets] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        const admins = response.data.filter(user => user.id_tipo === 1); // Supondo que id_tipo 1 é Admin
        setAdmins(admins);
      })
      .catch(error => {
        console.error("Erro ao buscar administradores:", error);
      });

    axios.get('http://localhost:3000/tickets')
      .then(response => {
        const openTickets = response.data.filter(ticket => ticket.id_user_resposta !== null);
        const pendingTickets = response.data.filter(ticket => ticket.id_user_resposta === null);
        setOpenTickets(openTickets);
        setPendingTickets(pendingTickets);
      })
      .catch(error => {
        console.error("Erro ao buscar tickets:", error);
      });
  }, []);

  const handleReply = async () => {
    if (selectedTicket && response.trim()) {
      try {
        const updatedDescription = `${selectedTicket.descricao}\n\nRespostaAdmin: ${response}\n\n\n`;
        await axios.put(`http://localhost:3000/tickets/${selectedTicket.id_ticket}`, {
          descricao: updatedDescription,
          id_user_resposta: selectedAdmin
        });
        setPendingTickets(pendingTickets.filter(ticket => ticket.id_ticket !== selectedTicket.id_ticket));
        setSelectedTicket(null);
        setResponse('');
        alert('Resposta enviada com sucesso');
      } catch (error) {
        console.error("Erro ao responder ticket:", error);
        alert('Erro ao responder ticket');
      }
    } else {
      alert('Preencha todos os campos');
    }
  };

  return (
    <div>
      <AreaGestorProdutos></AreaGestorProdutos>
      <h2>Responder Ticket</h2>
      <div>
        <label>Logado como:</label>
        <select value={selectedAdmin} onChange={(e) => setSelectedAdmin(e.target.value)}>
          <option value="">Selecione um administrador</option>
          {admins.map(admin => (
            <option key={admin.id_user} value={admin.id_user}>
              {admin.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Tickets em Aberto</h3>
        <ul>
          {openTickets.map(ticket => (
            <li key={ticket.id_ticket}>
              {ticket.descricao}
              <button onClick={() => setSelectedTicket(ticket)}>Responder</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Tickets Pendentes</h3>
        <ul>
          {pendingTickets.map(ticket => (
            <li key={ticket.id_ticket}>
              {ticket.descricao}
              <button onClick={() => setSelectedTicket(ticket)}>Responder</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedTicket && (
        <div>
          <h3>Responder Ticket</h3>
          <div>
            <label>Enviado por:</label>
            <p>{selectedTicket.User ? selectedTicket.User.nome : 'Desconhecido'}</p>
          </div>
          <div>
            <label>Issue:</label>
            <textarea value={selectedTicket.descricao} readOnly style={{ width: '100%', height: '100px' }} />
          </div>
          <div>
            <label>Resposta:</label>
            <textarea value={response} onChange={(e) => setResponse(e.target.value)} style={{ width: '100%', height: '100px' }} />
          </div>
          <button onClick={handleReply}>Responder ao Usuário</button>
        </div>
      )}
    </div>
  );
};

export default ResponderTicket;