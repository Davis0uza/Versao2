import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuLateral from './MenuLateral';
import '../styles/AdicionarUsuario.css';

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
    <div className="container mt-5">
      <MenuLateral />
      <h1 className="text-center mb-4 add_user">Adicionar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome" className="label-custom">Nome:</label>
          <input type="text" id="nome" className="form-control input-custom" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="datanasc" className="label-custom">Data de Nascimento:</label>
          <input type="date" id="datanasc" className="form-control input-custom" value={datanasc} onChange={(e) => setDatanasc(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="telemovel" className="label-custom">Telemóvel:</label>
          <input type="text" id="telemovel" className="form-control input-custom" value={telemovel} onChange={(e) => setTelemovel(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label-custom">Email:</label>
          <input type="email" id="email" className="form-control input-custom" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label-custom">Password:</label>
          <input type="password" id="password" className="form-control input-custom" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="id_tipo" className="label-custom">ID Tipo:</label>
          <input type="number" id="id_tipo" className="form-control input-custom" value={id_tipo} onChange={(e) => setIdTipo(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="nif" className="label-custom">NIF:</label>
          <input type="text" id="nif" className="form-control input-custom" value={nif} onChange={(e) => setNif(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="morada" className="label-custom">Morada:</label>
          <input type="text" id="morada" className="form-control input-custom" value={morada} onChange={(e) => setMorada(e.target.value)} required />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-3">
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdicionarUsuario;
