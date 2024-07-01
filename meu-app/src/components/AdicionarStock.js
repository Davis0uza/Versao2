import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdicionarStock = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/produtos')
      .then(response => {
        const produtosUnicos = response.data.reduce((acc, produto) => {
          if (!acc.find(p => p.nome === produto.nome)) {
            acc.push(produto);
          }
          return acc;
        }, []);
        setProdutos(produtosUnicos);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/produtos/addStock', {
      id_produto: produtoSelecionado,
      quantidade: parseInt(quantidade, 10)
    })
    .then(response => {
      console.log('Estoque adicionado:', response.data);
      // Reset the form or show success message
    })
    .catch(error => {
      console.error('Erro ao adicionar estoque:', error);
    });
  };

  return (
    <div>
      <h2>Adicionar Stock</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Produto:</label>
          <select value={produtoSelecionado} onChange={(e) => setProdutoSelecionado(e.target.value)}>
            <option value="">Selecione um produto</option>
            {produtos.map(produto => (
              <option key={produto.id_produto} value={produto.id_produto}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantidade:</label>
          <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        </div>
        <button type="submit">Adicionar Stock</button>
      </form>
    </div>
  );
};

export default AdicionarStock;
