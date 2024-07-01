import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdicionarProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [id_categoria, setIdCategoria] = useState('');
  const [id_versao, setIdVersao] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoProduto = {
      nome,
      descricao,
      preco,
      id_categoria,
      id_versao
    };

    axios.post('http://localhost:3000/produtos', novoProduto)
      .then(() => {
        navigate('/produtos');
      })
      .catch(error => {
        console.error("Erro ao adicionar produto:", error);
      });
  };

  return (
    <div>
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Preço:</label>
          <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        </div>
        <div>
          <label>ID Categoria:</label>
          <input type="number" value={id_categoria} onChange={(e) => setIdCategoria(e.target.value)} required />
        </div>
        <div>
          <label>ID Versão:</label>
          <input type="number" value={id_versao} onChange={(e) => setIdVersao(e.target.value)} required />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AdicionarProduto;
