import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdicionarProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState('');
  const [versao, setVersao] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/categorias')
      .then(response => {
        console.log("Categorias recebidas:", response.data);
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/produtos', {
        nome,
        descricao,
        preco,
        id_categoria: idCategoria,
        versao
      });

      navigate('/produtos');
    } catch (error) {
      console.error("Erro ao adicionar produto e versão:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
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
          <label>Categoria:</label>
          <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} required>
            <option value="">Selecione uma categoria</option>
            {categorias.map(categoria => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Versão:</label>
          <input type="text" value={versao} onChange={(e) => setVersao(e.target.value)} required />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AdicionarProduto;
