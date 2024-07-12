import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaSearch, FaTrash, FaChevronDown, FaChevronUp, FaPlus, FaEdit, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/DLCs.css';
import AreaGestorProdutos from './AreaGestorProdutos';

function DLCs() {
  const [dlcs, setDlcs] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [versoes, setVersoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDlc, setExpandedDlc] = useState(null);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/produtos/dlcs').then(response => {
      setDlcs(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de DLCs:", error);
    });

    axios.get('http://localhost:3000/categorias').then(response => {
      setCategorias(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de categorias:", error);
    });

    axios.get('http://localhost:3000/versoes').then(response => {
      setVersoes(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de versões:", error);
    });

    axios.get('http://localhost:3000/produtos/all').then(response => {
      setProdutos(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de produtos:", error);
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
        axios.delete(`http://localhost:3000/produtos/${id}`)
          .then(() => {
            setDlcs(dlcs.filter(dlc => dlc.id_produto !== id));
            Swal.fire(
              'Deletado!',
              'O DLC foi removido.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover DLC:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover o DLC.',
              'error'
            );
          });
      }
    });
  };

  const getCategoriaNome = (id) => {
    const categoria = categorias.find(categoria => categoria.id_categoria === id);
    return categoria ? categoria.nome : 'Desconhecida';
  };

  const getVersaoNome = (id) => {
    const versao = versoes.find(versao => versao.id_versao === id);
    return versao ? versao.nome : 'Desconhecida';
  };

  const getProdutoNome = (id) => {
    const produto = produtos.find(produto => produto.id_produto === id);
    return produto ? produto.nome : id;
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

  const toggleExpand = (id) => {
    setExpandedDlc(expandedDlc === id ? null : id);
  };

  const handleEdit = (id) => {
    navigate(`/editarproduto/${id}`);
  };

  const sortedAndFilteredDlcs = () => {
    let filteredDlcs = dlcs.filter(dlc => 
      dlc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dlc.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'id_asc':
        filteredDlcs.sort((a, b) => a.id_produto - b.id_produto);
        break;
      case 'id_desc':
        filteredDlcs.sort((a, b) => b.id_produto - a.id_produto);
        break;
      case 'name_asc':
        filteredDlcs.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'name_desc':
        filteredDlcs.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        break;
    }
    return filteredDlcs;
  };

  const paginatedDlcs = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredDlcs().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedAndFilteredDlcs().length / itemsPerPage);

  return (
    <div className="dlcs-container">
      <AreaGestorProdutos />
      <div className="dlcs-header">
        <h1>DLCs
          <Link to="/adicionar-dlc">
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
      <ul className="dlcs-list">
        {paginatedDlcs().map(dlc => (
          <li key={dlc.id_produto} className={expandedDlc === dlc.id_produto ? 'expanded' : ''}>
            <div className="dlc-info">
              <div className="primary-info">
                <img src={`http://localhost:3000/uploads/${dlc.fotodlc}`} alt={dlc.nome} />
                <p>ID: {dlc.id_produto}</p>
                <p>Nome: {dlc.nome}</p>
                <p>Categoria: {getCategoriaNome(dlc.id_categoria)}</p>
                <button className="toggle-button" onClick={() => toggleExpand(dlc.id_produto)}>
                  {expandedDlc === dlc.id_produto ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              <div className="action-buttons">
                <button className="edit-button" onClick={() => handleEdit(dlc.id_produto)}>
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => handleDelete(dlc.id_produto)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="additional-info">
              <p>Descrição: {dlc.descricao}</p>
              <p>Preço: {dlc.preco}€</p>
              <p>Versão: {getVersaoNome(dlc.id_versao)}</p>
              <p>Software: {getProdutoNome(dlc.id_produto)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="dlcs-pagination">
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

export default DLCs;
