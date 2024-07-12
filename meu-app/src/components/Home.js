import React from "react";
import '../styles/CardDestaques.css'; 
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import image2 from '../Assets/building.jpg';
import image1 from '../Assets/Contactos-photo.jpg';
import image3 from '../Assets/building.jpg';
import image4 from '../Assets/building.jpg';
import image5 from '../Assets/building.jpg';
import image6 from '../Assets/Contactos-photo.jpg';
import image7 from '../Assets/building.jpg';
import image8 from '../Assets/building.jpg';
import image9 from '../Assets/building.jpg';
import image10 from '../Assets/building.jpg';
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomCarouselCards_Destaques from "./CustomCarouselCards_Destaques";

function Cards_destaques() {
  const images = [image5, image6, image7, image8, image9, image10];
  const title = "Exemplo de Título";
  const description = "Esta é uma descrição de exemplo.";
  const categories = ["Categoria 1"];
  const price = "9,99€";
  
  return (
    <div>
      <div className="title-container">
        <h3 className="fw-bold">Destaques</h3>
      </div>
      <CardGroup className="Cards">
        <Card className="position-relative" style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image6} />
          <Card.Body className="card-body">
            <Card.Title>Super Mario</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/ProdutoSuperMario">
                <Button className="btn-price">8,95€</Button>
              </Link>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image7} />
          <Card.Body className="card-body">
            <Card.Title>Legends of Zelda</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/ProdutoZelda">
                <Button className="btn-price">8,95€</Button>
              </Link>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image8} />
          <Card.Body className="card-body">
            <Card.Title>God of War: Ragnarok</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button className="btn-price">35,99€</Button>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image9} />
          <Card.Body className="card-body">
            <Card.Title>Elden Ring</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button className="btn-price">25,99€</Button>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image10} />
          <Card.Body className="card-body">
            <Card.Title>Red Dead Redemption 2</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button className="btn-price">9,99€</Button>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </CardGroup>

      <div className="carousel-container">
        <CustomCarouselCards_Destaques images={images} title={title} description={description} categories={categories} price={price} />
      </div>

      <CardGroup className="Cards">
        <Card className="position-relative" style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image6} />
          <Card.Body className="card-body">
            <Card.Title>Super Mario</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/ProdutoSuperMario">
                <Button className="btn-price">8,95€</Button>
              </Link>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image7} />
          <Card.Body className="card-body">
            <Card.Title>Legends of Zelda</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/ProdutoZelda">
                <Button className="btn-price">8,95€</Button>
              </Link>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image8} />
          <Card.Body className="card-body">
            <Card.Title>God of War: Ragnarok</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button className="btn-price">35,99€</Button>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image9} />
          <Card.Body className="card-body">
            <Card.Title>Elden Ring</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button className="btn-price">25,99€</Button>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image10} />
          <Card.Body className="card-body">
            <Card.Title>Red Dead Redemption 2</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button className="btn-price">9,99€</Button>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </CardGroup>
      
      <CardGroup className="Cards">
        <Card className="position-relative" style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image6} />
          <Card.Body className="card-body">
            <Card.Title>Super Mario</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/ProdutoSuperMario">
                <Button className="btn-price">8,95€</Button>
              </Link>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image7} />
          <Card.Body className="card-body">
            <Card.Title>Legends of Zelda</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/ProdutoZelda">
                <Button className="btn-price">8,95€</Button>
              </Link>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image8} />
          <Card.Body className="card-body">
            <Card.Title>God of War: Ragnarok</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button className="btn-price">35,99€</Button>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image9} />
          <Card.Body className="card-body">
            <Card.Title>Elden Ring</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button className="btn-price">25,99€</Button>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img className="card_img" variant="top" src={image10} />
          <Card.Body className="card-body">
            <Card.Title>Red Dead Redemption 2</Card.Title>
            <Card.Text>
              <p className="categoria">Categoria</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button className="btn-price">9,99€</Button>
              <Button className="btn-cart">
                <MdOutlineShoppingCart />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Cards_destaques;
