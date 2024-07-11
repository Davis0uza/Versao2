import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MenuLateral from './MenuLateral';
import { AuthContext } from '../context/AuthContext';

const ListarRespostas = () => {
  const [tickets, setTickets] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      axios.get('http://localhost:3000/tickets')
        .then(response => {
          const userTickets = response.data.filter(ticket => ticket.id_user === currentUser.id_user && ticket.id_user_resposta !== null);
          setTickets(userTickets);
        })
        .catch(error => {
          console.error("Erro ao buscar tickets:", error);
        });
    }
  }, [currentUser]);

  return (
    <div className="container mt-5">
      <MenuLateral />
      <h1 style={{ color: '#164375', fontWeight: 'bold' }} className="mb-4">Listar Respostas</h1>
      <div className="mt-4">
        {tickets.length === 0 ? (
          <p>Nenhum ticket com resposta encontrado.</p>
        ) : (
          <ul>
            {tickets.map(ticket => (
              <li key={ticket.id_ticket}>
                <strong>Descrição:</strong> {ticket.descricao}<br />
                <strong>Resposta:</strong> {ticket.resposta}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListarRespostas;
