// CadsDestaques.jsx
import React, { useEffect, useState } from "react";
import '../styles/CardDestaques.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { MdOutlineShoppingCart } from "react-icons/md";

function Cards_destaques({ addToCart }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/produtos/sem-gestor')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  return (
    <div>
      <div className="title-container">
        <h3 className="fw-bold">Destaques</h3>
      </div>
      <CardGroup className="Cards">
        {produtos.map(produto => (
          <Card className="product-card position-relative" key={produto.id_produto}>
            <div className="img-container">
              <Card.Img className="card_img" variant="top" src={`http://localhost:3000/uploads/${produto.fotoproduto}`} />
            </div>
            <Card.Body className="card-body">
              <Card.Title>{produto.nome}</Card.Title>
              <Card.Text className="category-text">
                Categoria: {produto.categoria}
              </Card.Text>
              <Card.Text className="product-description">
                {produto.descricao}
              </Card.Text>
              <div className="price-and-cart">
                <span className="product-price">{produto.preco}€</span>
                <Button className="add-to-cart-btn" variant="primary" onClick={() => addToCart(produto)}>
                  <MdOutlineShoppingCart /> +
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}

export default Cards_destaques;
