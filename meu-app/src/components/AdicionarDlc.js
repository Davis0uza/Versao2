import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdicionarDlc.css';

const AdicionarDlc = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [idVersao, setIdVersao] = useState('');
  const [idProdutoPai, setIdProdutoPai] = useState('');
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Buscar produtos não DLCs
    axios.get('http://localhost:3000/produtos/nondlcs')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos não DLCs:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoDlc = {
      nome,
      descricao,
      preco,
      id_categoria: idCategoria,
      id_versao: idVersao,
      Iddlc: idProdutoPai // O campo Iddlc recebe o ID do produto pai
    };

    axios.post('http://localhost:3000/produtos', novoDlc)
      .then(response => {
        console.log('DLC adicionada:', response.data);
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
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>
        <div>
          <label>Preço:</label>
          <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} />
        </div>
        <div>
          <label>Categoria:</label>
          <input type="text" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} />
        </div>
        <div>
          <label>Versão:</label>
          <input type="text" value={idVersao} onChange={(e) => setIdVersao(e.target.value)} />
        </div>
        <div>
          <label>Linkar a:</label>
          <select value={idProdutoPai} onChange={(e) => setIdProdutoPai(e.target.value)}>
            <option value="">Selecione um produto</option>
            {produtos.map(produto => (
              <option key={produto.id_produto} value={produto.id_produto}>
                {produto.nome}
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
