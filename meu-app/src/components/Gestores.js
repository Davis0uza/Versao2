import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, ListGroup, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import AreaAdmin from './AreaAdmin';

function Gestores() {
  const [gestores, setGestores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/gestores')
      .then(response => {
        setGestores(response.data);
      })
      .catch(error => {
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
    <Container className="mt-5">
      <AreaAdmin/>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#164375', fontWeight: 'bold' }}>Gestores</h1>
        <Link to="/adicionar-gestor">
          <Button variant="primary">Adicionar Gestor</Button>
        </Link>
      </div>
      <ListGroup>
        {gestores.map(gestor => (
          <ListGroup.Item key={gestor.id_gestor} className="d-flex justify-content-between align-items-center">
            {gestor.nome}
            <div >
              <Link to={`/editar-gestor/${gestor.id_gestor}`} className="btn btn-outline-primary me-2">
                Editar
              </Link>
              <Button style={{ margin:'5px' }} variant="outline-danger" onClick={() => handleDelete(gestor.id_gestor)}>
                Remover
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Gestores;
