import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaSearch, FaTrash, FaChevronDown, FaChevronUp, FaPlus, FaEdit, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/Usuarios.css';
import MenuLateral from './MenuLateral';

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedUser, setExpandedUser] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3000/users').then(response => {
      setUsers(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de usuários:", error);
    });

    axios.get('http://localhost:3000/tipoutilizador').then(response => {
      setTipos(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de tipos de usuário:", error);
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
        axios.delete(`http://localhost:3000/users/${id}`)
          .then(() => {
            setUsers(users.filter(user => user.id_user !== id));
            Swal.fire(
              'Deletado!',
              'O usuário foi removido.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover usuário:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover o usuário.',
              'error'
            );
          });
      }
    });
  };

  const getTipoNome = (id_tipo) => {
    const tipo = tipos.find(tipo => tipo.id_tipo === id_tipo);
    return tipo ? tipo.descricao : 'Desconhecido';
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
    setExpandedUser(expandedUser === id ? null : id);
  };

  const handleEdit = (id) => {
    navigate(`/editaruser/${id}`);
  };

  const sortedAndFilteredUsers = () => {
    let filteredUsers = users.filter(user => 
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'id_asc':
        filteredUsers.sort((a, b) => a.id_user - b.id_user);
        break;
      case 'id_desc':
        filteredUsers.sort((a, b) => b.id_user - a.id_user);
        break;
      case 'name_asc':
        filteredUsers.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'name_desc':
        filteredUsers.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        break;
    }
    return filteredUsers;
  };

  const paginatedUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredUsers().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedAndFilteredUsers().length / itemsPerPage);

  return (
    <div className="app-container">
      <MenuLateral />
      <div className="usuarios-container">
        <div className="usuarios-header">
          <h1>Usuários
            <Link to="/adicionar-usuario">
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
        <ul className="usuarios-list">
          {paginatedUsers().map(user => (
            <li key={user.id_user} className={expandedUser === user.id_user ? 'expanded' : ''}>
              <div className="user-info">
                <div className="primary-info">
                  <img src={`http://localhost:3000/uploads/${user.fotoperfil}`} alt={user.nome} />
                  <p>ID: {user.id_user}</p>
                  <p>Nome: {user.nome}</p>
                  <p>Email: {user.email}</p>
                  <button className="toggle-button" onClick={() => toggleExpand(user.id_user)}>
                    {expandedUser === user.id_user ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(user.id_user)}>
                    <FaEdit />
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(user.id_user)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="extra-info">
                <p>Data de Nascimento: {user.datanasc}</p>
                <p>Telemóvel: {user.telemovel}</p>
                <p>Morada: {user.morada}</p>
                <p>Tipo: {getTipoNome(user.id_tipo)}</p>
                <p>NIF: {user.nif}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="usuarios-pagination">
          <button 
            onClick={() => handlePageChange('prev')} 
            disabled={currentPage === 1}
          >
            <FaArrowLeft /> Anterior
          </button>
          <span>{currentPage}/{totalPages}</span>
          <button 
            onClick={() => handlePageChange('next')} 
            disabled={currentPage === totalPages}
          >
            Próxima <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;
