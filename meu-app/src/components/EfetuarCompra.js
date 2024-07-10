import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AreaGestorProdutos from './AreaGestorProdutos';

const EfetuarCompra = () => {
  const [gestores, setGestores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedGestor, setSelectedGestor] = useState('');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

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
        console.log("Produtos recebidos:", response.data); // Log para depuração
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const addToCart = (produto) => {
    setCart([...cart, produto]);
    setTotal(total + produto.preco);
    setProdutos(produtos.filter(p => p.id_produto !== produto.id_produto)); // Remove o produto da lista
  };

  const handleConfirm = async () => {
    const productIds = cart.map(produto => produto.id_produto);
    const productDetails = cart.map(produto => `${produto.nome} - ${produto.preco}`).join(', ');

    // Log para depuração
    console.log('Product IDs:', productIds);
    console.log('Selected Gestor:', selectedGestor);

    try {
      // Adiciona um novo registro na tabela carrinho
      const carrinhoResponse = await axios.post('http://localhost:3000/carrino', {
        id_user: selectedGestor,
        produtos: productDetails
      });

      if (carrinhoResponse.status === 201) {
        console.log('Carrinho atualizado com sucesso.');

        // Atualiza o id_gestor dos produtos
        for (const id of productIds) {
          await axios.put('http://localhost:3000/produtos/update-gestor', {
            id,
            id_gestor: selectedGestor
          });
        }

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
      } else {
        console.error('Erro ao adicionar ao carrinho:', carrinhoResponse.data);
      }
    } catch (error) {
      console.error('Erro ao efetuar compra:', error);
    }
  };

  return (
    <div>
      <AreaGestorProdutos/>
      <h2>Efetuar Compra</h2>
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
        <ul>
          {produtos.map(produto => (
            <li key={produto.id_produto}>
              {produto.nome} - {produto.preco} (Disponível: {produto.quantidade})
              <button onClick={() => addToCart(produto)}>+ Carrinho</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Carrinho</h3>
        <ul>
          {cart.map((produto, index) => (
            <li key={`${produto.id_produto}-${index}`}>
              {produto.nome} - {produto.preco}
            </li>
          ))}
        </ul>
        <div>Total: {total}</div>
        <button onClick={handleConfirm}>Confirmar Compra</button>
      </div>
    </div>
  );
};

export default EfetuarCompra;
