import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaBook, FaSearch, FaTrash, FaTicketAlt, FaBoxes, FaUser, FaUsers, FaUserShield, FaUserCog, FaBoxOpen, FaPuzzlePiece, FaPlusSquare, FaHistory } from 'react-icons/fa';
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

  const renderMenu = () => {
    switch (user?.id_tipo) {
      case 1:
        return <AdminMenu />;
      case 2:
        return <UserMenu />;
      case 5:
        return <GestorMenu />;
      default:
        return null;
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div className="top-nav">
          {user ? (
            <>
              <span className="welcome-text">Seja bem-vindo, {user.nome}</span>
              <div className="nav-links">
                <span className="logout-link" onClick={handleLogout}>Logout</span>
                <Link to="/contactos">Contactos</Link>
                <Link to="/sobre">Sobre</Link>
              </div>
            </>
          ) : (
            <div className="nav-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Registar</Link>
              <Link to="/contactos">Contactos</Link>
              <Link to="/sobre">Sobre</Link>
            </div>
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
                        <button className="remove-item-btn" onClick={() => removeFromCart(product)}>
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <strong>Total: {calculateTotal()}€</strong>
                  </div>
                  <button className="clear-cart-btn" onClick={clearCart}>
                    Limpar Carrinho
                  </button>
                  <button className="checkout-btn" onClick={() => alert('Comprar Agora')}>
                    Comprar Agora
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {renderMenu()}
    </div>
  );
};

const AdminMenu = () => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <nav className="menu-lateral">
      <ul>
        <li onClick={() => toggleSubmenu('usuarios')}>
          <FaUsers className="icon" /> {/* Ícone para Usuários */}
          Users
          <ul className={openSubmenus['usuarios'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/usuarios">Listar Users</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('gestores')}>
          <FaUserShield className="icon" /> {/* Ícone para Gestores */}
          Compradores
          <ul className={openSubmenus['gestores'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/gestores">Autorizados a Comprar</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('tiposUtilizador')}>
          <FaUserCog className="icon" /> {/* Ícone para Tipos de Utilizador */}
          Tipos de Utilizador
          <ul className={openSubmenus['tiposUtilizador'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/tipos-utilizador">Listar Tipos de Utilizador</NavLink></li>
            <li><NavLink to="/promover-tipoutilizador">Promover Tipos de Utilizador</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('vendas')}>
          <FaShoppingCart  className="icon" /> {/* Ícone para Gestores */}
          Vendas
          <ul className={openSubmenus['vendas'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/carrinho">Carrinho</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard de Vendas</NavLink></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

const UserMenu = () => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (submenu) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [submenu]: !prevState[submenu]
    }));
  };

  return (
    <nav className="menu-lateral">
      <ul>
        <li onClick={() => toggleSubmenu('tickets')}>
          <FaTicketAlt className="icon" /> {/* Ícone para Usuários */}
          Tickets
          <ul className={openSubmenus['tickets'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/novo-ticket">Novo Ticket</NavLink></li>
            <li><NavLink to="/listar-respostas">Respostas</NavLink></li>
          </ul>
        </li>
        <li>
          <NavLink to="/inventario" className="menu-link">
            <div className="menu-item">
              <FaBoxes className="icon" /> {/* Ícone para Inventário */}
              <span className="menu-text">Inventário</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/carrinho-gestores" className="menu-link">
            <div className="menu-item">
              <FaHistory className="icon" /> {/* Ícone para Perfil */}
              Histórico  de Compras
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/perfil" className="menu-link">
            <div className="menu-item">
              <FaUser className="icon" /> {/* Ícone para Perfil */}
              <span className="menu-text">Perfil</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const GestorMenu = () => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <nav className="menu-lateral">
      <ul>
        <li onClick={() => toggleSubmenu('produtos')}>
          <FaBoxOpen className="icon" /> {/* Ícone para Usuários */}
          Produtos
          <ul className={openSubmenus['produtos'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/produtos">Listar Produtos</NavLink></li>
            <li><NavLink to="/versoes">Versões</NavLink></li>
            <li><NavLink to="/categorias">Categorias</NavLink></li>
            <li><NavLink to="/adicionar-stock">Adicionar Stock</NavLink></li>
            <li><NavLink to="/efetuar-compra">Atribuir Produtos</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('dlcs')}>
          <FaPuzzlePiece className="icon" /> {/* Ícone para Gestores */}
          Add-ons
          <ul className={openSubmenus['dlcs'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/dlcs">Listar Add-ons</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('tickets')}>
          <FaTicketAlt className="icon" /> {/* Ícone para Usuários */}
          Tickets
          <ul className={openSubmenus['tickets'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/tickets">Listar Tickets</NavLink></li>
            <li><NavLink to="/responderticket">Responder Tickets</NavLink></li>
          </ul>
        </li>
        <li>
          <NavLink to="/carrinho-gestores" className="menu-link">
            <div className="menu-item">
              <FaHistory className="icon" /> {/* Ícone para Perfil */}
              Histórico  de Compras
            </div>
          </NavLink>
        </li>
        <li onClick={() => toggleSubmenu('vendas')}>
          <FaShoppingCart  className="icon" /> {/* Ícone para Gestores */}
          Vendas
          <ul className={openSubmenus['vendas'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/carrinho">Carrinho</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard de Vendas</NavLink></li>
          </ul>
        </li>
        <li>
          <NavLink to="/profile" className="menu-link">
            <div className="menu-item">
              <FaUser className="icon" /> {/* Ícone para Perfil */}
              Perfil
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
