import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AreaGestorProdutos from './AreaGestorProdutos'; 

const CarrinhoGestores = () => {
  const [users, setUsers] = useState([]);
  const [carrinhos, setCarrinhos] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        console.log("Usuários recebidos:", response.data); // Adicionar log
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      console.log("Usuário selecionado:", selectedUser); // Adicionar log
      axios.get(`http://localhost:3000/carrino/user/${selectedUser}`)
        .then(response => {
          console.log("Carrinhos recebidos:", response.data); // Adicionar log
          setCarrinhos(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar carrinhos:", error);
        });
    } else {
      setCarrinhos([]);
    }
  }, [selectedUser]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <AreaGestorProdutos />
        </div>
        <div className="col-md-12">
          <div className="content-wrapper"> {/* Wrapper para o conteúdo */}
            <h2 style={{ color: '#164375', fontWeight: 'bold' }}>Carrinho dos Utilizadores</h2>
            <div className="mb-3">
              <label htmlFor="user" className="form-label">Utilizador:</label>
              <select 
                id="user" 
                className="form-select" 
                value={selectedUser} 
                onChange={(e) => setSelectedUser(e.target.value)} 
                required
              >
                <option value="">Selecione um utilizador</option>
                {users.map(user => (
                  <option key={user.id_user} value={user.id_user}>
                    {user.nome} ({user.id_user})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3 style={{ color: '#164375', fontWeight: 'bold' }}>Carrinhos de Compras</h3>
              <ul className="list-group">
                {carrinhos.map(carrinho => (
                  <li key={carrinho.id_carrinho} className="list-group-item">
                    <p>Utilizador: {carrinho.id_user}</p>
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
