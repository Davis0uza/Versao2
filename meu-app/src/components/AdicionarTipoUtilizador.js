import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AreaAdmin from './AreaAdmin';
import '../styles/AdicionarTipoUtilizador.css';

function AdicionarTipoUtilizador() {
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoTipoUtilizador = { descricao };

    axios.post('http://localhost:3000/tipoutilizador', novoTipoUtilizador)
      .then(() => {
        navigate('/tiposutilizador');
      })
      .catch(error => {
        console.error("Erro ao adicionar tipo de utilizador:", error);
      });
  };

  return (
    <div className="adicionar-container">
      <AreaAdmin />
      <h1 className="adicionar-title">Adicionar Tipo de Utilizador</h1>
      <form onSubmit={handleSubmit} className="adicionar-form">
        <div className="form-group">
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>
    </div>
  );
}

export default AdicionarTipoUtilizador;
