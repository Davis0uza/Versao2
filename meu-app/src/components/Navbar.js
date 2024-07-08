// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBook, FaSearch, FaTrash } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = ({ cart, removeFromCart, clearCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.preco * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div className="top-nav">
          <Link to="/about">Sobre</Link>
          <Link to="/contact">Contactos</Link>
          <Link to="/register">Registar</Link>
          <Link to="/login">Login</Link>
        </div>
        <div className="main-nav">
          <div className="nav-center">
            <img src="/path/to/logo.png" alt="Logo" className="logo" />
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Pesquisar..." />
            <button><FaSearch /></button>
          </div>
          <div className="nav-right">
            <Link to="/library" className="nav-icon">
              <FaBook />
            </Link>
            <div className="cart-icon-container">
              <div
                className="cart-icon"
                onClick={toggleCart}
              >
                <FaShoppingCart />
                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </div>
              {isCartOpen && (
                <div className="cart-dropdown">
                  <div className="cart-items">
                    {cart.map(product => (
                      <div key={product.id_produto} className="cart-item">
                        <img src={`http://localhost:3000/uploads/${product.fotoproduto}`} alt={product.nome} className="cart-item-img" />
                        <div className="cart-item-details">
                          <span>{product.nome}</span>
                          <span>{product.preco}€ x {product.quantity}</span>
                        </div>
                        <button onClick={() => removeFromCart(product)}>Remover</button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <strong>Total: {calculateTotal()}€</strong>
                  </div>
                  <button className="clear-cart-btn" onClick={clearCart}>
                    <FaTrash /> Limpar Carrinho
                  </button>
                  <button className="checkout-btn" onClick={() => alert('Comprar Agora')}>
                    <FaShoppingCart /> Comprar Agora
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
