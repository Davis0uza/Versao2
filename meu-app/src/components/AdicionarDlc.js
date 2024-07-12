import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdicionarDlc.css';

const AdicionarDlc = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [versao, setVersao] = useState('');
  const [idProdutoPai, setIdProdutoPai] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar produtos não DLCs e sem gestor
    axios.get('http://localhost:3000/produtos/sem-gestor-e-sem-dlc')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos não DLCs e sem gestor:", error);
      });

    // Buscar categorias
    axios.get('http://localhost:3000/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoDlc = {
      nome,
      descricao,
      preco,
      id_categoria: idCategoria,
      versao, // Nome da nova versão
      Iddlc: parseInt(idProdutoPai) // O campo Iddlc recebe o ID do produto pai como um inteiro
    };

    axios.post('http://localhost:3000/produtos/adicionar-dlc', novoDlc)
      .then(response => {
        console.log('DLC adicionada:', response.data);
        navigate('/dlcs');
      })
      .catch(error => {
        console.error('Erro ao adicionar DLC:', error);
      });
  };

  return (
    <div className="adicionar-dlc-container">
      <div className="adicionar-dlc-header">
        <h2>Adicionar DLC</h2>
      </div>
      <form className="adicionar-dlc-form" onSubmit={handleSubmit}>
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
        <div>
          <label>Linkar a:</label>
          <select value={idProdutoPai} onChange={(e) => setIdProdutoPai(e.target.value)} required>
            <option value="">Selecione um produto</option>
            {produtos.map(produto => (
              <option key={produto.id_produto} value={produto.id_produto}>
                {produto.id_produto} - {produto.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Adicionar DLC</button>
      </form>
    </div>
  );
};

export default AdicionarDlc;
