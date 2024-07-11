import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AreaGestorProdutos from './AreaGestorProdutos';
import { FaArrowLeft, FaArrowRight, FaSearch, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import '../styles/EfetuarCompra.css';

const EfetuarCompra = () => {
  const [gestores, setGestores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedGestor, setSelectedGestor] = useState('');
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:3000/gestores')
      .then(response => {
        setGestores(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar gestores:", error);
      });

    axios.get('http://localhost:3000/produtos/sem-gestor')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const addToCart = (produto, quantidade, setSliderValue) => {
    if (quantidade < 1 || quantidade > produto.quantidade) {
      Swal.fire('Erro', 'Quantidade inválida', 'error');
      return;
    }

    const newCartItems = Array(quantidade).fill(produto);
    setCart([...cart, ...newCartItems]);
    setTotal(prevTotal => parseFloat((prevTotal + produto.preco * quantidade).toFixed(2)));

    // Atualizar a quantidade disponível do produto
    const updatedProdutos = produtos.map(p => {
      if (p.nome === produto.nome) {
        return { ...p, quantidade: p.quantidade - quantidade };
      }
      return p;
    });
    setProdutos(updatedProdutos);

    // Resetar o slider para 1
    setSliderValue(1);
  };

  const removeFromCart = (index) => {
    const produtoRemovido = cart[index];
    setCart(cart.filter((_, i) => i !== index));
    setTotal(prevTotal => parseFloat((prevTotal - produtoRemovido.preco).toFixed(2)));

    // Atualizar a quantidade disponível do produto
    const updatedProdutos = produtos.map(p => {
      if (p.nome === produtoRemovido.nome) {
        return { ...p, quantidade: p.quantidade + 1 };
      }
      return p;
    });
    setProdutos(updatedProdutos);
  };

  const handleConfirm = async () => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Confirme a compra dos itens selecionados.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, confirmar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const productDetails = cart.map(produto => ({ nome: produto.nome, preco: produto.preco }));

        try {
          // Adiciona um novo registro na tabela carrinho
          const carrinhoResponse = await axios.post('http://localhost:3000/carrino', {
            id_user: selectedGestor,
            produtos: productDetails
          });

          if (carrinhoResponse.status === 201) {
            console.log('Carrinho atualizado com sucesso.');

            // Limpa o carrinho e atualiza a lista de produtos
            setCart([]);
            setTotal(0);
            axios.get('http://localhost:3000/produtos/sem-gestor')
              .then(response => {
                setProdutos(response.data);
              })
              .catch(error => {
                console.error("Erro ao buscar produtos:", error);
              });

            Swal.fire(
              'Compra Efetuada!',
              'Os produtos foram comprados com sucesso.',
              'success'
            );
          } else {
            console.error('Erro ao adicionar ao carrinho:', carrinhoResponse.data);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao efetuar a compra.',
              'error'
            );
          }
        } catch (error) {
          console.error('Erro ao efetuar compra:', error);
          Swal.fire(
            'Erro!',
            'Ocorreu um erro ao efetuar a compra.',
            'error'
          );
        }
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

  const sortedAndFilteredProdutos = () => {
    let filteredProdutos = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortCriteria) {
      case 'id_asc':
        filteredProdutos.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'id_desc':
        filteredProdutos.sort((a, b) => b.nome.localeCompare(a.nome));
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
    <div className="efetuar-compra-container">
      <AreaGestorProdutos />
      <div className="efetuar-compra-header">
        <h1>Efetuar Compra</h1>
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
            <option value="id_asc">Nome Crescente</option>
            <option value="id_desc">Nome Decrescente</option>
          </select>
        </div>
      </div>
      <div>
        <label>Selecionar Gestor:</label>
        <select value={selectedGestor} onChange={(e) => setSelectedGestor(e.target.value)}>
          <option value="">Selecione um gestor</option>
          {gestores.map(gestor => (
            <option key={gestor.id_gestor} value={gestor.id_gestor}>
              {gestor.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Produtos</h3>
        <ul className="produtos-list">
          {paginatedProdutos().map(produto => (
            <li key={produto.nome}>
              <div className="produto-info">
                <div className="primary-info">
                  <p>{produto.nome} - {produto.preco}€ (Disponível: {produto.quantidade})</p>
                </div>
                <div className="action-buttons">
                  <QtySlider produto={produto} addToCart={addToCart} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination-container">
          <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
            <FaArrowLeft /> Anterior
          </button>
          <span>{currentPage}/{totalPages}</span>
          <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
            Próxima <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="carrinho-container">
        <h3>Carrinho</h3>
        <ul>
          {cart.map((produto, index) => (
            <li key={`${produto.nome}-${index}`} className="cart-item">
              <span>{produto.nome} - {produto.preco}€</span>
              <button className="remove-from-cart-button" onClick={() => removeFromCart(index)}>
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
        <div className="total">Total: {total.toFixed(2)}€</div>
        <button className="confirm-button" onClick={handleConfirm}>Confirmar Compra</button>
      </div>
    </div>
  );
};

const QtySlider = ({ produto, addToCart }) => {
  const [sliderValue, setSliderValue] = useState(1);

  return (
    <div className="qty-slider-container">
      <input
        type="range"
        min="1"
        max={produto.quantidade}
        value={sliderValue}
        className="qty-slider"
        onChange={(e) => setSliderValue(parseInt(e.target.value))}
      />
      <input
        type="number"
        min="1"
        max={produto.quantidade}
        value={sliderValue}
        readOnly
        className="qty-input"
      />
      <button
        className="add-to-cart-button"
        onClick={() => addToCart(produto, sliderValue, setSliderValue)}
      >
        <FaShoppingCart /> +
      </button>
    </div>
  );
};

export default EfetuarCompra;
