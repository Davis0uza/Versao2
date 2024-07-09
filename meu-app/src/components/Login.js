import React from "react";
import { Link } from "react-router-dom";
import '../styles/Login.css';


function Login() {
  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100">
        <div className="form_container p-5 rounded bg-white shadow"> 
            <form>
            <h3 className="fw-bold entrar">Login</h3>
            <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Escreva o seu email" className="form-control"></input>
            </div>
            <div className="mb-2"> 
                <label htmlFor="password">Palavra-passe</label>
                <input type="password" placeholder="Escreva a sua password" className="form-control"></input>
            </div>
            <div className="mb-2">
                <input type="checkbox" className="custom-control custom-checkbox" id="check"/> 
                <label htmlFor="check" className="custom-input-label">
                    Lembrar-me
                </label>
            </div>
            <div className="d-grid">
                <button className="btn btn-primary">Login</button>
            </div>
            <p className="text-end mt-2">
                Esqueceu-se da <a href="">Password?</a><Link to="/registar" className="ms-2">Registar</Link>
            </p>
            </form>
        </div>
    </div>
  );
}

export default Login;
