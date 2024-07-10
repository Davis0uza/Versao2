import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AreaGestorProdutos from './AreaGestorProdutos'; // Importando o componente do menu lateral

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
    <div className="container mt-5">
      <AreaGestorProdutos />
      <div className="row">
        <div className="col">
          <h1 style={{ color: '#164375', fontWeight: 'bold' }} className="mb-4">Tickets</h1>
          <button onClick={() => navigate('/novoticket')} className="btn btn-primary mb-3">
            Adicionar Ticket
          </button>
          <ul className="list-group">
            {tickets.map((ticket) => (
              <li key={ticket.id_ticket} className="list-group-item d-flex justify-content-between align-items-center">
                {ticket.descricao}
                <button onClick={() => handleDelete(ticket.id_ticket)} className="btn btn-danger">
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
