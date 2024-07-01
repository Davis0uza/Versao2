import React, { useEffect, useState } from "react";
import '../styles/CardDestaques.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

function Cards_destaques() {
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
                <Link to={`/produto/${produto.id_produto}`}>
                  <Button className="add-to-cart-btn" variant="primary">
                    <MdOutlineShoppingCart /> +
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}

export default Cards_destaques;
