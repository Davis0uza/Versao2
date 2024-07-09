import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import MenuLateral from './MenuLateral';
import '../styles/EditarUser.css'; 

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
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3000/produtos/all')
      .then(response => {
        setProdutos(response.data);

        if (id) {
          const produto = response.data.find(p => p.id_produto === parseInt(id));
          if (produto) {
            setProdutoSelecionado(produto);
            setNome(produto.nome);
            setDescricao(produto.descricao);
            setPreco(produto.preco);
            setIdCategoria(produto.id_categoria);
            setIdVersao(produto.id_versao);
          }
        }
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, [id]);

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
    <div className="container mt-5">
      <MenuLateral />
      <h1  className="text-center mb-4">Editar Produto</h1>
      <div className="form-group">
        <label htmlFor="produtoSelect">Produto:</label>
        <select
          id="produtoSelect"
          className="form-control"
          onChange={handleProdutoChange}
          value={produtoSelecionado ? produtoSelecionado.id_produto : ''}
          required
        >
          <option value="">Selecione um produto</option>
          {produtos.map(produto => (
            <option key={produto.id_produto} value={produto.id_produto}>
              {produto.id_produto} - {produto.nome}
            </option>
          ))}
        </select>
      </div>
      {produtoSelecionado && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <input
              type="text"
              id="descricao"
              className="form-control"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="preco">Preço:</label>
            <input
              type="number"
              step="0.01"
              id="preco"
              className="form-control"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="idCategoria">Categoria:</label>
            <input
              type="text"
              id="idCategoria"
              className="form-control"
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="idVersao">Versão:</label>
            <input
              type="text"
              id="idVersao"
              className="form-control"
              value={idVersao}
              onChange={(e) => setIdVersao(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fotoproduto">Foto do Produto:</label>
            <input
              type="file"
              id="fotoproduto"
              className="form-control-file"
              onChange={handleFileChange}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary mt-3">
              Atualizar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditarProduto;
