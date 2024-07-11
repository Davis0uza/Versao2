import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AreaGestorProdutos from './AreaGestorProdutos';
import { FaTrash, FaPlus, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import '../styles/Categorias.css';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:3000/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados de categorias:", error);
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
        axios.delete(`http://localhost:3000/categorias/${id}`)
          .then(() => {
            setCategorias(categorias.filter(categoria => categoria.id_categoria !== id));
            Swal.fire(
              'Deletado!',
              'A categoria foi removida.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover categoria:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover a categoria.',
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

  const sortedAndFilteredCategorias = () => {
    let filteredCategorias = categorias.filter(categoria =>
      categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'id_asc':
        filteredCategorias.sort((a, b) => a.id_categoria - b.id_categoria);
        break;
      case 'id_desc':
        filteredCategorias.sort((a, b) => b.id_categoria - a.id_categoria);
        break;
      case 'name_asc':
        filteredCategorias.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'name_desc':
        filteredCategorias.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        break;
    }
    return filteredCategorias;
  };

  const paginatedCategorias = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredCategorias().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedAndFilteredCategorias().length / itemsPerPage);

  return (
    <div className="categorias-container">
      <AreaGestorProdutos />
      <div className="categorias-header">
        <h1>Categorias
          <Link to="/adicionar-categoria">
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
      <ul className="categorias-list">
        {paginatedCategorias().map(categoria => (
          <li key={categoria.id_categoria}>
            <div className="categoria-info">
              <div className="primary-info">
                <p>ID Categoria: {categoria.id_categoria}, Nome: {categoria.nome}</p>
              </div>
              <div className="action-buttons">
                <button className="delete-button" onClick={() => handleDelete(categoria.id_categoria)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="categorias-pagination">
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
};

export default Categorias;
