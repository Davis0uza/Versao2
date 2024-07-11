import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import '../styles/Profile.css';

const ProfilePage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState('John Doe');
  const [dob, setDob] = useState('1990-01-01');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('password123'); // Store the plain text for demonstration

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => setShowEdit(true);

  const handleSaveChanges = () => {
    // Handle save changes logic here (e.g., validation, API call, etc.)
    setShowEdit(false);
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
        <Row>
          <h2 className="mb-4">Informação de Contactos</h2>
          <Col>
            <h5 className="mb-2">Associar email</h5>
            <Form.Label className="label-style">{email}</Form.Label>
          </Col>
          <Col>
            <h5 className="mb-2">Palavra Passe</h5>
            <Form.Label className="label-style">{'*'.repeat(password.length)}</Form.Label>
          </Col>
        </Row>
      </div>
      <div className="button-group">
        <Button variant="primary" onClick={handleEditShow} className="edit-button small-button">Editar Perfil</Button>
        <Button variant="danger" onClick={() => window.confirm('Are you sure you want to delete your account? This action cannot be undone.') && console.log('Account Deleted')} className="delete-button small-button">Apagar Conta</Button>
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
