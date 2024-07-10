import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Incluir credenciais (cookies)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to login: ' + error.message);
    }
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100">
        <div className="form_container p-5 rounded bg-white shadow"> 
            <form onSubmit={handleSubmit}>
            <h3 className="fw-bold entrar">Login</h3>
            <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Escreva o seu email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-2"> 
                <label htmlFor="password">Palavra-passe</label>
                <input type="password" placeholder="Escreva a sua password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-2">
                <input type="checkbox" className="custom-control custom-checkbox" id="check"/> 
                <label htmlFor="check" className="custom-input-label">
                    Lembrar-me
                </label>
            </div>
            <div className="d-grid">
                <button className="btn btn-primary" type="submit">Login</button>
            </div>
            <p className="text-end mt-2">
                Esqueceu-se da <a href="">Password?</a><Link to="/register" className="ms-2">Registar</Link>
            </p>
            </form>
        </div>
    </div>
  );
}

export default Login;
