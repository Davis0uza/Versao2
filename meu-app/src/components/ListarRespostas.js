import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MenuLateral from './MenuLateral'; 

const ListarRespostas = () => {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [response, setResponse] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await axios.get('http://localhost:3000/users');
        setUsers(responseUsers.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchData();
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
        Swal.fire('Sucesso!', 'Resposta enviada com sucesso.', 'success');
      } catch (error) {
        console.error("Erro ao enviar resposta:", error);
        Swal.fire('Erro!', 'Houve um problema ao enviar a resposta.', 'error');
      }
    } else {
      Swal.fire('Erro!', 'Preencha todos os campos.', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <MenuLateral />
        </div>
        <div className="col-md-12">
          <div className="content-wrapper">
            <h1 style={{ color: '#164375', fontWeight: 'bold' }} className=" mb-4">Tickets do Usuário</h1>
            <div className="mb-3">
              <label htmlFor="selectedUser" className="form-label">Logado como:</label>
              <select
                id="selectedUser"
                className="form-select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                style={{ borderColor: '#164375', borderWidth: '2px' }}
              >
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
              <ul className="list-group">
                {tickets.map(ticket => (
                  <li key={ticket.id_ticket} className="list-group-item d-flex justify-content-between align-items-center">
                    {ticket.descricao}
                    <button onClick={() => setSelectedTicket(ticket)} className="btn btn-primary">
                      Responder
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {selectedTicket && (
              <div className="mt-4">
                <h3>Responder Ticket</h3>
                <div className="mb-3">
                  <label htmlFor="selectedTicketDescription" className="form-label">Conversa:</label>
                  <textarea
                    id="selectedTicketDescription"
                    className="form-control"
                    value={selectedTicket.descricao}
                    readOnly
                    rows="3"
                    style={{ borderColor: '#164375', borderWidth: '2px' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="response" className="form-label">Resposta:</label>
                  <textarea
                    id="response"
                    className="form-control"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows="3"
                    style={{ borderColor: '#164375', borderWidth: '2px' }}
                  />
                </div>
                <button onClick={handleReply} className="btn btn-primary">
                  Enviar Resposta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarRespostas;
