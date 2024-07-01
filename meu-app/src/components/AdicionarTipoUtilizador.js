import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Adicionar Tipo de Utilizador</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição:</label>
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AdicionarTipoUtilizador;
