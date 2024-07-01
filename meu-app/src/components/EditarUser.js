import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditarUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [nome, setNome] = useState('');
  const [datanasc, setDatanasc] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [email, setEmail] = useState('');
  const [id_tipo, setIdTipo] = useState('');
  const [nif, setNif] = useState('');
  const [morada, setMorada] = useState('');
  const [fotoperfil, setFotoPerfil] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  const handleUsuarioChange = (e) => {
    const usuarioId = e.target.value;
    const usuario = usuarios.find(u => u.id_user === parseInt(usuarioId, 10));
    setUsuarioSelecionado(usuario);
    setNome(usuario.nome);
    setDatanasc(usuario.datanasc);
    setTelemovel(usuario.telemovel);
    setEmail(usuario.email);
    setIdTipo(usuario.id_tipo);
    setNif(usuario.nif);
    setMorada(usuario.morada);
  };

  const handleFileChange = (e) => {
    setFotoPerfil(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, atualizar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('datanasc', datanasc);
        formData.append('telemovel', telemovel);
        formData.append('email', email);
        formData.append('id_tipo', id_tipo);
        formData.append('nif', nif);
        formData.append('morada', morada);
        if (fotoperfil) formData.append('fotoperfil', fotoperfil);

        try {
          await axios.put(`http://localhost:3000/users/editar/${usuarioSelecionado.id_user}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          Swal.fire(
            'Atualizado!',
            'Os dados do usuário foram atualizados.',
            'success'
          );
          navigate('/usuarios');
        } catch (error) {
          console.error("Erro ao atualizar usuário:", error);
          Swal.fire(
            'Erro!',
            'Ocorreu um erro ao atualizar os dados do usuário.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div>
      <h1>Editar Usuário</h1>
      <div>
        <label>Usuário:</label>
        <select onChange={handleUsuarioChange} required>
          <option value="">Selecione um usuário</option>
          {usuarios.map(usuario => (
            <option key={usuario.id_user} value={usuario.id_user}>
              {usuario.id_user} - {usuario.nome}
            </option>
          ))}
        </select>
      </div>
      {usuarioSelecionado && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div>
            <label>Data de Nascimento:</label>
            <input type="date" value={datanasc} onChange={(e) => setDatanasc(e.target.value)} required />
          </div>
          <div>
            <label>Telemóvel:</label>
            <input type="text" value={telemovel} onChange={(e) => setTelemovel(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>ID Tipo:</label>
            <input type="number" value={id_tipo} onChange={(e) => setIdTipo(e.target.value)} required />
          </div>
          <div>
            <label>NIF:</label>
            <input type="text" value={nif} onChange={(e) => setNif(e.target.value)} required />
          </div>
          <div>
            <label>Morada:</label>
            <input type="text" value={morada} onChange={(e) => setMorada(e.target.value)} required />
          </div>
          <div>
            <label>Foto de Perfil:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button type="submit">Atualizar</button>
        </form>
      )}
    </div>
  );
}

export default EditarUsuario;
