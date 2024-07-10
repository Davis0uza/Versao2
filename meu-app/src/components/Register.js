import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [nome, setNome] = useState('');
  const [datanasc, setDatanasc] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nif, setNif] = useState('');
  const [morada, setMorada] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, datanasc, telemovel, email, password, nif, morada }),
        credentials: 'include', // Incluir credenciais (cookies)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      alert('Registro bem-sucedido');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register: ' + error.message);
    }
  };

  return (
    <div className="register template d-flex justify-content-center align-items-center 100-w vh-100">
      <div className="form_container p-5 rounded bg-white shadow"> 
        <form onSubmit={handleSubmit}>
          <h3 className="fw-bold entrar">Registrar</h3>
          <div className="mb-2">
            <label htmlFor="nome">Nome</label>
            <input type="text" placeholder="Escreva o seu nome" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="datanasc">Data de Nascimento</label>
            <input type="date" className="form-control" value={datanasc} onChange={(e) => setDatanasc(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="telemovel">Telemóvel</label>
            <input type="text" placeholder="Escreva o seu telemóvel" className="form-control" value={telemovel} onChange={(e) => setTelemovel(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Escreva o seu email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Palavra-passe</label>
            <input type="password" placeholder="Escreva a sua password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="nif">NIF</label>
            <input type="text" placeholder="Escreva o seu NIF" className="form-control" value={nif} onChange={(e) => setNif(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="morada">Morada</label>
            <input type="text" placeholder="Escreva a sua morada" className="form-control" value={morada} onChange={(e) => setMorada(e.target.value)} required />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
