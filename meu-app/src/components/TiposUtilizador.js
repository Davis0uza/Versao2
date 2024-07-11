import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AreaAdmin from './AreaAdmin';
import '../styles/TiposUtilizador.css';
import { FaTrash, FaPlus, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';

function TiposUtilizador() {
  const [tipos, setTipos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:3000/tipoutilizador').then(response => {
      setTipos(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de tipos de utilizador:", error);
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
        axios.delete(`http://localhost:3000/tipoutilizador/${id}`)
          .then(() => {
            setTipos(tipos.filter(tipo => tipo.id_tipo !== id));
            Swal.fire(
              'Deletado!',
              'O tipo de utilizador foi removido.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover tipo de utilizador:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover o tipo de utilizador.',
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

  const sortedAndFilteredTipos = () => {
    let filteredTipos = tipos.filter(tipo =>
      tipo.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'id_asc':
        filteredTipos.sort((a, b) => a.id_tipo - b.id_tipo);
        break;
      case 'id_desc':
        filteredTipos.sort((a, b) => b.id_tipo - a.id_tipo);
        break;
      case 'name_asc':
        filteredTipos.sort((a, b) => a.descricao.localeCompare(b.descricao));
        break;
      case 'name_desc':
        filteredTipos.sort((a, b) => b.descricao.localeCompare(a.descricao));
        break;
      default:
        break;
    }
    return filteredTipos;
  };

  const paginatedTipos = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredTipos().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedAndFilteredTipos().length / itemsPerPage);

  return (
    <div className="tipos-container">
      <AreaAdmin />
      <div className="tipos-header">
        <h1>Tipos de Utilizador
          <Link to="/adicionar-tipo-utilizador">
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
      <ul className="tipos-list">
        {paginatedTipos().map(tipo => (
          <li key={tipo.id_tipo}>
            <div className="tipo-info">
              <div className="primary-info">
                <p>ID Tipo: {tipo.id_tipo}, Descrição: {tipo.descricao}</p>
              </div>
              <div className="action-buttons">
                <button className="delete-button" onClick={() => handleDelete(tipo.id_tipo)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="tipos-pagination">
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

export default TiposUtilizador;
