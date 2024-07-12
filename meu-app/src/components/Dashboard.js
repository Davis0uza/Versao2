import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../styles/Dashboard.css'; // Importar o CSS

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [dadosVendas, setDadosVendas] = useState([]);
  const [carrinhos, setCarrinhos] = useState([]);
  const [produtoMaisVendido, setProdutoMaisVendido] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchDadosVendas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/carrino/vendas');
        setDadosVendas(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados de vendas:', error);
      }
    };

    const fetchCarrinhos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/carrino/all');
        setCarrinhos(response.data);
      } catch (error) {
        console.error('Erro ao buscar carrinhos:', error);
      }
    };

    const fetchProdutoMaisVendido = async () => {
      try {
        const response = await axios.get('http://localhost:3000/carrino/produto-mais-vendido');
        setProdutoMaisVendido(response.data);
      } catch (error) {
        console.error('Erro ao buscar produto mais vendido:', error);
      }
    };

    fetchDadosVendas();
    fetchCarrinhos();
    fetchProdutoMaisVendido();
  }, []);

  const filteredCarrinhos = carrinhos.filter(carrinho =>
    carrinho.produtos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCarrinhos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCarrinhos.length / itemsPerPage);

  const data = {
    labels: dadosVendas.map((venda) => venda.dia),
    datasets: [
      {
        label: 'Total Vendas',
        data: dadosVendas.map((venda) => venda.totalVendas),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Total Vendidos',
        data: dadosVendas.map((venda) => venda.totalVendidos),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <h2>Dashboard de Vendas</h2>
        <div className="chart-container">
          <Line data={data} />
        </div>
      </div>
      <div className="dashboard-right">
        {produtoMaisVendido && (
          <div className="card-container">
            <h8>Produto mais vendido: {produtoMaisVendido.nome}</h8>
          </div>
        )}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar carrinhos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="carrinho-list">
          {currentItems.map((carrinho) => (
            <div key={carrinho.id_carrinho} className="carrinho-item">
              <p>Usuário: {carrinho.id_user}</p>
              <p>Data: {new Date(carrinho.data).toLocaleDateString()}</p>
              <p>Produtos: {carrinho.produtos}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
