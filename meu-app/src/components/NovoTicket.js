import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import MenuLateral from './MenuLateral'; 

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
      Swal.fire(
        'Sucesso!',
        'O ticket foi adicionado com sucesso.',
        'success'
      );
      navigate('/tickets');
    } catch (error) {
      console.error('Erro ao adicionar ticket:', error);
      Swal.fire(
        'Erro!',
        'Ocorreu um erro ao adicionar o ticket.',
        'error'
      );
    }
  };

  return (
    <div className="container mt-5">
      <MenuLateral />
      <h1 style={{ color: '#164375', fontWeight: 'bold' }} className=" mb-4">Novo Ticket</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <input style={{ borderColor: '#164375', borderWidth: '2px' }}
            type="text"
            id="descricao"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group" >
          <label htmlFor="id_user">Usuário:</label>
          <select style={{ borderColor: '#164375', borderWidth: '2px' }}
            id="id_user"
            name="id_user"
            value={form.id_user}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Selecione um usuário</option>
            {users.map((user) => (
              <option key={user.id_user} value={user.id_user}>
                {user.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-3">
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovoTicket;
