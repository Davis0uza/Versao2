import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import MenuLateral from './MenuLateral';
import { AuthContext } from '../context/AuthContext';

const NovoTicket = () => {
  const [form, setForm] = useState({
    descricao: '',
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/tickets', { ...form, id_user: user.id_user });
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
