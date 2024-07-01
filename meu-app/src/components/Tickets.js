import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados de tickets:', error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Não será possível reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/tickets/${id}`);
          Swal.fire('Removido!', 'O ticket foi removido.', 'success');
          fetchTickets();
        } catch (error) {
          Swal.fire('Erro!', 'Houve um problema ao remover o ticket.', 'error');
          console.error('Erro ao remover o ticket:', error);
        }
      }
    });
  };

  return (
    <div>
      <h1>Tickets</h1>
      <button onClick={() => navigate('/novoticket')}>Adicionar Ticket</button>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id_ticket}>
            {ticket.descricao}
            <button onClick={() => handleDelete(ticket.id_ticket)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;
