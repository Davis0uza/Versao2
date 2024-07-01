import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdicionarCategoria() {
  const [nome, setNome] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const novaCategoria = { nome };

    axios.post('http://localhost:3000/categorias', novaCategoria)
      .then(() => {
        navigate('/categorias');
      })
      .catch(error => {
        console.error("Erro ao adicionar categoria:", error);
      });
  };

  return (
    <div>
      <h1>Adicionar Categoria</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AdicionarCategoria;
