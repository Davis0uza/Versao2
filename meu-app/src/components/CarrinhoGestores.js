import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Carrinho dos Gestores</h2>
      <div>
        <label>Usuário:</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Selecione um usuário</option>
          {users.map(user => (
            <option key={user.id_user} value={user.id_user}>
              {user.nome} ({user.id_user})
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Carrinhos de Compras</h3>
        <ul>
          {carrinhos.map(carrinho => (
            <li key={carrinho.id_carrinho}>
              <p>Usuário: {carrinho.id_user}</p>
              <p>Produtos: {carrinho.produtos}</p>
              <p>Data: {new Date(carrinho.data).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarrinhoGestores;
