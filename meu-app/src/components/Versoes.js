import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AreaGestorProdutos from './AreaGestorProdutos';
import '../styles/Versoes.css';
import { FaTrash, FaPlus, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';

function Versoes() {
  const [versoes, setVersoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:3000/versoes').then(response => {
      setVersoes(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de versões:", error);
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
        axios.delete(`http://localhost:3000/versoes/${id}`)
          .then(() => {
            setVersoes(versoes.filter(versao => versao.id_versao !== id));
            Swal.fire(
              'Deletado!',
              'A versão foi removida.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover versão:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover a versão.',
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

  const sortedAndFilteredVersoes = () => {
    let filteredVersoes = versoes.filter(versao =>
      versao.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'id_asc':
        filteredVersoes.sort((a, b) => a.id_versao - b.id_versao);
        break;
      case 'id_desc':
        filteredVersoes.sort((a, b) => b.id_versao - a.id_versao);
        break;
      case 'name_asc':
        filteredVersoes.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'name_desc':
        filteredVersoes.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        break;
    }
    return filteredVersoes;
  };

  const paginatedVersoes = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredVersoes().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedAndFilteredVersoes().length / itemsPerPage);

  return (
    <div className="versoes-container">
      <AreaGestorProdutos />
      <div className="versoes-header">
        <h1>Versões
          <Link to="/adicionar-versao">
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
      <ul className="versoes-list">
        {paginatedVersoes().map(versao => (
          <li key={versao.id_versao}>
            <div className="versao-info">
              <div className="primary-info">
                <p>ID Versão: {versao.id_versao}, Nome: {versao.nome}</p>
              </div>
              <div className="action-buttons">
                <button className="delete-button" onClick={() => handleDelete(versao.id_versao)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="versoes-pagination">
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

export default Versoes;
