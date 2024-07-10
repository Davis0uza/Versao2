import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AreaAdmin from './AreaAdmin';

function TiposUtilizador() {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tipoutilizador').then(response => {
      setTipos(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados de tipos de utilizador:", error);
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
        axios.delete(`http://localhost:3000/tipoutilizador/${id}`)
          .then(() => {
            setTipos(tipos.filter(tipo => tipo.id_tipo !== id));
            Swal.fire(
              'Deletado!',
              'O tipo de utilizador foi removido.',
              'success'
            );
          })
          .catch(error => {
            console.error("Erro ao remover tipo de utilizador:", error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao remover o tipo de utilizador.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div>
      <AreaAdmin/>
      <h1>Tipos de Utilizador</h1>
      <Link to="/adicionar-tipo-utilizador">
        <button>Adicionar</button>
      </Link>
      <ul>
        {tipos.map(tipo => (
          <li key={tipo.id_tipo}>
            ID Tipo: {tipo.id_tipo}, Descrição: {tipo.descricao}
            <button onClick={() => handleDelete(tipo.id_tipo)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TiposUtilizador;
