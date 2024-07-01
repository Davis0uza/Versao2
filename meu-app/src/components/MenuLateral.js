import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/MenuLateral.css'; // CSS específico para o menu lateral

const MenuLateral = () => {
  return (
    <nav className="menu-lateral">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          Usuários
          <ul>
            <li><NavLink to="/usuarios">Listar Usuários</NavLink></li>
            <li><NavLink to="/adicionar-usuario">Adicionar Usuário</NavLink></li>
            <li><NavLink to="/editaruser">Editar Usuário</NavLink></li>
            <li><NavLink to="/novo-ticket">Novo Ticket</NavLink></li>
            <li><NavLink to="/listar-respostas">Tickets Usuário</NavLink></li>
          </ul>
        </li>
        <li>
          Produtos
          <ul>
            <li><NavLink to="/produtos">Listar Produtos</NavLink></li>
            <li><NavLink to="/adicionar-produto">Adicionar Produto</NavLink></li>
            <li><NavLink to="/adicionar-stock">Adicionar Stock</NavLink></li>
            <li><NavLink to="/editarproduto">Editar Produto</NavLink></li>
          </ul>
        </li>
        <li>
          Versões
          <ul>
            <li><NavLink to="/versoes">Listar Versões</NavLink></li>
            <li><NavLink to="/adicionar-versao">Adicionar Versão</NavLink></li>
          </ul>
        </li>
        <li>
          Categorias
          <ul>
            <li><NavLink to="/categorias">Listar Categorias</NavLink></li>
            <li><NavLink to="/adicionar-categoria">Adicionar Categoria</NavLink></li>
          </ul>
        </li>
        <li>
          Gestores
          <ul>
            <li><NavLink to="/gestores">Listar Gestores</NavLink></li>
            <li><NavLink to="/adicionar-gestor">Adicionar Gestor</NavLink></li>
            <li><NavLink to="/efetuar-compra">Efetuar Compra</NavLink></li>
            <li><NavLink to="/inventario">Inventário</NavLink></li>
          </ul>
        </li>
        <li>
          Tickets
          <ul>
            <li><NavLink to="/tickets">Listar Tickets</NavLink></li>
            <li><NavLink to="/responderticket">Responder Tickets</NavLink></li>
          </ul>
        </li>
        <li>
          Tipos de Utilizador
          <ul>
            <li><NavLink to="/tipos-utilizador">Listar Tipos de Utilizador</NavLink></li>
            <li><NavLink to="/adicionar-tipo-utilizador">Adicionar Tipo de Utilizador</NavLink></li>
            <li><NavLink to="/promover-tipoutilizador">Promover Utilizador</NavLink></li>
          </ul>
        </li>
        <li>
          Carrinhos
          <ul>
            <li><NavLink to="/carrinho">Listar Carrinhos</NavLink></li>
            <li><NavLink to="/carrinho-gestores">Carrinho como Usuário/Gestor</NavLink></li>
          </ul>
        </li>
        <li>
          DLCs
          <ul>
            <li><NavLink to="/dlcs">Listar DLCs</NavLink></li>
            <li><NavLink to="/adicionar-dlcs">Adicionar DLCs</NavLink></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default MenuLateral;
