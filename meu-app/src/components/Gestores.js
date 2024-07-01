import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Gestores() {
  const [gestores, setGestores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/gestores').then(response => {
      setGestores(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de gestores:", error);
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
        axios.delete(`http://localhost:3000/gestores/${id}`)
          .then(() => {
            setGestores(gestores.filter(gestor => gestor.id_gestor !== id));
            Swal.fire(
              'Deletado!',
              'O gestor foi removido.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover gestor:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover o gestor.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div>
      <h1>Gestores</h1>
      <Link to="/adicionar-gestor">
        <button>Adicionar</button>
      </Link>
      <ul>
        {gestores.map(gestor => (
          <li key={gestor.id_gestor}>
            {gestor.nome}
            <button onClick={() => handleDelete(gestor.id_gestor)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gestores;
