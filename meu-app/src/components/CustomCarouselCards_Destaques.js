import React, { useState } from 'react';
import '../styles/CustomCarouselCards_Destaques.css';
import { MdAddShoppingCart } from 'react-icons/md';

const CustomCarouselCards_Destaques = ({ images, title, description, categories, price }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handleCartClick = () => {
    // Navigate to the Helldivers product page
    window.location.href = '/ProdutoHelldivers';
  };

  return (
    <div className="custom-carousel">
      <div className="carousel-content">
        <img src={images[selectedImage]} alt={`Slide ${selectedImage + 1}`} className="main-image" />
        <div className="carousel-description">
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="carousel-categories">
            {categories.map((category, index) => (
              <span key={index} className="category">
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="price-cart">
          <span className="price">{price}</span>
          <button className="cart-button" onClick={handleCartClick}>
            <MdAddShoppingCart />
          </button>
        </div>
      </div>
      <div className="thumbnail-slider">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Thumbnail ${index + 1}`} 
            onClick={() => handleThumbnailClick(index)}
            className={selectedImage === index ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarouselCards_Destaques;
