import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaSearch, FaTrash, FaChevronDown, FaChevronUp, FaPlus, FaEdit, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/Produtos.css';
import AreaGestorProdutos from './AreaGestorProdutos';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [versoes, setVersoes] = useState([]);
  const [gestores, setGestores] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedProduto, setExpandedProduto] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3000/produtos/all').then(response => {
      setProdutos(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de produtos:", error);
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

    axios.get('http://localhost:3000/gestores').then(response => {
      setGestores(response.data);
    }).catch(error => {
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
        axios.delete(`http://localhost:3000/produtos/${id}`)
          .then(() => {
            setProdutos(produtos.filter(produto => produto.id_produto !== id));
            Swal.fire(
              'Deletado!',
              'O produto foi removido.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover produto:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover o produto.',
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

  const getGestorNome = (id) => {
    const gestor = gestores.find(gestor => gestor.id_gestor === id);
    return gestor ? gestor.nome : 'Desconhecido';
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
    setExpandedProduto(expandedProduto === id ? null : id);
  };

  const handleEdit = (id) => {
    navigate(`/editarproduto/${id}`);
  };

  const sortedAndFilteredProdutos = () => {
    let filteredProdutos = produtos.filter(produto => 
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'id_asc':
        filteredProdutos.sort((a, b) => a.id_produto - b.id_produto);
        break;
      case 'id_desc':
        filteredProdutos.sort((a, b) => b.id_produto - a.id_produto);
        break;
      case 'name_asc':
        filteredProdutos.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'name_desc':
        filteredProdutos.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        break;
    }
    return filteredProdutos;
  };

  const paginatedProdutos = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredProdutos().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedAndFilteredProdutos().length / itemsPerPage);

  return (
    <div className="produtos-container">
      <AreaGestorProdutos/>
      <div className="produtos-header">
        <h1>Produtos
          <Link to="/adicionar-produto">
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
      <ul className="produtos-list">
        {paginatedProdutos().map(produto => (
          <li key={produto.id_produto} className={expandedProduto === produto.id_produto ? 'expanded' : ''}>
            <div className="produto-info">
              <div className="primary-info">
                <img src={`http://localhost:3000/uploads/${produto.fotoproduto}`} alt={produto.fotoproduto} />
                <p>ID: {produto.id_produto}</p>
                <p>Nome: {produto.nome}</p>
                <p>Categoria: {getCategoriaNome(produto.id_categoria)}</p>
                <button className="toggle-button" onClick={() => toggleExpand(produto.id_produto)}>
                  {expandedProduto === produto.id_produto ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              <div className="action-buttons">
                <button className="edit-button" onClick={() => handleEdit(produto.id_produto)}>
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => handleDelete(produto.id_produto)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="extra-info">
              <p>Descrição: {produto.descricao}</p>
              <p>Preço: {produto.preco}</p>
              <p>Versão: {getVersaoNome(produto.id_versao)}</p>
              <p>Gestor: {getGestorNome(produto.id_gestor)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="produtos-pagination">
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

export default Produtos;
