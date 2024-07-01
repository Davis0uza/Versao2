import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaSearch, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/Carrinho.css';

function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3000/carrino')
      .then(response => {
        setCarrinho(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados de carrinho:", error);
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
        axios.delete(`http://localhost:3000/carrino/${id}`)
          .then(() => {
            setCarrinho(carrinho.filter(item => item.id_carrinho !== id));
            Swal.fire(
              'Deletado!',
              'O item do carrinho foi removido.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover item do carrinho:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover o item do carrinho.',
              'error'
            );
          });
      }
    });
  };

  const handleSearch = () => {
    axios.get(`http://localhost:3000/carrino?search=${searchTerm}`)
      .then(response => {
        setCarrinho(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados de carrinho:", error);
      });
  };

  const handleSort = (a, b) => {
    switch (sortOption) {
      case 'ID':
        return a.id_carrinho - b.id_carrinho;
      case 'Ascendente':
        return a.id_carrinho - b.id_carrinho;
      case 'Descendente':
        return b.id_carrinho - a.id_carrinho;
      case 'Alfabetica':
        return (a.produtos || '').localeCompare(b.produtos || '');
      default:
        return 0;
    }
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const sortedAndFilteredItems = carrinho
    .filter(item => 
      (item.produtos || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(handleSort);

  const pageCount = Math.ceil(sortedAndFilteredItems.length / itemsPerPage);
  const paginatedItems = sortedAndFilteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="carrinho-container">
      <div className="carrinho-header">
        <h1>Carrinho</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Ordenar por</option>
            <option value="ID">ID</option>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
            <option value="Alfabetica">Ordem Alfabética</option>
          </select>
        </div>
      </div>
      <ul className="carrinho-list">
        {paginatedItems.map(item => (
          <li key={item.id_carrinho}>
            ID Carrinho: {item.id_carrinho}, ID User: {item.id_user}, Data: {item.data}, Produtos: {item.produtos}
            <button onClick={() => handleDelete(item.id_carrinho)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <div className="carrinho-pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => handleChangePage(currentPage - 1)}
        >
          <FaArrowLeft /> Anterior
        </button>
        <span>{currentPage} / {pageCount}</span>
        <button 
          disabled={currentPage === pageCount} 
          onClick={() => handleChangePage(currentPage + 1)}
        >
          Próxima <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Carrinho;
