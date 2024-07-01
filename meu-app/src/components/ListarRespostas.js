import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarRespostas = () => {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [response, setResponse] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      axios.get('http://localhost:3000/tickets')
        .then(response => {
          const userTickets = response.data.filter(ticket => ticket.id_user === parseInt(selectedUser) && ticket.id_user_resposta !== null);
          setTickets(userTickets);
        })
        .catch(error => {
          console.error("Erro ao buscar tickets:", error);
        });

      const currentUserData = users.find(user => user.id_user === parseInt(selectedUser));
      setCurrentUser(currentUserData);
    } else {
      setTickets([]);  // Limpa a lista de tickets quando nenhum usuário está selecionado
      setCurrentUser(null);
    }
  }, [selectedUser, users]);

  const handleReply = async () => {
    if (selectedTicket && response.trim() && currentUser) {
      try {
        const updatedDescription = `${selectedTicket.descricao}\n\n${currentUser.nome}: ${response}\n\n\n`;
        await axios.put(`http://localhost:3000/tickets/${selectedTicket.id_ticket}`, {
          descricao: updatedDescription
        });
        setTickets(tickets.map(ticket => ticket.id_ticket === selectedTicket.id_ticket ? { ...ticket, descricao: updatedDescription } : ticket));
        setSelectedTicket(null);
        setResponse('');
        alert('Resposta enviada com sucesso');
      } catch (error) {
        console.error("Erro ao enviar resposta:", error);
        alert('Erro ao enviar resposta');
      }
    } else {
      alert('Preencha todos os campos');
    }
  };

  return (
    <div>
      <h2>Tickets Usuario</h2>
      <div>
        <label>Logado como:</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Selecione um usuário</option>
          {users.map(user => (
            <option key={user.id_user} value={user.id_user}>
              {user.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Tickets com Respostas</h3>
        <ul>
          {tickets.map(ticket => (
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
            <label>Conversa:</label>
            <textarea value={selectedTicket.descricao} readOnly style={{ width: '100%', height: '100px' }} />
          </div>
          <div>
            <label>Resposta:</label>
            <textarea value={response} onChange={(e) => setResponse(e.target.value)} style={{ width: '100%', height: '100px' }} />
          </div>
          <button onClick={handleReply}>Enviar Resposta</button>
        </div>
      )}
    </div>
  );
};

export default ListarRespostas;
