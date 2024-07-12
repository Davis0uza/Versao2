import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/Profile.css';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [nif, setNif] = useState('');
  const [morada, setMorada] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [fotoperfil, setFotoperfil] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (user && user.id_user) {
      fetch(`http://localhost:3000/users/profile/${user.id_user}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setName(data.nome || '');
          setDob(data.datanasc ? data.datanasc.split('T')[0] : '');
          setEmail(data.email || '');
          setNif(data.nif || '');
          setMorada(data.morada || '');
          setTelemovel(data.telemovel || '');
          setFotoperfil(data.fotoperfil || '');
        })
        .catch(error => console.error('Erro ao obter dados do perfil:', error));
    }
  }, [user]);

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => setShowEdit(true);

  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append('nome', name);
    formData.append('datanasc', dob);
    formData.append('email', email);
    formData.append('nif', nif);
    formData.append('morada', morada);
    formData.append('telemovel', telemovel);
    if (profileImage) {
      formData.append('fotoperfil', profileImage);
    }

    fetch(`http://localhost:3000/users/profile/${user.id_user}`, {
      method: 'PUT',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setName(data.nome || '');
        setDob(data.datanasc ? data.datanasc.split('T')[0] : '');
        setEmail(data.email || '');
        setNif(data.nif || '');
        setMorada(data.morada || '');
        setTelemovel(data.telemovel || '');
        setFotoperfil(data.fotoperfil || '');
        setShowEdit(false);
      })
      .catch(error => console.error('Erro ao atualizar dados do perfil:', error));
  };

  return (
    <Container className="d-flex flex-column container">
      <div className="profile-box p-4 rounded">
        <div className="text-center mb-4">
          <Image src={fotoperfil ? `http://localhost:3000/uploads/${fotoperfil}` : '/default-profile.png'} roundedCircle className="profile-image" />
        </div>
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
      </div>
      <div className="button-group">
        <Button variant="primary" onClick={handleEditShow} className="icon-button"><FaEdit /></Button>
        <Button variant="danger" onClick={() => window.confirm('Tem certeza de que deseja apagar a conta? Esta ação não pode ser desfeita.') && console.log('Conta Apagada')} className="icon-button red-button"><FaTrash /></Button>
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
            <Form.Group className="mb-3" controlId="formProfileImage">
              <Form.Label>Foto de Perfil</Form.Label>
              <Form.Control type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
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
