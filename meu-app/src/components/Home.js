import React, { useEffect, useState } from 'react';
import MenuLateral from './MenuLateral';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import '../styles/CardDestaques.css';

function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/produtos/all')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <MenuLateral />
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <div className="title-container">
          <h3 className="fw-bold">Destaques</h3>
        </div>
        <div className="container">
          <div className="row">
            {produtos.map(produto => (
              <div key={produto.id_produto} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <Card className="product-card position-relative h-100">
                  <div className="img-container">
                    <Card.Img className="card_img" variant="top" src={`http://localhost:3000/uploads/${produto.fotoproduto}`} />
                  </div>
                  <Card.Body className="card-body d-flex flex-column">
                    <Card.Title>{produto.nome}</Card.Title>
                    <Card.Text className="category-text">
                      Categoria: {produto.categoria}
                    </Card.Text>
                    <Card.Text className="product-description mt-3">
                      {produto.descricao}
                    </Card.Text>
                    <div className="price-and-cart mt-auto">
                      <span className="product-price">{produto.preco}€</span>
                      <Link to={`/produto/${produto.id_produto}`}>
                        <Button className="add-to-cart-btn" variant="primary">
                          <MdOutlineShoppingCart /> +
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
