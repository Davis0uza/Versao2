import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NovoTicket = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    descricao: '',
    id_user: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/tickets', form);
      navigate('/tickets');
    } catch (error) {
      console.error('Erro ao adicionar ticket:', error);
    }
  };

  return (
    <div>
      <h1>Novo Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="id_user">Usuário:</label>
          <select
            id="id_user"
            name="id_user"
            value={form.id_user}
            onChange={handleChange}
          >
            <option value="">Selecione um usuário</option>
            {users.map((user) => (
              <option key={user.id_user} value={user.id_user}>
                {user.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default NovoTicket;
