import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditarProduto() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [idVersao, setIdVersao] = useState('');
  const [fotoproduto, setFotoProduto] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/produtos/all')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const handleProdutoChange = (e) => {
    const produtoId = e.target.value;
    const produto = produtos.find(p => p.id_produto === parseInt(produtoId));
    setProdutoSelecionado(produto);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco);
    setIdCategoria(produto.id_categoria);
    setIdVersao(produto.id_versao);
  };

  const handleFileChange = (e) => {
    setFotoProduto(e.target.files[0]);
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
        formData.append('descricao', descricao);
        formData.append('preco', preco);
        formData.append('id_categoria', idCategoria);
        formData.append('id_versao', idVersao);
        if (fotoproduto) formData.append('fotoproduto', fotoproduto);

        try {
          await axios.put(`http://localhost:3000/produtos/edit/${produtoSelecionado.id_produto}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          Swal.fire(
            'Atualizado!',
            'Os dados do produto foram atualizados.',
            'success'
          );
          navigate('/produtos');
        } catch (error) {
          console.error("Erro ao atualizar produto:", error);
          Swal.fire(
            'Erro!',
            'Ocorreu um erro ao atualizar os dados do produto.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div>
      <h1>Editar Produto</h1>
      <div>
        <label>Produto:</label>
        <select onChange={handleProdutoChange} required>
          <option value="">Selecione um produto</option>
          {produtos.map(produto => (
            <option key={produto.id_produto} value={produto.id_produto}>
              {produto.id_produto} - {produto.nome}
            </option>
          ))}
        </select>
      </div>
      {produtoSelecionado && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div>
            <label>Descrição:</label>
            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          </div>
          <div>
            <label>Preço:</label>
            <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required />
          </div>
          <div>
            <label>Categoria:</label>
            <input type="text" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} required />
          </div>
          <div>
            <label>Versão:</label>
            <input type="text" value={idVersao} onChange={(e) => setIdVersao(e.target.value)} />
          </div>
          <div>
            <label>Foto do Produto:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button type="submit">Atualizar</button>
        </form>
      )}
    </div>
  );
}

export default EditarProduto;
