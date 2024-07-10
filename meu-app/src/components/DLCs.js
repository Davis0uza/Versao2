import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AreaGestorProdutos from './AreaGestorProdutos';

const Dlcs = () => {
  const [dlcs, setDlcs] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [versoes, setVersoes] = useState({});
  const [produtos, setProdutos] = useState({});
  const [sortCriteria, setSortCriteria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3000/produtos/dlcs')
      .then(response => {
        setDlcs(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar DLCs:', error);
      });

    axios.get('http://localhost:3000/categorias')
      .then(response => {
        const categoriasData = response.data.reduce((acc, categoria) => {
          acc[categoria.id_categoria] = categoria.nome;
          return acc;
        }, {});
        setCategorias(categoriasData);
      })
      .catch(error => {
        console.error('Erro ao buscar categorias:', error);
      });

    axios.get('http://localhost:3000/versoes')
      .then(response => {
        const versoesData = response.data.reduce((acc, versao) => {
          acc[versao.id_versao] = versao.nome;
          return acc;
        }, {});
        setVersoes(versoesData);
      })
      .catch(error => {
        console.error('Erro ao buscar versões:', error);
      });

    axios.get('http://localhost:3000/produtos')
      .then(response => {
        const produtosData = response.data.reduce((acc, produto) => {
          acc[produto.id_produto] = produto.nome;
          return acc;
        }, {});
        setProdutos(produtosData);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
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
            console.error('Erro ao remover DLC:', error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover o DLC.',
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
    <div>
       <AreaGestorProdutos></AreaGestorProdutos>
      <h1>DLCs</h1>
      <Link to="/adicionar-dlc">
        <button>Adicionar</button>
      </Link>
      <div>
        <label>Ordenar por: </label>
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="">Nenhum</option>
          <option value="id_asc">ID Crescente</option>
          <option value="id_desc">ID Decrescente</option>
          <option value="name_asc">Ordem Alfabética Crescente</option>
          <option value="name_desc">Ordem Alfabética Decrescente</option>
        </select>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => setSearchTerm('')}>Limpar Pesquisa</button>
      </div>
      <ul>
        {paginatedDlcs().map(dlc => (
          <li key={dlc.id_produto}>
            Nome: {dlc.nome}, Descrição: {dlc.descricao}, Preço: {dlc.preco}, Categoria: {categorias[dlc.id_categoria]}, Versão: {versoes[dlc.id_versao]}, Software: {produtos[dlc.id_produto]}
            <button onClick={() => handleDelete(dlc.id_produto)}>Remover</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Anterior</button>
        <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Próxima</button>
        <span>{currentPage}/{totalPages}</span>
      </div>
    </div>
  );
};

export default Dlcs;
