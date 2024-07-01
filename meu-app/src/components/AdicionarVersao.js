import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdicionarVersao() {
  const [nome, setNome] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [idProduto, setIdProduto] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Buscar lista de produtos
    axios.get('http://localhost:3000/produtos')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Criar nova versão
      const novaVersao = await axios.post('http://localhost:3000/versoes', {
        nome,
        id_produto: idProduto
      });

      // Atualizar produto com a nova versão
      await axios.put(`http://localhost:3000/produtos/${idProduto}`, {
        id_versao: novaVersao.data.id_versao
      });

      navigate('/versoes');
    } catch (error) {
      console.error("Erro ao adicionar versão:", error);
    }
  };

  return (
    <div>
      <h1>Adicionar Versão</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Produto:</label>
          <select value={idProduto} onChange={(e) => setIdProduto(e.target.value)} required>
            <option value="">Selecione um produto</option>
            {produtos.map(produto => (
              <option key={produto.id_produto} value={produto.id_produto}>
                {produto.id_produto} - {produto.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AdicionarVersao;
