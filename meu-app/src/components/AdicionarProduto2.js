import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuLateral from './MenuLateral'; 

function AdicionarProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState('');
  const [versao, setVersao] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
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
      console.error('Erro ao adicionar produto e versão:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <MenuLateral />
        </div>
        <div className="col-md-12">
          <div className="content-wrapper"> {/* Wrapper para o conteúdo */}
            <h1  style={{ color: '#164375', fontWeight: 'bold' }}>Adicionar Produto</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome:</label>
                <input type="text" id="nome" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="descricao" className="form-label">Descrição:</label>
                <input type="text" id="descricao" className="form-control" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="preco" className="form-label">Preço:</label>
                <input type="number" id="preco" className="form-control" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="idCategoria" className="form-label">Categoria:</label>
                <select id="idCategoria" className="form-select" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} required>
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="versao" className="form-label">Versão:</label>
                <input type="text" id="versao" className="form-control" value={versao} onChange={(e) => setVersao(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Adicionar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdicionarProduto;
