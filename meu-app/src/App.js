import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Usuarios from './components/Usuarios';
import AdicionarUsuario from './components/AdicionarUsuario';
import Produtos from './components/Produtos';
import AdicionarProduto2 from './components/AdicionarProduto2';
import Versoes from './components/Versoes';
import AdicionarVersao from './components/AdicionarVersao';
import Categorias from './components/Categorias';
import AdicionarCategoria from './components/AdicionarCategoria';
import Gestores from './components/Gestores';
import AdicionarGestor from './components/AdicionarGestor';
import Tickets from './components/Tickets';
import NovoTicket from './components/NovoTicket';
import TiposUtilizador from './components/TiposUtilizador';
import AdicionarTipoUtilizador from './components/AdicionarTipoUtilizador';
import Carrinho from './components/Carrinho';
import DLCs from './components/DLCs';
import AdicionarDlc from './components/AdicionarDlc';
import AdicionarStock from './components/AdicionarStock';
import EfetuarCompra from './components/EfetuarCompra';
import Inventario from './components/Inventario';
import ResponderTicket from './components/ResponderTicket';
import ListarRespostas from './components/ListarRespostas';
import PromoverTipoUtilizador from './components/PromoverTipoUtilizador';
import CarrinhoGestores from './components/CarrinhoGestores';
import EditarProduto from './components/EditarProduto';
import EditarUser from './components/EditarUser';
import Cards_destaques from './components/CadsDestaques';
import Contactos from './components/Contactos';
import Register from './components/Register';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const productInCart = cart.find(item => item.id_produto === product.id_produto);
    if (productInCart) {
      if (productInCart.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id_produto === product.id_produto ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        alert('Produto esgotado, peça um orçamento.');
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.map(item =>
      item.id_produto === product.id_produto ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AuthProvider>
      <div className="App">
        <Navbar cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/usuarios" element={<PrivateRoute element={Usuarios} />} />
          <Route path="/adicionar-usuario" element={<PrivateRoute element={AdicionarUsuario} />} />
          <Route path="/produtos" element={<PrivateRoute element={Produtos} />} />
          <Route path="/adicionar-produto" element={<PrivateRoute element={AdicionarProduto2} />} />
          <Route path="/versoes" element={<PrivateRoute element={Versoes} />} />
          <Route path="/adicionar-versao" element={<PrivateRoute element={AdicionarVersao} />} />
          <Route path="/categorias" element={<PrivateRoute element={Categorias} />} />
          <Route path="/adicionar-categoria" element={<PrivateRoute element={AdicionarCategoria} />} />
          <Route path="/gestores" element={<PrivateRoute element={Gestores} />} />
          <Route path="/adicionar-gestor" element={<PrivateRoute element={AdicionarGestor} />} />
          <Route path="/tickets" element={<PrivateRoute element={Tickets} />} />
          <Route path="/novo-ticket" element={<PrivateRoute element={NovoTicket} />} />
          <Route path="/tipos-utilizador" element={<PrivateRoute element={TiposUtilizador} />} />
          <Route path="/adicionar-tipo-utilizador" element={<PrivateRoute element={AdicionarTipoUtilizador} />} />
          <Route path="/carrinho" element={<PrivateRoute element={Carrinho} />} />
          <Route path="/dlcs" element={<PrivateRoute element={DLCs} />} />
          <Route path="/adicionar-dlcs" element={<PrivateRoute element={AdicionarDlc} />} />
          <Route path="/adicionar-stock" element={<PrivateRoute element={AdicionarStock} />} />
          <Route path="/efetuar-compra" element={<PrivateRoute element={EfetuarCompra} />} />
          <Route path="/inventario" element={<PrivateRoute element={Inventario} />} />
          <Route path="/responderticket" element={<PrivateRoute element={ResponderTicket} />} />
          <Route path="/listar-respostas" element={<PrivateRoute element={ListarRespostas} />} />
          <Route path="/promover-tipoutilizador" element={<PrivateRoute element={PromoverTipoUtilizador} />} />
          <Route path="/carrinho-gestores" element={<PrivateRoute element={CarrinhoGestores} />} />
          <Route path="/editarproduto/:id" element={<PrivateRoute element={EditarProduto} />} />
          <Route path="/editaruser/:id" element={<PrivateRoute element={EditarUser} />} />
          <Route path="/cards" element={<PrivateRoute element={Cards_destaques} addToCart={addToCart} />} />
          <Route path="/contactos" element={<Contactos />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
