import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
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
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/adicionar-usuario" element={<AdicionarUsuario />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/adicionar-produto" element={<AdicionarProduto2 />} />
        <Route path="/versoes" element={<Versoes />} />
        <Route path="/adicionar-versao" element={<AdicionarVersao />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/adicionar-categoria" element={<AdicionarCategoria />} />
        <Route path="/gestores" element={<Gestores />} />
        <Route path="/adicionar-gestor" element={<AdicionarGestor />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/novo-ticket" element={<NovoTicket />} />
        <Route path="/tipos-utilizador" element={<TiposUtilizador />} />
        <Route path="/adicionar-tipo-utilizador" element={<AdicionarTipoUtilizador />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/dlcs" element={<DLCs />} />
        <Route path="/adicionar-dlcs" element={<AdicionarDlc />} />
        <Route path="/adicionar-stock" element={<AdicionarStock />} />
        <Route path="/efetuar-compra" element={<EfetuarCompra />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/responderticket" element={<ResponderTicket />} />
        <Route path="/listar-respostas" element={<ListarRespostas />} />
        <Route path="/promover-tipoutilizador" element={<PromoverTipoUtilizador />} />
        <Route path="/carrinho-gestores" element={<CarrinhoGestores />} />
        <Route path="/editarproduto" element={<EditarProduto />} />
        <Route path="/editaruser" element={<EditarUser />} />
        <Route path='/cards' element={<Cards_destaques/>}/>
      </Routes>
    </div>
  );
}

export default App;
