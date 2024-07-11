import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaSearch, FaTrash, FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/Gestores.css';
import AreaAdmin from './AreaAdmin';

function Gestores() {
  const [gestores, setGestores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:3000/gestores')
      .then(response => {
        setGestores(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados de gestores:", error);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/gestores/${id}`)
          .then(() => {
            setGestores(gestores.filter(gestor => gestor.id_gestor !== id));
            Swal.fire(
              'Deletado!',
              'O gestor foi removido.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover gestor:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover o gestor.',
              'error'
            );
          });
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

  const sortedAndFilteredGestores = () => {
    let filteredGestores = gestores.filter(gestor =>
      gestor.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'id_asc':
        filteredGestores.sort((a, b) => a.id_gestor - b.id_gestor);
        break;
      case 'id_desc':
        filteredGestores.sort((a, b) => b.id_gestor - a.id_gestor);
        break;
      case 'name_asc':
        filteredGestores.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'name_desc':
        filteredGestores.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        break;
    }
    return filteredGestores;
  };

  const paginatedGestores = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredGestores().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedAndFilteredGestores().length / itemsPerPage);

  return (
    <div className="gestores-container">
      <AreaAdmin />
      <div className="gestores-header">
        <h1>Autorizados a Comprar
          <Link to="/adicionar-gestor">
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
      <ul className="gestores-list">
        {paginatedGestores().map(gestor => (
          <li key={gestor.id_gestor}>
            <div className="gestor-info">
              <div className="primary-info">
                <p>ID: {gestor.id_gestor}</p>
                <p>Nome: {gestor.nome}</p>
              </div>
              <div className="action-buttons">
                <button className="delete-button" onClick={() => handleDelete(gestor.id_gestor)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="gestores-pagination">
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

export default Gestores;
