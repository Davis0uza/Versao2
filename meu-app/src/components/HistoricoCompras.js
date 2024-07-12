import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AreaGestorProdutos from './AreaGestorProdutos';
import { AuthContext } from '../context/AuthContext';

const CarrinhoGestores = () => {
  const { user } = useContext(AuthContext); // Obter usuário logado do contexto
  const [carrinhos, setCarrinhos] = useState([]);

  useEffect(() => {
    if (user && user.id_user) {
      axios.get(`http://localhost:3000/carrino/user/${user.id_user}`)
        .then(response => {
          console.log("Carrinhos recebidos:", response.data);
          setCarrinhos(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar carrinhos:", error);
        });
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <AreaGestorProdutos />
        </div>
        <div className="col-md-12">
          <div className="content-wrapper"> {/* Wrapper para o conteúdo */}
            <h2 style={{ color: '#164375', fontWeight: 'bold' }}>Histórico de Compras</h2>
            <div>
              <ul className="list-group">
                {carrinhos.map(carrinho => (
                  <li key={carrinho.id_carrinho} className="list-group-item">
                    <p>ID: {carrinho.id_carrinho}</p>
                    <p>Produtos: {carrinho.produtos}</p>
                    <p>Data: {new Date(carrinho.data).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrinhoGestores;
