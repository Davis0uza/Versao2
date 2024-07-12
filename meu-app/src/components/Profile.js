import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import '../styles/Profile.css';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nif, setNif] = useState('');
  const [morada, setMorada] = useState('');
  const [telemovel, setTelemovel] = useState('');

  useEffect(() => {
    if (user && user.id_user) {
      fetch(`http://localhost:3000/users/profile/${user.id_user}`)
        .then(response => response.json())
        .then(data => {
          console.log(data); // Adicione este log para verificar os dados recebidos
          setName(data.nome || '');
          setDob(data.datanasc ? data.datanasc.split('T')[0] : ''); // Ajuste para data no formato 'YYYY-MM-DD'
          setEmail(data.email || '');
          setNif(data.nif || '');
          setMorada(data.morada || '');
          setTelemovel(data.telemovel || '');
        })
        .catch(error => console.error('Erro ao obter dados do perfil:', error));
    }
  }, [user]);

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => setShowEdit(true);

  const handleSaveChanges = () => {
    fetch(`http://localhost:3000/users/profile/${user.id_user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: name,
        datanasc: dob,
        email: email,
        password: password,
        nif: nif,
        morada: morada,
        telemovel: telemovel
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Adicione este log para verificar os dados recebidos após a atualização
        setName(data.nome || '');
        setDob(data.datanasc ? data.datanasc.split('T')[0] : ''); // Ajuste para data no formato 'YYYY-MM-DD'
        setEmail(data.email || '');
        setNif(data.nif || '');
        setMorada(data.morada || '');
        setTelemovel(data.telemovel || '');
        setShowEdit(false);
      })
      .catch(error => console.error('Erro ao atualizar dados do perfil:', error));
  };

  return (
    <Container className="d-flex flex-column container">
      <div className="profile-box p-4 rounded">
        <Row className="mb-3">
          <Col>
            <h5 className="mb-2">Nome</h5>
            <Form.Label className="label-style">{name}</Form.Label>
          </Col>
          <Col>
            <h5 className="mb-2">Data de Nascimento</h5>
            <Form.Label className="label-style">{dob}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h5 className="mb-2">Email</h5>
            <Form.Label className="label-style">{email}</Form.Label>
          </Col>
          <Col>
            <h5 className="mb-2">Telemóvel</h5>
            <Form.Label className="label-style">{telemovel}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h5 className="mb-2">NIF</h5>
            <Form.Label className="label-style">{nif}</Form.Label>
          </Col>
          <Col>
            <h5 className="mb-2">Morada</h5>
            <Form.Label className="label-style">{morada}</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className="mb-2">Palavra Passe</h5>
            <Form.Label className="label-style">{'*'.repeat(password.length)}</Form.Label>
          </Col>
        </Row>
      </div>
      <div className="button-group">
        <Button variant="primary" onClick={handleEditShow} className="edit-button small-button">Editar Perfil</Button>
        <Button variant="danger" onClick={() => window.confirm('Tem certeza de que deseja apagar a conta? Esta ação não pode ser desfeita.') && console.log('Conta Apagada')} className="delete-button small-button">Apagar Conta</Button>
      </div>

      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDob">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTelemovel">
              <Form.Label>Telemóvel</Form.Label>
              <Form.Control type="text" value={telemovel} onChange={(e) => setTelemovel(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNif">
              <Form.Label>NIF</Form.Label>
              <Form.Control type="text" value={nif} onChange={(e) => setNif(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMorada">
              <Form.Label>Morada</Form.Label>
              <Form.Control type="text" value={morada} onChange={(e) => setMorada(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Palavra Passe</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>Fechar</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Guardar Alterações</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
