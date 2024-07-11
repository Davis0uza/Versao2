import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PromoverTipoUtilizador.css';

const PromoverTipoUtilizador = () => {
  const [users, setUsers] = useState([]);
  const [tiposUtilizador, setTiposUtilizador] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
      });

    axios.get('http://localhost:3000/tipoutilizador')
      .then(response => {
        setTiposUtilizador(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar tipos de utilizador:", error);
      });
  }, []);

  const handlePromover = async () => {
    if (selectedUser && selectedTipo) {
      try {
        await axios.put(`http://localhost:3000/users/${selectedUser}`, {
          id_tipo: selectedTipo
        });
        alert('Tipo de utilizador atualizado com sucesso');
      } catch (error) {
        console.error("Erro ao atualizar tipo de utilizador:", error);
        alert('Erro ao atualizar tipo de utilizador');
      }
    } else {
      alert('Selecione um usuário e um tipo de utilizador');
    }
  };

  return (
    <div className="promover-container">
      <h2 className="promover-title">Promover Tipo de Utilizador</h2>
      <div className="form-group">
        <label>Usuário:</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="form-control">
          <option value="">Selecione um usuário</option>
          {users.map(user => (
            <option key={user.id_user} value={user.id_user}>
              {user.nome} ({user.id_user})
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Tipo de Utilizador:</label>
        <select value={selectedTipo} onChange={(e) => setSelectedTipo(e.target.value)} className="form-control">
          <option value="">Selecione um tipo de utilizador</option>
          {tiposUtilizador.map(tipo => (
            <option key={tipo.id_tipo} value={tipo.id_tipo}>
              {tipo.descricao}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handlePromover} className="btn btn-primary">Atualizar Tipo de Utilizador</button>
    </div>
  );
};

export default PromoverTipoUtilizador;
