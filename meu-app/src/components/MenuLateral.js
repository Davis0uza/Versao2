import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/MenuLateral.css'; // CSS específico para o menu lateral

const MenuLateral = () => {
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
        <li></li> <li>
          <NavLink to="/home">Home</NavLink>
        </li><li></li>
        <li onClick={() => toggleSubmenu('usuarios')}>
          Usuários
          <ul className={openSubmenus['usuarios'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/usuarios">Listar Usuários</NavLink></li>
            <li><NavLink to="/adicionar-usuario">Adicionar Usuário</NavLink></li>
            <li><NavLink to="/editaruser">Editar Usuário</NavLink></li>
            <li><NavLink to="/novo-ticket">Novo Ticket</NavLink></li>
            <li><NavLink to="/listar-respostas">Tickets Usuário</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('produtos')}>
          Produtos
          <ul className={openSubmenus['produtos'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/produtos">Listar Produtos</NavLink></li>
            <li><NavLink to="/adicionar-produto">Adicionar Produto</NavLink></li>
            <li><NavLink to="/adicionar-stock">Adicionar Stock</NavLink></li>
            <li><NavLink to="/editarproduto">Editar Produto</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('versoes')}>
          Versões
          <ul className={openSubmenus['versoes'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/versoes">Listar Versões</NavLink></li>
            <li><NavLink to="/adicionar-versao">Adicionar Versão</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('categorias')}>
          Categorias
          <ul className={openSubmenus['categorias'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/categorias">Listar Categorias</NavLink></li>
            <li><NavLink to="/adicionar-categoria">Adicionar Categoria</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('gestores')}>
          Gestores
          <ul className={openSubmenus['gestores'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/gestores">Listar Gestores</NavLink></li>
            <li><NavLink to="/adicionar-gestor">Adicionar Gestor</NavLink></li>
            <li><NavLink to="/efetuar-compra">Efetuar Compra</NavLink></li>
            <li><NavLink to="/inventario">Inventário</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('tickets')}>
          Tickets
          <ul className={openSubmenus['tickets'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/tickets">Listar Tickets</NavLink></li>
            <li><NavLink to="/responderticket">Responder Tickets</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('tiposUtilizador')}>
          Tipos de Utilizador
          <ul className={openSubmenus['tiposUtilizador'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/tipos-utilizador">Listar Tipos de Utilizador</NavLink></li>
            <li><NavLink to="/adicionar-tipo-utilizador">Adicionar Tipo de Utilizador</NavLink></li>
            <li><NavLink to="/promover-tipoutilizador">Promover Utilizador</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('carrinhos')}>
          Carrinhos
          <ul className={openSubmenus['carrinhos'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/carrinho">Listar Carrinhos</NavLink></li>
            <li><NavLink to="/carrinho-gestores">Carrinho como Usuário/Gestor</NavLink></li>
          </ul>
        </li>
        <li onClick={() => toggleSubmenu('dlcs')}>
          DLCs
          <ul className={openSubmenus['dlcs'] ? 'submenu open' : 'submenu'}>
            <li><NavLink to="/dlcs">Listar DLCs</NavLink></li>
            <li><NavLink to="/adicionar-dlcs">Adicionar DLCs</NavLink></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default MenuLateral;
