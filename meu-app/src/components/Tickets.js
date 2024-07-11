import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AreaGestorProdutos from './AreaGestorProdutos'; // Importando o componente do menu lateral
import { FaTrash, FaPlus, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import '../styles/Tickets.css';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next') {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev') {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortedAndFilteredTickets = () => {
    let filteredTickets = tickets.filter(ticket =>
      ticket.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'id_asc':
        filteredTickets.sort((a, b) => a.id_ticket - b.id_ticket);
        break;
      case 'id_desc':
        filteredTickets.sort((a, b) => b.id_ticket - a.id_ticket);
        break;
      case 'name_asc':
        filteredTickets.sort((a, b) => a.descricao.localeCompare(b.descricao));
        break;
      case 'name_desc':
        filteredTickets.sort((a, b) => b.descricao.localeCompare(a.descricao));
        break;
      default:
        break;
    }
    return filteredTickets;
  };

  const paginatedTickets = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredTickets().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedAndFilteredTickets().length / itemsPerPage);

  return (
    <div className="tickets-container">
      <AreaGestorProdutos />
      <div className="tickets-header">
        <h1>Tickets
          <Link to="/novoticket">
            <button className="add-button">
              <FaPlus />
            </button>
          </Link>
        </h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button" onClick={() => setSearchTerm('')}>
            <FaSearch />
          </button>
          <select value={sortCriteria} onChange={handleSortChange}>
            <option value="">Ordenar por</option>
            <option value="id_asc">ID Crescente</option>
            <option value="id_desc">ID Decrescente</option>
            <option value="name_asc">Ordem Alfabética Crescente</option>
            <option value="name_desc">Ordem Alfabética Decrescente</option>
          </select>
        </div>
      </div>
      <ul className="tickets-list">
        {paginatedTickets().map(ticket => (
          <li key={ticket.id_ticket}>
            <div className="ticket-info">
              <div className="primary-info">
                <p>ID Ticket: {ticket.id_ticket}, Descrição: {ticket.descricao}</p>
              </div>
              <div className="action-buttons">
                <button className="delete-button" onClick={() => handleDelete(ticket.id_ticket)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="tickets-pagination">
        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
          <FaArrowLeft /> Anterior
        </button>
        <span>{currentPage}/{totalPages}</span>
        <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
          Próxima <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Tickets;
