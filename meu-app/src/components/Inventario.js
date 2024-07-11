import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AreaUser from './AreaUser';

const Inventario = () => {
  const [gestores, setGestores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [versoes, setVersoes] = useState([]);
  const [selectedGestor, setSelectedGestor] = useState('');
  const [filtroDLC, setFiltroDLC] = useState(false);
  const [ordenacao, setOrdenacao] = useState('alfabetica');

  useEffect(() => {
    axios.get('http://localhost:3000/gestores')
      .then(response => {
        setGestores(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar gestores:", error);
      });

    axios.get('http://localhost:3000/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar categorias:", error);
      });

    axios.get('http://localhost:3000/versoes')
      .then(response => {
        setVersoes(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar versões:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedGestor) {
      const getCategoriaNome = (id_categoria) => {
        const categoria = categorias.find(cat => cat.id_categoria === id_categoria);
        return categoria ? categoria.nome : 'Desconhecida';
      };

      axios.get(`http://localhost:3000/produtos/gestor/${selectedGestor}`)
        .then(response => {
          let produtosFiltrados = response.data;

          if (filtroDLC) {
            produtosFiltrados = produtosFiltrados.filter(produto => produto.Iddlc);
          }

          switch (ordenacao) {
            case 'alfabetica':
              produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
              break;
            case 'categoria':
              produtosFiltrados.sort((a, b) => getCategoriaNome(a.id_categoria).localeCompare(getCategoriaNome(b.id_categoria)));
              break;
            case 'tipo':
              produtosFiltrados.sort((a, b) => (a.Iddlc ? 1 : -1) - (b.Iddlc ? 1 : -1));
              break;
            default:
              break;
          }

          setProdutos(produtosFiltrados);
        })
        .catch(error => {
          console.error("Erro ao buscar produtos:", error);
        });
    } else {
      setProdutos([]);  // Limpa a lista de produtos quando nenhum gestor está selecionado
    }
  }, [selectedGestor, filtroDLC, ordenacao, categorias, versoes]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <AreaUser />
        </div>
        <div className="col-md-9">
          <div className="content-wrapper">
            <h2 style={{ color: '#164375', fontWeight: 'bold' }}>Inventário</h2>
            <div className="mb-3">
              <label htmlFor="gestor" className="form-label">Login iniciado como:</label>
              <select id="gestor" className="form-select" value={selectedGestor} onChange={(e) => setSelectedGestor(e.target.value)}>
                <option value="">Selecione um gestor</option>
                {gestores.map(gestor => (
                  <option key={gestor.id_gestor} value={gestor.id_gestor}>
                    {gestor.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="filtroDLC" checked={filtroDLC} onChange={(e) => setFiltroDLC(e.target.checked)} />
              <label className="form-check-label" htmlFor="filtroDLC">Filtrar por DLC</label>
            </div>
            <div className="mb-3">
              <label htmlFor="ordenacao" className="form-label">Ordenar por:</label>
              <select id="ordenacao" className="form-select" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                <option value="alfabetica">Ordem Alfabética</option>
                <option value="categoria">Categoria</option>
                <option value="tipo">Tipo de Produto</option>
              </select>
            </div>
            <div>
              <h3>Produtos</h3>
              <ul className="list-group">
                {produtos.map(produto => (
                  <li key={produto.id_produto} className="list-group-item">
                    {produto.nome} - {categorias.find(cat => cat.id_categoria === produto.id_categoria)?.nome || 'Desconhecida'} - {versoes.find(ver => ver.id_versao === produto.id_versao)?.nome || 'Desconhecida'} - {produto.Iddlc ? 'DLC' : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventario;
