import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuLateral from './MenuLateral'; 

function AdicionarVersao() {
  const [nome, setNome] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [idProduto, setIdProduto] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produtos/produtos-unicos');
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const produtoSelecionado = produtos.find(produto => produto.id_produto === parseInt(idProduto));
      const nomeProduto = produtoSelecionado.nome;

      // Adicionar nova versão
      const novaVersaoResponse = await axios.post('http://localhost:3000/versoes/nova-versao', {
        nome,
        id_produto: idProduto
      });

      // Atualizar produtos com o mesmo nome e id_gestor null para a nova versão
      await axios.put('http://localhost:3000/versoes/atualizar-produtos', {
        nome: nomeProduto,
        id_versao: novaVersaoResponse.data.id_versao
      });

      navigate('/versoes');
    } catch (error) {
      console.error("Erro ao adicionar versão:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <MenuLateral />
        </div>
        <div className="col-md-9">
          <div className="content-wrapper">
            <h1>Adicionar Versão</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome:</label>
                <input type="text" id="nome" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="idProduto" className="form-label">Produto:</label>
                <select id="idProduto" className="form-select" value={idProduto} onChange={(e) => setIdProduto(e.target.value)} required>
                  <option value="">Selecione um produto</option>
                  {produtos.map(produto => (
                    <option key={produto.id_produto} value={produto.id_produto}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Adicionar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdicionarVersao;
