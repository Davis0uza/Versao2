import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AreaAdmin from './AreaAdmin';
import '../styles/AdicionarGestor.css';
import { FaUserPlus, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';

function AdicionarGestor() {
  const [usuarios, setUsuarios] = useState([]);
  const [gestores, setGestores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
      });

    axios.get('http://localhost:3000/gestores')
      .then(response => {
        setGestores(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar gestores:", error);
      });
  }, []);

  const handlePromote = (id, nome) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você quer promover ${nome} a gestor?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, promover!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:3000/gestores', { id_gestor: id, nome: `${id} ${nome}` })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Usuário promovido!',
              showConfirmButton: false,
              timer: 1500
            });

            // Atualizar listas de usuários e gestores
            setUsuarios(usuarios.filter(usuario => usuario.id_user !== id));
            setGestores([...gestores, { id_gestor: id, nome: `${id} ${nome}` }]);

            navigate('/gestores');
          })
          .catch(error => {
            console.error("Erro ao promover usuário:", error);
            Swal.fire({
              icon: 'error',
              title: 'Erro ao promover usuário',
              text: 'Ocorreu um erro ao tentar promover o usuário.'
            });
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

  const sortedAndFilteredUsuarios = () => {
    let filteredUsuarios = usuarios.filter(usuario =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'id_asc':
        filteredUsuarios.sort((a, b) => a.id_user - b.id_user);
        break;
      case 'id_desc':
        filteredUsuarios.sort((a, b) => b.id_user - a.id_user);
        break;
      case 'name_asc':
        filteredUsuarios.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'name_desc':
        filteredUsuarios.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        break;
    }
    return filteredUsuarios;
  };

  const paginatedUsuarios = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredUsuarios().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedAndFilteredUsuarios().length / itemsPerPage);

  return (
    <div className="adicionar-gestor-container">
      <AreaAdmin />
      <div className="adicionar-gestor-header">
        <h1>Adicionar Gestores</h1>
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
        {paginatedUsuarios().filter(usuario => !usuario.id_gestor).map(usuario => (
          <li key={usuario.id_user}>
            <div className="usuario-info">
              <p>ID: {usuario.id_user}, Nome: {usuario.nome}</p>
              <button className="promote-button" onClick={() => handlePromote(usuario.id_user, usuario.nome)}>
                <FaUserPlus /> Promover
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="usuarios-pagination">
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

export default AdicionarGestor;
