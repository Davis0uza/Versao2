import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import MenuLateral from './MenuLateral'; 

function Versoes() {
  const [versoes, setVersoes] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchVersoes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/versoes');
        setVersoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de versões:", error);
      }
    };

    fetchVersoes();
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <MenuLateral />
        </div>
        <div className="col-md-12">
          <div className="content-wrapper"> {/* Wrapper para o conteúdo */}
            <h1 >Versões</h1>
            <Link to="/adicionar-versao">
              <button className="btn btn-primary mb-3">Adicionar</button>
            </Link>
            <div className="mb-3">
              <label htmlFor="sortCriteria" className="form-label">Ordenar por:</label>
              <select id="sortCriteria" className="form-select" value={sortCriteria} onChange={handleSortChange}>
                <option value="">Nenhum</option>
                <option value="id_asc">ID Crescente</option>
                <option value="id_desc">ID Decrescente</option>
                <option value="name_asc">Ordem Alfabética Crescente</option>
                <option value="name_desc">Ordem Alfabética Decrescente</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="btn btn-secondary mt-2" onClick={() => setSearchTerm('')}>Limpar Pesquisa</button>
            </div>
            <ul className="list-group">
              {paginatedVersoes().map(versao => (
                <li key={versao.id_versao} className="list-group-item d-flex justify-content-between align-items-center">
                  ID Versão: {versao.id_versao}, Nome: {versao.nome}
                  <button onClick={() => handleDelete(versao.id_versao)} className="btn btn-danger">Remover</button>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <button className="btn btn-primary me-2" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Anterior</button>
              <span>{currentPage}/{totalPages}</span>
              <button className="btn btn-primary ms-2" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Próxima</button>
            </div><br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Versoes;
