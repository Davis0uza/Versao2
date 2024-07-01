import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdicionarUsuario() {
  const [nome, setNome] = useState('');
  const [datanasc, setDatanasc] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id_tipo, setIdTipo] = useState('');
  const [nif, setNif] = useState('');
  const [morada, setMorada] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoUsuario = {
      nome,
      datanasc,
      telemovel,
      email,
      password,
      id_tipo,
      nif,
      morada,
    };

    axios.post('http://localhost:3000/users', novoUsuario)
      .then(() => {
        navigate('/usuarios');
      })
      .catch(error => {
        console.error("Erro ao adicionar usuário:", error);
      });
  };

  return (
    <div>
      <h1>Adicionar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input type="date" value={datanasc} onChange={(e) => setDatanasc(e.target.value)} required />
        </div>
        <div>
          <label>Telemóvel:</label>
          <input type="text" value={telemovel} onChange={(e) => setTelemovel(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>ID Tipo:</label>
          <input type="number" value={id_tipo} onChange={(e) => setIdTipo(e.target.value)} required />
        </div>
        <div>
          <label>NIF:</label>
          <input type="text" value={nif} onChange={(e) => setNif(e.target.value)} required />
        </div>
        <div>
          <label>Morada:</label>
          <input type="text" value={morada} onChange={(e) => setMorada(e.target.value)} required />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AdicionarUsuario;
