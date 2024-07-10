import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AreaAdmin from './AreaAdmin';
import { FaTrash } from 'react-icons/fa'; 

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados de categorias:", error);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/categorias/${id}`)
          .then(() => {
            setCategorias(categorias.filter(categoria => categoria.id_categoria !== id));
            Swal.fire(
              'Deletado!',
              'A categoria foi removida.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover categoria:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover a categoria.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div className="container mt-5">
      <AreaAdmin />
      <div className="categorias-wrapper">
        <h1 style={{ color: '#164375', fontWeight: 'bold' }} className="mb-4">Categorias</h1>
        <Link to="/adicionar-categoria" className="btn btn-primary mb-4">
          Adicionar Categoria
        </Link>
        <ul className="list-group">
          {categorias.map(categoria => (
            <li key={categoria.id_categoria} className="list-group-item d-flex justify-content-between align-items-center">
              <span>ID Categoria: {categoria.id_categoria}</span>
              <span>Nome: {categoria.nome}</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(categoria.id_categoria)}
              >
                <FaTrash /> Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categorias;
