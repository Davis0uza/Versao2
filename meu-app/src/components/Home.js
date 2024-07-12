import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../Assets/slider.jpg';
import image2 from '../Assets/slider2.jpg';
import image3 from '../Assets/slider3.jpg';
import AreaHome from "./AreaHome";

function Home() {
  const slides = [
    { image: image1, title: "Título 1", description: "Descrição 1" },
    { image: image2, title: "Título 2", description: "Descrição 2" },
    { image: image3, title: "Título 3", description: "Descrição 3" },
  ];

  return (
    <div className="main-content">
      <AreaHome/>
      <div className="title-container">
        <h3 className="fw-bold">Destaques</h3>
      </div>
      <div className="carousel-container">
        <Carousel
          indicators={false}
          nextIcon={<span aria-hidden="true" className="carousel-control-next-icon custom-arrow" />}
          prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon custom-arrow" />}
        >
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={slide.image}
                alt={`Slide ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Home;
