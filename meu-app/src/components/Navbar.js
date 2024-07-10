import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBook, FaSearch, FaTrash } from 'react-icons/fa';
import '../styles/Navbar.css';
import logo from '../Assets/logo4tec.jpeg';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Navbar = ({ cart, removeFromCart, clearCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.preco * item.quantity, 0).toFixed(2);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não será capaz de reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, sair!'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login');
        Swal.fire(
          'Desconectado!',
          'Você foi desconectado com sucesso.',
          'success'
        );
      }
    });
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div className="top-nav">
          <Link to="/sobre">Sobre</Link>
          <Link to="/contactos">Contactos</Link>
          {user ? (
            <>
              <span>Bem-vindo, {user.nome}</span>
              <button onClick={handleLogout} className="btn btn-link">Logout</button>
            </>
          ) : (
            <>
              <Link to="/register">Registar</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
        <div className="main-nav">
          <div className="nav-center">
            <img src={logo} alt="Logo" className="logo" />
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
              <div className="cart-icon" onClick={toggleCart}>
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
                          <span>{product.preco.toFixed(2)}€ x {product.quantity}</span>
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
