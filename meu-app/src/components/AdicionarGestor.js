import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MenuLateral from './MenuLateral';

function AdicionarGestor() {
  const [usuarios, setUsuarios] = useState([]);
  const [gestores, setGestores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
      });

    axios.get('http://localhost:3000/gestores')
      .then(response => {
        setGestores(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar gestores:", error);
      });
  }, []);

  const handlePromote = (id, nome) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você quer promover ${nome} a gestor?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, promover!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:3000/gestores', { id_gestor: id, nome: `${id} ${nome}` })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Usuário promovido!',
              showConfirmButton: false,
              timer: 1500
            });

            // Atualizar listas de usuários e gestores
            setUsuarios(usuarios.filter(usuario => usuario.id_user !== id));
            setGestores([...gestores, { id_gestor: id, nome: `${id} ${nome}` }]);

            navigate('/gestores');
          })
          .catch(error => {
            console.error("Erro ao promover usuário:", error);
            Swal.fire({
              icon: 'error',
              title: 'Erro ao promover usuário',
              text: 'Ocorreu um erro ao tentar promover o usuário.'
            });
          });
      }
    });
  };

  return (
    <div>
      <MenuLateral />
      <div style={{ marginLeft: '260px', padding: '20px' }}>
        <h1>Adicionar Gestor</h1>
        <ul>
          {usuarios.filter(usuario => !usuario.id_gestor).map(usuario => (
            <li key={usuario.id_user}>
              {usuario.nome}
              <button onClick={() => handlePromote(usuario.id_user, usuario.nome)}>Promover</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdicionarGestor;
