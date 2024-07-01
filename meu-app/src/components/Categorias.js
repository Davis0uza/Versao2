import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/categorias').then(response => {
      setCategorias(response.data);
    }).catch(error => {
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
    <div>
      <h1>Categorias</h1>
      <Link to="/adicionar-categoria">
        <button>Adicionar</button>
      </Link>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id_categoria}>
            ID Categoria: {categoria.id_categoria}, Nome: {categoria.nome}
            <button onClick={() => handleDelete(categoria.id_categoria)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;
