import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AreaGestorProdutos from './AreaGestorProdutos';

const AdicionarStock = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produtos/all');
        const produtosUnicos = response.data.reduce((acc, produto) => {
          if (!acc.find(p => p.nome === produto.nome)) {
            acc.push(produto);
          }
          return acc;
        }, []);
        setProdutos(produtosUnicos);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você deseja adicionar o estoque?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, adicionar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post('http://localhost:3000/produtos/addStock', {
            id_produto: produtoSelecionado,
            quantidade: parseInt(quantidade, 10)
          });
          Swal.fire(
            'Adicionado!',
            'O estoque foi adicionado com sucesso.',
            'success'
          );
          // Reset the form
          setProdutoSelecionado('');
          setQuantidade(0);
        } catch (error) {
          console.error('Erro ao adicionar estoque:', error);
          Swal.fire(
            'Erro!',
            'Houve um problema ao adicionar o estoque.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <AreaGestorProdutos />
        </div>
        <div className="col-md-12">
          <div className="content-wrapper"> {/* Wrapper para o conteúdo */}
            <h2 style={{ color: '#164375', fontWeight: 'bold' }}>Adicionar Stock</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="produto" className="form-label">Produto:</label>
                <select id="produto" className="form-select" value={produtoSelecionado} onChange={(e) => setProdutoSelecionado(e.target.value)} required>
                  <option value="">Selecione um produto</option>
                  {produtos.map(produto => (
                    <option key={produto.id_produto} value={produto.id_produto}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="quantidade" className="form-label">Quantidade:</label>
                <input style={{ borderColor: '#164375', borderWidth: '2px' }} type="number" id="quantidade" className="form-control" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Adicionar Stock</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdicionarStock;
